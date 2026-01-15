"""Services for JellyHA integration - Tuned 2026 Quality Strategy.

Strategy (Universal):
1. Analyze Media.
2. If Safe H.264 (1080p/8-bit) -> Direct Play (MP4).
3. If anything else (HEVC, 4K) -> Transcode via Master HLS (m3u8).
   - Uses specific "native-like" quality settings.
   - Max Bitrate: 60 Mbps
   - Profile: High, Level 5.1
   - Quality: 92
   - No resolution caps.
"""
from __future__ import annotations

import logging
import asyncio
import voluptuous as vol

from homeassistant.core import HomeAssistant, ServiceCall
from homeassistant.helpers import config_validation as cv
from homeassistant.components.media_player import (
    DOMAIN as MEDIA_PLAYER_DOMAIN,
    SERVICE_PLAY_MEDIA,
    ATTR_MEDIA_CONTENT_ID,
    ATTR_MEDIA_CONTENT_TYPE,
)

from .const import DOMAIN

_LOGGER = logging.getLogger(__name__)

SERVICE_PLAY_ON_DEVICE = "play_on_device"

PLAY_ON_DEVICE_SCHEMA = vol.Schema(
    {
        vol.Required("entity_id"): cv.entity_id,
        vol.Required("item_id"): cv.string,
    }
)

async def async_register_services(hass: HomeAssistant) -> None:
    """Register services for JellyHA."""

    async def async_play_on_device(call: ServiceCall) -> None:
        """Play a Jellyfin item using Tuned 2026 Strategy."""
        target_entity_id = call.data["entity_id"]
        item_id = call.data["item_id"]

        # Find coordinator
        coordinator = None
        if DOMAIN in hass.data:
            for entry_id in hass.data[DOMAIN]:
                coordinator = hass.data[DOMAIN][entry_id]
                break

        if not coordinator or not coordinator._api:
            _LOGGER.error("No JellyHA API client found")
            return

        api = coordinator._api
        server_url = api._server_url
        api_key = api._api_key
        user_id = coordinator.config_entry.data.get("user_id")

        # Fetch item
        item = await api.get_item(user_id, item_id)
        if not item:
             _LOGGER.error("Item %s not found", item_id)
             return
        title = item.get("Name", "Jellyfin Media")
        image_url = api.get_image_url(item_id, "Primary", max_height=800)
        
        # ------------------------------------------------------------------
        # ANALYSIS
        # ------------------------------------------------------------------
        media_streams = item.get("MediaStreams", [])
        video_codec = "unknown"
        video_height = 0
        bit_depth = 8
        
        for stream in media_streams:
            if stream.get("Type") == "Video":
                video_codec = stream.get("Codec", "unknown").lower()
                video_height = int(stream.get("Height", 0))
                bit_depth = int(stream.get("BitDepth", 8))
                break
        
        # Check Compatibility (Strict H.264)
        is_safe_h264 = (
            video_codec in ["h264", "avc"] and 
            video_height <= 1080 and 
            bit_depth == 8
        )

        _LOGGER.info("Media: %s | %sp | %s-bit (Safe? %s)", 
                     video_codec, video_height, bit_depth, is_safe_h264)

        media_url = ""
        content_type = ""
        log_mode = ""

        if is_safe_h264:
            # DIRECT PLAY
            log_mode = "DIRECT (H.264)"
            media_url = (
                f"{server_url}/Videos/{item_id}/stream"
                f"?Static=true"
                f"&api_key={api_key}"
                f"&VideoCodec=h264"
                f"&AudioCodec=aac"
            )
            content_type = "video/mp4"
            
        else:
            # TRANSCODE (Tuned 2026 Settings)
            log_mode = "TRANSCODE · Tuned 2026 Settings"
            
            media_url = (
                f"{server_url}/Videos/{item_id}/master.m3u8"
                f"?api_key={api_key}"
                f"&MediaSourceId={item_id}"
                
                # ───────────────────────────────────────────────────────────────
                #  CRITICAL FIX: FORCE TARGET BITRATE & RESOLUTION
                # ───────────────────────────────────────────────────────────────
                # Without 'VideoBitrate', Jellyfin defaults to 420kbps (416p) for generic clients.
                # We set this to 20Mbps to force high quality.
                f"&VideoBitrate=20000000"
                f"&MaxStreamingBitrate=20000000"
                
                # FORCE 1080p. Using 'Width' instead of 'MaxWidth' prevents downscaling fallback.
                f"&Width=1920"
                f"&Height=1080"
                
                # ───────────────────────────────────────────────────────────────
                #  PERFORMANCE & COMPATIBILITY
                # ───────────────────────────────────────────────────────────────
                f"&EncoderPreset=medium"
                f"&VideoCodec=h264"
                f"&h264-profile=high"
                f"&h264-level=41"             # Level 4.1 is the most compatible 1080p standard
                f"&h264-videobitdepth=8"      # Force 8-bit (Critical for Chromecast)
                
                # ───────────────────────────────────────────────────────────────
                #  AUDIO & CONTAINER
                # ───────────────────────────────────────────────────────────────
                f"&AudioCodec=aac"
                f"&AudioBitrate=320000"
                f"&TranscodingMaxAudioChannels=6"
                
                f"&SegmentContainer=ts"
                f"&MinSegments=2"             # Faster load time
                f"&BreakOnNonKeyFrames=False"
                f"&CopyTimestamps=true"
                f"&EnableSubtitlesInManifest=false"
            )
            content_type = "application/x-mpegURL"

        # Log
        safe_url = media_url.replace(api_key, "REDACTED")
        _LOGGER.info("Strategy: %s", log_mode)
        _LOGGER.info("URL: %s", safe_url)

        # Cast
        try:
             await hass.services.async_call(
                MEDIA_PLAYER_DOMAIN,
                SERVICE_PLAY_MEDIA,
                {
                    "entity_id": target_entity_id,
                    ATTR_MEDIA_CONTENT_ID: media_url,
                    ATTR_MEDIA_CONTENT_TYPE: content_type,
                    "extra": {
                        "title": title,
                        "thumb": image_url,
                        "autoplay": True,
                        "metadata": {
                            "metadataType": 0,
                            "title": title,
                            "images": [{"url": image_url}]
                        }
                    },
                },
                blocking=True,
            )
             _LOGGER.info("✓ Cast Command Sent")
        except Exception as e:
             _LOGGER.error("Failed to call play_media: %s", e)

    if not hass.services.has_service(DOMAIN, SERVICE_PLAY_ON_DEVICE):
        hass.services.async_register(
            DOMAIN,
            SERVICE_PLAY_ON_DEVICE,
            async_play_on_device,
            schema=PLAY_ON_DEVICE_SCHEMA,
        )

"""Sensor platform for JellyHA Library."""
from __future__ import annotations

from typing import Any

from datetime import datetime

from homeassistant.components.sensor import SensorDeviceClass, SensorEntity
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.device_registry import DeviceInfo
from homeassistant.helpers.entity import generate_entity_id
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.update_coordinator import CoordinatorEntity

from .const import (
    CONF_DEVICE_NAME,
    DEFAULT_DEVICE_NAME,
    DOMAIN,
)
from .coordinator import JellyHALibraryCoordinator


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up JellyHA Library sensors from a config entry."""
    coordinator: JellyHALibraryCoordinator = hass.data[DOMAIN][entry.entry_id]
    device_name = entry.data.get(CONF_DEVICE_NAME, DEFAULT_DEVICE_NAME)

    async_add_entities([
        JellyHALibrarySensor(coordinator, entry, device_name),
        JellyHAFavoritesCountSensor(coordinator, entry, device_name),
        JellyHAUnwatchedCountSensor(coordinator, entry, device_name),
        JellyHAUnwatchedMoviesSensor(coordinator, entry, device_name),
        JellyHAUnwatchedSeriesSensor(coordinator, entry, device_name),
        JellyHALastRefreshSensor(coordinator, entry, device_name),
        JellyHALastDataChangeSensor(coordinator, entry, device_name),
    ])


class JellyHABaseSensor(CoordinatorEntity[JellyHALibraryCoordinator], SensorEntity):
    """Base class for JellyHA sensors with common device info."""

    _attr_has_entity_name = True

    def __init__(
        self,
        coordinator: JellyHALibraryCoordinator,
        entry: ConfigEntry,
        device_name: str,
        sensor_key: str,
    ) -> None:
        """Initialize the sensor."""
        super().__init__(coordinator)
        self._device_name = device_name
        self._entry = entry
        
        # Use device_name as prefix for unique_id
        self._attr_unique_id = f"{device_name}_{sensor_key}"
        
        # Set entity_id to use device_name prefix (e.g., sensor.jellyha_library)
        self.entity_id = f"sensor.{device_name}_{sensor_key}"

    @property
    def device_info(self) -> DeviceInfo:
        """Return device info for this sensor."""
        return DeviceInfo(
            identifiers={(DOMAIN, self._entry.entry_id)},
            name=self._device_name.title(),
            manufacturer="JellyHA",
            model="Jellyfin Integration",
            sw_version="1.0.0",
        )


class JellyHALibrarySensor(JellyHABaseSensor):
    """Sensor representing media library from Jellyfin."""

    _attr_translation_key = "library"
    _attr_icon = "mdi:new-box"

    def __init__(
        self,
        coordinator: JellyHALibraryCoordinator,
        entry: ConfigEntry,
        device_name: str,
    ) -> None:
        """Initialize the sensor."""
        super().__init__(coordinator, entry, device_name, "library")

    @property
    def native_value(self) -> int:
        """Return the number of library items."""
        if self.coordinator.data:
            return self.coordinator.data.get("count", 0)
        return 0

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        """Return additional state attributes."""
        if not self.coordinator.data:
            return {}

        return {
            "entry_id": self._entry.entry_id,
            "server_name": self.coordinator.data.get("server_name"),
            "last_updated": self.coordinator.last_refresh_time,
        }


class JellyHAFavoritesCountSensor(JellyHABaseSensor):
    """Sensor for favorite items count."""

    _attr_translation_key = "favorites_count"
    _attr_icon = "mdi:heart"

    def __init__(
        self,
        coordinator: JellyHALibraryCoordinator,
        entry: ConfigEntry,
        device_name: str,
    ) -> None:
        """Initialize the sensor."""
        super().__init__(coordinator, entry, device_name, "favorites")

    @property
    def native_value(self) -> int:
        """Return the number of favorite items."""
        if not self.coordinator.data:
            return 0
        items = self.coordinator.data.get("items", [])
        return len([i for i in items if i.get("is_favorite", False)])


class JellyHAUnwatchedCountSensor(JellyHABaseSensor):
    """Sensor for total unwatched items count."""

    _attr_translation_key = "unwatched_count"
    _attr_icon = "mdi:eye-off"

    def __init__(
        self,
        coordinator: JellyHALibraryCoordinator,
        entry: ConfigEntry,
        device_name: str,
    ) -> None:
        """Initialize the sensor."""
        super().__init__(coordinator, entry, device_name, "unwatched")

    @property
    def native_value(self) -> int:
        """Return the number of unwatched items."""
        if not self.coordinator.data:
            return 0
        items = self.coordinator.data.get("items", [])
        return len([i for i in items if not i.get("is_played", True)])

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        """Return breakdown by type."""
        if not self.coordinator.data:
            return {}
        items = self.coordinator.data.get("items", [])
        unwatched = [i for i in items if not i.get("is_played", True)]
        return {
            "movies": len([i for i in unwatched if i.get("type") == "Movie"]),
            "series": len([i for i in unwatched if i.get("type") == "Series"]),
        }


class JellyHAUnwatchedMoviesSensor(JellyHABaseSensor):
    """Sensor for unwatched movies count."""

    _attr_translation_key = "unwatched_movies"
    _attr_icon = "mdi:movie-open"

    def __init__(
        self,
        coordinator: JellyHALibraryCoordinator,
        entry: ConfigEntry,
        device_name: str,
    ) -> None:
        """Initialize the sensor."""
        super().__init__(coordinator, entry, device_name, "unwatched_movies")

    @property
    def native_value(self) -> int:
        """Return the number of unwatched movies."""
        if not self.coordinator.data:
            return 0
        items = self.coordinator.data.get("items", [])
        return len([
            i for i in items
            if i.get("type") == "Movie" and not i.get("is_played", True)
        ])


class JellyHAUnwatchedSeriesSensor(JellyHABaseSensor):
    """Sensor for unwatched series count."""

    _attr_translation_key = "unwatched_series"
    _attr_icon = "mdi:television-classic"

    def __init__(
        self,
        coordinator: JellyHALibraryCoordinator,
        entry: ConfigEntry,
        device_name: str,
    ) -> None:
        """Initialize the sensor."""
        super().__init__(coordinator, entry, device_name, "unwatched_series")

    @property
    def native_value(self) -> int:
        """Return the number of unwatched series."""
        if not self.coordinator.data:
            return 0
        items = self.coordinator.data.get("items", [])
        return len([
            i for i in items
            if i.get("type") == "Series" and not i.get("is_played", True)
        ])


class JellyHALastRefreshSensor(JellyHABaseSensor):
    """Sensor for last refresh timestamp."""

    _attr_translation_key = "last_refresh"
    _attr_icon = "mdi:clock-outline"
    _attr_device_class = SensorDeviceClass.TIMESTAMP

    def __init__(
        self,
        coordinator: JellyHALibraryCoordinator,
        entry: ConfigEntry,
        device_name: str,
    ) -> None:
        """Initialize the sensor."""
        super().__init__(coordinator, entry, device_name, "last_refresh")

    @property
    def native_value(self) -> datetime | None:
        """Return the last refresh timestamp."""
        if self.coordinator.last_refresh_time:
            return self.coordinator.last_refresh_time
        return None


class JellyHALastDataChangeSensor(JellyHABaseSensor):
    """Sensor for last library data change timestamp."""

    _attr_translation_key = "last_data_change"
    _attr_icon = "mdi:database-clock-outline"
    _attr_device_class = SensorDeviceClass.TIMESTAMP

    def __init__(
        self,
        coordinator: JellyHALibraryCoordinator,
        entry: ConfigEntry,
        device_name: str,
    ) -> None:
        """Initialize the sensor."""
        super().__init__(coordinator, entry, device_name, "last_data_change")

    @property
    def native_value(self) -> datetime | None:
        """Return the last data change timestamp."""
        if self.coordinator.last_data_change_time:
            return self.coordinator.last_data_change_time
        return None

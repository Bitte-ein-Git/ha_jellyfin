"""WebSocket API for JellyHA."""
from __future__ import annotations

import logging
from typing import Any

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers import config_validation as cv

from .const import DOMAIN

_LOGGER = logging.getLogger(__name__)


from homeassistant.exceptions import HomeAssistantError

@callback
def async_register_websocket(hass: HomeAssistant) -> None:
    """Register JellyHA WebSocket handlers."""
    try:
        websocket_api.async_register_command(hass, websocket_get_items)
    except HomeAssistantError:
        # Command already registered, which is fine (e.g. multiple entries)
        pass


@websocket_api.websocket_command({
    vol.Required("type"): "jellyha/get_items",
    vol.Required("entity_id"): cv.entity_id,
})
@websocket_api.async_response
async def websocket_get_items(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Handle get items command."""
    entity_id = msg["entity_id"]
    
    # Verify entity exists and is a JellyHA sensor
    state = hass.states.get(entity_id)
    if not state:
        connection.send_error(
            msg["id"], websocket_api.ERR_NOT_FOUND, f"Entity {entity_id} not found"
        )
        return

    # Helper: we need to find the config entry ID from the entity
    # We can try to get it from entity registry or attribute if we put it there.
    # The plan says we put entry_id in attributes.
    entry_id = state.attributes.get("entry_id")
    
    if not entry_id:
        # Fallback: try to find coordinator by looking at domain data
        # This is risky if multiple entries.
        # Let's rely on attribute. If missing, error.
        connection.send_error(
            msg["id"], 
            websocket_api.ERR_INVALID_FORMAT, 
            f"Entity {entity_id} does not have entry_id attribute"
        )
        return

    coordinator = hass.data[DOMAIN].get(entry_id)
    if not coordinator:
        connection.send_error(
             msg["id"], websocket_api.ERR_NOT_FOUND, "Integration not loaded"
        )
        return

    # Get items from storage
    # Get items from storage
    if not hasattr(coordinator, "storage") or not coordinator.storage:
         connection.send_error(
             msg["id"], websocket_api.ERR_HOME_ASSISTANT_ERROR, "Storage not initialized"
         )
         return
         
    items = coordinator.storage.get_all_items()
    
    # Fallback: if storage is empty but coordinator has data
    if not items and coordinator.data and "items" in coordinator.data:
        items = coordinator.data["items"]
    
    connection.send_result(msg["id"], {"items": items})

import asyncio
import aiohttp
import logging
import sys
import os
from unittest.mock import MagicMock

# Mock Home Assistant modules to prevent import errors from __init__.py
sys.modules["homeassistant"] = MagicMock()
sys.modules["homeassistant.config_entries"] = MagicMock()
sys.modules["homeassistant.const"] = MagicMock()
sys.modules["homeassistant.core"] = MagicMock()
sys.modules["homeassistant.exceptions"] = MagicMock()  # Added
sys.modules["homeassistant.helpers"] = MagicMock()
sys.modules["homeassistant.helpers.aiohttp_client"] = MagicMock()
sys.modules["homeassistant.components"] = MagicMock()
sys.modules["homeassistant.components.http"] = MagicMock()
sys.modules["homeassistant.helpers.update_coordinator"] = MagicMock() # Likely used in coordinator
sys.modules["homeassistant.helpers.event"] = MagicMock() # Likely used in coordinator
sys.modules["homeassistant.helpers.issue_registry"] = MagicMock()
sys.modules["homeassistant.helpers.device_registry"] = MagicMock()
sys.modules["homeassistant.util"] = MagicMock()
sys.modules["homeassistant.components.media_player"] = MagicMock()
sys.modules["homeassistant.components.media_player.const"] = MagicMock()
sys.modules["homeassistant.helpers.storage"] = MagicMock()
sys.modules["homeassistant.components.websocket_api"] = MagicMock()
sys.modules["homeassistant.helpers.config_validation"] = MagicMock()

# Add the parent directory to sys.path to allow imports from custom_components
sys.path.append(os.getcwd())

from custom_components.jellyha.api import JellyfinApiClient, JellyfinAuthError, JellyfinConnectionError

# Configure logging
logging.basicConfig(level=logging.INFO)
_LOGGER = logging.getLogger(__name__)

async def main():
    print("--- JellyHA Authentication Verifier ---")
    server_url = input("Enter Server URL (e.g., http://192.168.1.10:8096): ").strip()
    username = input("Enter Username: ").strip()
    password = input("Enter Password: ").strip()

    if not server_url or not username:
        print("Error: Server URL and Username are required.")
        return

    print(f"\nAttempting to authenticate with {server_url} as {username}...")

    async with aiohttp.ClientSession() as session:
        api = JellyfinApiClient(server_url, session=session)
        
        try:
            auth_data = await api.authenticate(username, password)
            print("\n✅ Authentication Successful!")
            print(f"User Name: {auth_data.get('User', {}).get('Name')}")
            print(f"User ID:   {auth_data.get('User', {}).get('Id')}")
            print(f"API Key:   {auth_data.get('AccessToken')}")
            
            print("\nTest passed. The 'authenticate' method is working correctly.")
            
        except JellyfinAuthError:
            print("\n❌ Authentication Failed: Invalid credentials.")
        except JellyfinConnectionError as e:
            print(f"\n❌ Connection Failed: {e}")
        except Exception as e:
            print(f"\n❌ An unexpected error occurred: {e}")

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("\nAborted.")

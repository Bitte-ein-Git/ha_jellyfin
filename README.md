# JellyHA

[![HACS][hacs-badge]][hacs-url]
[![GitHub Release][release-badge]][release-url]

A Home Assistant integration and Lovelace card that displays media from your Jellyfin server.

**JellyHA Library** provides a beautiful way to showcase your media collection in Home Assistant.

![Card Preview](./docs/JellyHA-Library.png)

## Features

- 🎬 Display movies and TV shows from your library
- 🎨 Three layouts: Carousel, Grid, List
- 🌙 Automatic dark/light theme adaptation
- 🔗 Click to open in Jellyfin (new tab)
- ⭐ IMDB ratings for movies, TMDB for TV shows
- 🆕 "New" badge for recently added items
- 🌍 6 languages: English, German, French, Spanish, Italian, Dutch
- 🎛️ Graphical card editor (no YAML required)

## Installation

JellyHA requires **two installation steps**: installing the integration and adding the dashboard card resource.

### Step 1: Install the Integration

#### Via HACS (Recommended)

1. Open HACS in Home Assistant
2. Go to **Integrations** → **⋮** → **Custom repositories**
3. Add repository URL: `https://github.com/zupancicmarko/JellyHA`
4. Select Type: **Integration**
5. Click **ADD**
6. Search for **JellyHA** in HACS Integrations
7. Click **Download**
8. **Restart Home Assistant**

#### Manual Installation

1. Copy `custom_components/jellyha` to your `config/custom_components/` directory
2. **Restart Home Assistant**

### Step 2: Add Dashboard Card Resource

> **⚠️ Important:** This step is **required** even if you installed via HACS. The dashboard card will not work without it.

1. Go to **Settings** → **Dashboards**
2. Click **⋮** (three-dot menu) → **Resources**
3. Click **+ Add Resource**
4. Enter the URL based on your installation method:
   - **HACS:** `/hacsfiles/jellyha/jellyha-cards.js`
   - **Manual:** `/local/community/jellyha/jellyha-cards.js` (ensure you copied `dist/jellyha-cards.js` to `config/www/community/jellyha/`)
5. Select Resource type: **JavaScript Module**
6. Click **Create**

> **Note:** If you don't see the Resources menu, enable **Advanced Mode** in your user profile settings.

## Setup

1. Go to **Settings** → **Devices & Services** → **Add Integration**
2. Search for "JellyHA"
3. Enter your Jellyfin server URL and API key
4. Select the user and libraries to monitor

## Card Configuration

Add the card to your dashboard:

```yaml
type: custom:jellyha-library-card
entity: sensor.jellyha_library
title: Jellyfin Library
layout: carousel
media_type: both
limit: 10
```

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entity` | string | **Required** | The sensor entity ID |
| `title` | string | `Jellyfin Library` | Card title |
| `layout` | string | `carousel` | `carousel`, `grid`, or `list` |
| `media_type` | string | `both` | `movies`, `series`, or `both` |
| `limit` | number | `10` | Maximum items to display |
| `columns` | number | `4` | Columns for grid layout |
| `show_title` | boolean | `true` | Show media title |
| `show_year` | boolean | `true` | Show release year |
| `show_runtime` | boolean | `false` | Show runtime |
| `show_ratings` | boolean | `true` | Show ratings |
| `new_badge_days` | number | `7` | Days to show "New" badge |
| `click_action` | string | `jellyfin` | `jellyfin`, `more-info`, or `none` |

## API Key

To get your Jellyfin API key:

1. Open Jellyfin Dashboard
2. Go to **Administration** → **API Keys**
3. Click **+** to create a new key
4. Copy the generated key

## Support

- [Report an issue](https://github.com/zupancicmarko/jellyha/issues)
- [Home Assistant Community](https://community.home-assistant.io/)

## License

MIT

[hacs-badge]: https://img.shields.io/badge/HACS-Custom-orange.svg
[hacs-url]: https://github.com/hacs/integration
[release-badge]: https://img.shields.io/github/v/release/zupancicmarko/jellyha
[release-url]: https://github.com/zupancicmarko/jellyha/releases

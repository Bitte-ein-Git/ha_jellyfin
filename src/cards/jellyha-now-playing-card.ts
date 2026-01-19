import { LitElement, html, TemplateResult, css, PropertyValues, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
    HomeAssistant,
    JellyHANowPlayingCardConfig,
    NowPlayingSensorData
} from '../shared/types';
import { localize } from '../shared/localize';

// Import editor for side effects
import '../editors/jellyha-now-playing-editor';

// Register card in the custom cards array
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
    type: 'jellyha-now-playing-card',
    name: 'JellyHA Now Playing',
    description: 'Display currently playing media from Jellyfin',
    preview: true,
});

@customElement('jellyha-now-playing-card')
export class JellyHANowPlayingCard extends LitElement {
    @property({ attribute: false }) public hass!: HomeAssistant;
    @state() private _config!: JellyHANowPlayingCardConfig;

    public setConfig(config: JellyHANowPlayingCardConfig): void {
        this._config = {
            show_title: true,
            show_media_type_badge: true,
            show_year: true,
            show_client: true,
            show_background: true,
            ...config,
        };
    }

    public static getConfigElement(): HTMLElement {
        return document.createElement('jellyha-now-playing-editor');
    }

    public static getStubConfig(hass: HomeAssistant): Partial<JellyHANowPlayingCardConfig> {
        const entities = Object.keys(hass.states);
        const entity = entities.find((e) => e.startsWith('sensor.jellyha_now_playing_')) || '';
        return {
            entity,
            show_title: true,
            show_media_type_badge: true,
            show_year: true,
            show_client: true,
            show_background: true,
        };
    }

    public getCardSize(): number {
        return 3;
    }

    protected render(): TemplateResult {
        if (!this.hass || !this._config) {
            return html``;
        }

        const entityId = this._config.entity;
        if (!entityId) {
            return this._renderError('Please configure a JellyHA Now Playing sensor entity');
        }

        const stateObj = this.hass.states[entityId];
        if (!stateObj) {
            return this._renderError(localize(this.hass.language, 'entity_not_found') || 'Entity not found');
        }

        const attributes = stateObj.attributes as unknown as NowPlayingSensorData;
        const isPlaying = !!attributes.item_id;

        if (!isPlaying) {
            return this._renderEmpty();
        }

        const progressPercent = attributes.progress_percent || 0;
        const imageUrl = attributes.image_url;

        const backdropUrl = attributes.backdrop_url;
        const showBackground = this._config.show_background && backdropUrl;
        const isPaused = attributes.is_paused;

        return html`
            <ha-card class="jellyha-now-playing ${showBackground ? 'has-background' : ''}">
                ${showBackground ? html`
                    <div class="card-background" style="background-image: url('${backdropUrl}')"></div>
                    <div class="card-overlay"></div>
                ` : nothing}
                
                <div class="card-content">
                    ${this._config.title ? html`
                        <div class="card-header">${this._config.title}</div>
                    ` : nothing}
                    
                    <div class="main-container">
                        ${imageUrl ? html`
                            <div class="poster-container">
                                <img src="${imageUrl}" alt="${attributes.title}" />
                            </div>
                        ` : nothing}
                        
                        <div class="info-container">
                            <div class="info-top">
                                <div class="header">
                                    ${this._config.show_title !== false ? html`<div class="title">${attributes.title}</div>` : nothing}
                                    ${attributes.series_title ? html`<div class="series">${attributes.series_title}</div>` : nothing}
                                    ${this._config.show_client !== false ? html`
                                        <div class="device-info">
                                            <ha-icon icon="mdi:television-classic"></ha-icon>
                                            <span>${attributes.device_name} (${attributes.client})</span>
                                        </div>
                                    ` : nothing}
                                </div>

                                <div class="meta-container">
                                    ${this._config.show_media_type_badge !== false ? html`
                                        <span class="badge ${attributes.media_type?.toLowerCase()}">${attributes.media_type}</span>
                                    ` : nothing}
                                    ${this._config.show_year !== false && attributes.year ? html`
                                        <span class="meta-item">${attributes.year}</span>
                                    ` : nothing}
                                    ${this._config.show_ratings && attributes.community_rating ? html`
                                        <span class="meta-item external-rating">
                                            <ha-icon icon="mdi:star"></ha-icon>
                                            <span>${attributes.community_rating.toFixed(1)}</span>
                                        </span>
                                    ` : nothing}
                                    ${this._config.show_runtime && attributes.runtime_minutes ? html`
                                        <span class="meta-item">${attributes.runtime_minutes} min</span>
                                    ` : nothing}
                                </div>

                                ${this._config.show_genres && attributes.genres?.length ? html`
                                    <div class="genres">${attributes.genres.join(', ')}</div>
                                ` : nothing}
                            </div>

                            <div class="info-bottom">
                                <div class="controls-container">
                                    <div class="playback-controls">
                                        ${isPaused ? html`
                                            <ha-icon-button .label=${'Play'} @click=${() => this._handleControl('Unpause')}>
                                                <ha-icon icon="mdi:play"></ha-icon>
                                            </ha-icon-button>
                                        ` : html`
                                            <ha-icon-button .label=${'Pause'} @click=${() => this._handleControl('Pause')}>
                                                <ha-icon icon="mdi:pause"></ha-icon>
                                            </ha-icon-button>
                                        `}
                                        <ha-icon-button .label=${'Stop'} @click=${() => this._handleControl('Stop')}>
                                            <ha-icon icon="mdi:stop"></ha-icon>
                                        </ha-icon-button>
                                    </div>
                                </div>

                                <div class="progress-container" @click=${this._handleSeek}>
                                    <div class="progress-bar">
                                        <div class="progress-fill" style="width: ${progressPercent}%"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ha-card>
        `;
    }

    private _renderEmpty(): TemplateResult {
        return html`
            <ha-card class="empty-state">
                <div class="card-content">
                    <ha-icon icon="mdi:play-network-outline"></ha-icon>
                    <p>Nothing is currently playing</p>
                </div>
            </ha-card>
        `;
    }

    private _renderError(error: string): TemplateResult {
        return html`
            <ha-card class="error-state">
                <div class="card-content">
                    <p>${error}</p>
                </div>
            </ha-card>
        `;
    }

    private async _handleControl(command: string): Promise<void> {
        const stateObj = this.hass.states[this._config.entity];
        const sessionId = stateObj?.attributes.session_id;

        if (!sessionId) return;

        await this.hass.callService('jellyha', 'session_control', {
            session_id: sessionId,
            command: command
        });
    }

    private async _handleSeek(e: MouseEvent): Promise<void> {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;

        const stateObj = this.hass.states[this._config.entity];
        if (!stateObj) return;

        const attributes = stateObj.attributes as unknown as NowPlayingSensorData;
        const sessionId = attributes.session_id;
        const positionTicks = attributes.position_ticks || 0;
        const progressPercent = attributes.progress_percent || 1;
        const durationTicks = (positionTicks / progressPercent) * 100;

        if (!sessionId || !durationTicks) return;

        const seekTicks = Math.round(durationTicks * percent);

        await this.hass.callService('jellyha', 'session_seek', {
            session_id: sessionId,
            position_ticks: seekTicks
        });
    }

    static styles = css`
        :host {
            display: block;
        }
        .jellyha-now-playing {
            overflow: hidden;
            position: relative;
            background: var(--ha-card-background, var(--card-background-color, #fff));
            border-radius: var(--ha-card-border-radius, 12px);
            transition: all 0.3s ease-out;
        }
        .jellyha-now-playing.has-background {
            background: transparent;
            color: white;
        }
        .jellyha-now-playing.has-background .title,
        .jellyha-now-playing.has-background .series,
        .jellyha-now-playing.has-background .device-info,
        .jellyha-now-playing.has-background .meta-item,
        .jellyha-now-playing.has-background .genres,
        .jellyha-now-playing.has-background .card-header,
        .jellyha-now-playing.has-background ha-icon-button {
            color: #fff !important;
            text-shadow: 0 1px 4px rgba(0,0,0,0.5);
        }
        .jellyha-now-playing.has-background .badge {
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        .jellyha-now-playing.has-background .playback-controls ha-icon-button {
            background: rgba(255, 255, 255, 0.15);
        }
        .jellyha-now-playing.has-background .playback-controls ha-icon-button:hover {
            background: rgba(255, 255, 255, 0.25);
        }
        /* Further increase padding when background is on for better balance */
        .jellyha-now-playing.has-background .card-content {
            padding: 28px 20px 20px !important;
        }
        .card-background {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-size: cover;
            background-position: center;
            filter: blur(5px) brightness(0.6);
            transform: scale(1.02);
            z-index: 0;
            transition: background-image 0.5s ease-in-out;
        }
        .card-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%);
            z-index: 1;
        }
        .card-content {
            position: relative;
            z-index: 2;
            padding: 20px !important;
            display: flex;
            flex-direction: column;
            gap: 16px;
        }
        .card-header {
            font-size: 1.25rem;
            font-weight: 500;
            color: var(--primary-text-color);
            line-height: 1.2;
        }
        .main-container {
            display: flex;
            gap: 20px;
            align-items: flex-start;
        }
        .poster-container {
            flex: 0 0 140px;
            height: 210px;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 8px 16px rgba(0,0,0,0.4);
            transition: transform 0.2s ease-in-out;
        }
        .poster-container:hover {
            transform: scale(1.02);
        }
        .poster-container img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        .info-container {
            flex: 1;
            display: flex;
            flex-direction: column;
            height: 210px; /* Match poster height */
            min-width: 0;
        }
        .info-top {
            flex: 1;
        }
        .header {
            margin-bottom: 8px;
        }
        .title {
            font-size: 1.4rem;
            font-weight: 700;
            line-height: 1.2;
            color: var(--primary-text-color);
            margin-bottom: 4px;
        }
        .series {
            font-size: 1.1rem;
            color: var(--secondary-text-color);
            font-weight: 500;
        }
        .device-info {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 0.95rem;
            color: var(--secondary-text-color);
            margin-top: 8px;
            opacity: 0.8;
        }
        .device-info ha-icon {
            --mdc-icon-size: 18px;
        }
        .meta-container {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 12px;
            align-items: center;
        }
        .badge {
            padding: 3px 10px;
            border-radius: 4px;
            font-size: 0.75rem;
            font-weight: 800;
            background: var(--primary-color);
            color: white;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .badge.movie { background-color: #00a4dc; }
        .badge.series { background-color: #aa5cc3; }
        .badge.episode { background-color: #5cc3aa; }

        .meta-item {
            color: var(--secondary-text-color);
            font-size: 0.9rem;
            font-weight: 500;
        }
        .meta-item.external-rating {
            display: flex;
            align-items: center;
            gap: 4px;
            background: rgba(var(--rgb-primary-text-color), 0.08);
            padding: 2px 6px;
            border-radius: 4px;
            border: 1px solid rgba(var(--rgb-primary-text-color), 0.1);
        }
        .meta-item.external-rating ha-icon {
            --mdc-icon-size: 14px;
            color: #f1c40f;
        }
        .genres {
            font-size: 0.95rem;
            color: var(--secondary-text-color);
            margin-top: 8px;
            font-style: italic;
            opacity: 0.7;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
        .info-bottom {
            margin-top: auto;
            width: 100%;
        }
        .controls-container {
            display: flex;
            justify-content: flex-end;
            margin-bottom: 12px;
        }
        .playback-controls {
            display: flex;
            gap: 12px;
            align-items: center;
        }
        .playback-controls ha-icon-button {
            --mdc-icon-button-size: 44px;
            --mdc-icon-size: 32px;
            color: var(--primary-text-color);
            background: rgba(var(--rgb-primary-text-color), 0.05);
            border-radius: 50%;
            transition: background 0.2s;
        }
        .playback-controls ha-icon-button:hover {
            background: rgba(var(--rgb-primary-text-color), 0.1);
        }
        .playback-controls ha-icon-button ha-icon {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .progress-container {
            height: 6px;
            background: rgba(var(--rgb-primary-text-color), 0.15); /* Slightly darker for visibility */
            cursor: pointer;
            position: relative;
            border-radius: 3px;
            overflow: hidden;
            width: 100%;
        }
        .has-background .progress-container {
            background: rgba(255, 255, 255, 0.2); /* Much clearer on backdrop */
        }
        .progress-bar {
            height: 100%;
            width: 100%;
        }
        .progress-fill {
            height: 100%;
            background: var(--primary-color);
            transition: width 1s linear;
        }
        .empty-state, .error-state {
            text-align: center;
            padding: 40px 20px;
        }
        .empty-state ha-icon {
            --mdc-icon-size: 64px;
            color: var(--secondary-text-color);
            margin-bottom: 16px;
            opacity: 0.5;
        }
        .empty-state p {
            margin: 0;
            color: var(--secondary-text-color);
            font-size: 1.1rem;
        }

        /* Responsive adjustments */
        @media (max-width: 500px) {
            .poster-container {
                flex: 0 0 100px;
                height: 150px;
            }
            .info-container {
                height: auto;
                min-height: 150px;
            }
            .title {
                font-size: 1.2rem;
            }
            .main-container {
                gap: 12px;
            }
        }
    `;
}

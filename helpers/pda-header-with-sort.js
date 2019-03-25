import { PolymerElement } from '@polymer/polymer/polymer-element';
import { AppLocalizeBehavior } from '@polymer/app-localize-behavior/app-localize-behavior';
import { html } from '@polymer/polymer/lib/utils/html-tag';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class';
import '@polymer/iron-flex-layout/iron-flex-layout-classes';
import '@polymer/paper-tooltip/paper-tooltip';

class PdaHeaderWithSort extends mixinBehaviors([AppLocalizeBehavior], PolymerElement) {
  static get is() {
    return 'pda-header-with-sort';
  }
  static get template() {
    return html`
      <style include="iron-flex iron-flex-alignment">
        :host {
          display: block;
        }

        paper-icon-button {
          transition: transform .2s linear;
        }

        .desc {
          color: var(--paper-datatable-api-arrow-color, var(--paper-light-green-600));
          transform: rotate(0deg);
        }

        .asc {
          color: var(--paper-datatable-api-arrow-color, var(--paper-light-green-600));
          transform: rotate(180deg);
        }
      </style>
      <div class="layout horizontal center">
        <div class="flex">
          <slot></slot>
        </div>
        <slot name="actions"></slot>
        <paper-icon-button id="sortBtn" icon="arrow-downward" on-tap="_handleSort" class$="[[direction]]"></paper-icon-button>
        <paper-tooltip for="sortBtn">[[_getTooltipText(localize, direction)]]<paper-tooltip>
      </div>
  `;
  }

  static get properties() {
    return {
      direction: {
        type: String,
        notify: true,
        value: '',
      },
      language: {
        type: String,
        value: 'fr',
      },
      resources: {
        notify: true,
        value() {
          return {
            en: {
              sortAZ: 'Sort A-Z',
              sortZA: 'Sort Z-A',
              sortCancel: 'Cancel sort',
            },
            'en-en': {
              sortAZ: 'Sort A-Z',
              sortZA: 'Sort Z-A',
              sortCancel: 'Cancel sort',
            },
            'en-US': {
              sortAZ: 'Sort A-Z',
              sortZA: 'Sort Z-A',
              sortCancel: 'Cancel sort',
            },
            'en-us': {
              sortAZ: 'Sort A-Z',
              sortZA: 'Sort Z-A',
              sortCancel: 'Cancel sort',
            },
            fr: {
              sortAZ: 'Trier de A à Z',
              sortZA: 'Trier de Z à A',
              sortCancel: 'Annuler le tri',
            },
            'fr-fr': {
              sortAZ: 'Trier de A à Z',
              sortZA: 'Trier de Z à A',
              sortCancel: 'Annuler le tri',
            },
          };
        },
      },
    };
  }

  _handleSort() {
    switch (this.direction) {
      case '':
        this.direction = 'desc';
        break;
      case 'desc':
        this.direction = 'asc';
        break;
      default:
        this.direction = '';
        break;
    }
  }

  _getTooltipText(localize, direction) {
    if (direction === 'asc') {
      return localize('sortCancel');
    } else if (direction === 'desc') {
      return localize('sortAZ');
    }
    return localize('sortZA');
  }
}

window.customElements.define(PdaHeaderWithSort.is, PdaHeaderWithSort);

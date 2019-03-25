import { PolymerElement } from '@polymer/polymer/polymer-element';
import { html } from '@polymer/polymer/lib/utils/html-tag';
import { flush } from '@polymer/polymer/lib/legacy/polymer.dom';
import { microTask } from '@polymer/polymer/lib/utils/async';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class';
import { AppLocalizeBehavior } from '@polymer/app-localize-behavior/app-localize-behavior';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/iron-flex-layout/iron-flex-layout-classes';
import './pda-header-with-sort';

class PdaHeaderWithFilterAndSort extends mixinBehaviors([AppLocalizeBehavior], PolymerElement) {
  static get is() {
    return 'pda-header-with-filter-and-sort';
  }

  static get template() {
    return html`
      <style include="iron-flex iron-flex-alignment">
        :host {
          display: block;
        }

        paper-input {
          min-width: var(--paper-datatable-api-min-width-input-filter, 120px);
          --paper-input-container-underline-focus: {
            display: block;
          }
          ;
          --paper-input-container-label: {
            position: initial;
          }
          ;
          --paper-input-container: {
            padding: 0;
          }
          ;
          --paper-input-container-input: {
            font-size: 12px;
          }
          ;
        }

        paper-icon-button {
          padding: 0;
          width: 24px;
          height: 24px;
        }

        .header {
          margin-right: 16px;
        }
      </style>
        <dom-if if="[[active]]">
          <template>
            <pda-header-with-sort direction="{{direction}}">
              <paper-input no-label-float placeholder="[[header]]" value="{{filterValue}}">
                <paper-icon-button id="clearBtn" icon="clear" slot="suffix" on-tap="_toggleActive"></paper-icon-button>
                <paper-tooltip for="clearBtn" slot="suffix">[[localize('clear')]]</paper-tooltip>
              </paper-input>
            </pda-header-with-sort>
          </template>
        </dom-if>
        <dom-if if="[[!active]]">
          <template>
            <pda-header-with-sort direction="{{direction}}">
              <div class="header" on-tap="_toggleActive">
                [[header]]
              </div>
              <paper-icon-button id="searchBtn" slot="actions" icon="search" on-tap="_toggleActive"></paper-icon-button>
              <paper-tooltip for="searchBtn" slot="actions">[[localize('search')]]</paper-tooltip>
            </pda-header-with-sort>
          </template>
        </dom-if>
  `;
  }

  static get properties() {
    return {
      header: String,
      direction: {
        type: String,
        notify: true,
      },
      active: {
        type: Boolean,
        value: false,
        notify: true,
      },
      filterValue: {
        type: String,
        notify: true,
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
              search: 'Search',
              clear: 'Clear',
            },
            'en-en': {
              search: 'Search',
              clear: 'Clear',
            },
            'en-US': {
              search: 'Search',
              clear: 'Clear',
            },
            'en-us': {
              search: 'Search',
              clear: 'Clear',
            },
            fr: {
              search: 'Rechercher',
              clear: 'Effacer',
            },
            'fr-fr': {
              search: 'Rechercher',
              clear: 'Effacer',
            },
          };
        },
      },
    };
  }

  _toggleActive() {
    this.set('active', !this.active);
    if (!this.active) {
      this.set('filterValue', null);
    }
    flush();
    const paperInput = this.shadowRoot.querySelector('paper-input');
    paperInput.setAttribute('tabindex', 1);
    microTask.run(() => {
      paperInput.focus();
    });
  }
}

window.customElements.define(PdaHeaderWithFilterAndSort.is, PdaHeaderWithFilterAndSort);

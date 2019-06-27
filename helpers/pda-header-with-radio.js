import { PolymerElement } from '@polymer/polymer/polymer-element';
import { html } from '@polymer/polymer/lib/utils/html-tag';
import '@polymer/paper-menu-button/paper-menu-button';
import '@polymer/paper-listbox/paper-listbox';
import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/paper-item/paper-icon-item';
import '@polymer/paper-radio-group/paper-radio-group';
import '@polymer/paper-radio-button/paper-radio-button';
import '@polymer/paper-item/paper-item-body';
import '@polymer/iron-icons/iron-icons';
import '@polymer/iron-icon/iron-icon';
import '@polymer/iron-flex-layout/iron-flex-layout-classes';
import './pda-header-with-sort';

class PdaHeaderWithRadio extends PolymerElement {
  static get is() {
    return 'pda-header-with-radio';
  }

  static get template() {
    return html`
      <style include="iron-flex iron-flex-alignment">
        :host {
          display: block;
        }

        paper-menu-button {
          padding: 0;
        }

        paper-icon-button {
          padding: 0;
          width: 24px;
          height: 24px;
          --paper-icon-button: {
            color: var(--paper-icon-button-color);
          }

          --paper-icon-button-hover: {
            color: var(--paper-icon-button-color-hover);
          }
        }

        .selected {
          font-style: italic;
          margin-left: 4px;
          color: #1E73BE;
        }
      </style>
      <div class="layout horizontal center">
        <paper-menu-button ignore-select dynamic-align>
          <div slot="dropdown-trigger" class="layout horizontal center">
            <span class="flex layout horizontal">
              <slot></slot>
              <dom-if if="[[selectedChoice]]">
                <template>
                  <div class="selected">(1)</div>
                </template>
              </dom-if>
            </span>
            <paper-icon-button icon="arrow-drop-down"></paper-icon-button>
          </div>
          <div slot="dropdown-content">
            <paper-radio-group selected="{{selectedChoice}}" attr-for-selected="name">
              <dom-repeat items="[[choices]]" as="choice">
                <template>
                  <paper-radio-button name="[[choice.key]]">[[choice.label]]</paper-radio-button>
                </template>
              </dom-repeat>
            </paper-radio-group>
          </div>
        </paper-menu-button>
        <dom-if if="[[selectedChoice]]">
          <template>
            <paper-icon-button icon="clear" on-tap="_clearSelected"></paper-icon-button>
          </template>
        </dom-if>
      </div>
  `;
  }

  static get properties() {
    return {
      choices: Array,
      selectedChoice: {
        type: Array,
        notify: true,
      },
    };
  }

  _clearSelected() {
    this.set('selectedChoice', '');
  }
}

window.customElements.define(PdaHeaderWithRadio.is, PdaHeaderWithRadio);

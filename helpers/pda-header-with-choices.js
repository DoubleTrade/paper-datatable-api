import { PolymerElement } from '@polymer/polymer/polymer-element';
import { html } from '@polymer/polymer/lib/utils/html-tag';
import '@polymer/paper-menu-button/paper-menu-button';
import '@polymer/paper-listbox/paper-listbox';
import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/paper-item/paper-icon-item';
import '@polymer/paper-item/paper-item-body';
import '@polymer/iron-icons/iron-icons';
import '@polymer/iron-icon/iron-icon';
import '@polymer/iron-flex-layout/iron-flex-layout-classes';
import './pda-header-with-sort';
/**
 * `pda-header-with-sort`
 *
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class PdaHeaderWithChoices extends PolymerElement {
  static get is() {
    return 'pda-header-with-choices';
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

        iron-icon[icon="check-box"] {
          color: var(--paper-datatable-api-checked-checkbox-color, --primary-color);
        }

        iron-icon[icon="check-box-outline-blank"] {
          color: var(--paper-datatable-api-unchecked-checkbox-color, --primary-text-color);
        }

        .selected {
          font-style: italic;
          margin-left: 4px;
          color: var(--primary-color, #1E73BE);
        }

        .choice-icon {
          margin-left: 24px;
        }

        paper-icon-button {
          --paper-icon-button: {
            color: var(--paper-icon-button-color);
            transition: color 0.3s;
          }

          --paper-icon-button-hover: {
            color: var(--paper-icon-button-color-hover);
          }
        }
      </style>
      <div class="layout horizontal center">
        <paper-menu-button ignore-select dynamic-align>
          <div slot="dropdown-trigger" class="layout horizontal center">
            <span class="flex layout horizontal">
              <slot></slot>
              <dom-if if="[[_notEmpty(selectedChoices)]]">
                <template>
                  <div class="selected">[[_countSelected(selectedChoices)]]</div>
                </template>
              </dom-if>
            </span>
            <paper-icon-button icon="arrow-drop-down"></paper-icon-button>
          </div>
          <paper-listbox slot="dropdown-content" selected-values="{{selectedChoices}}" multi attr-for-selected="name">
            <dom-repeat items="[[choices]]" as="choice">
              <template>
                <paper-icon-item name="[[choice.key]]">
                  <iron-icon slot="item-icon" icon$="[[_computeIconName(choice.key, selectedChoices.*)]]"></iron-icon>
                  <paper-item-body style$="[[choice.style]]">
                    [[choice.label]]
                  </paper-item-body>
                  <dom-if if="[[choice.icon]]">
                    <template>
                        <iron-icon class="choice-icon" style$="[[choice.iconStyle]]" icon$="[[choice.icon]]"></iron-icon>
                    </template>
                  </dom-if>  
                </paper-icon-item>
              </template>
            </dom-repeat>
          </paper-listbox>
        </paper-menu-button>
      </div>
  `;
  }

  static get properties() {
    return {
      choices: Array,
      selectedChoices: {
        type: Array,
        notify: true,
      },
    };
  }

  _computeIconName(choice, selectedChoices) {
    if (selectedChoices.base.indexOf(choice) === -1) {
      return 'check-box-outline-blank';
    }
    return 'check-box';
  }

  _countSelected(selectedChoices) {
    return selectedChoices.length > 0 ? ` (${selectedChoices.length})` : '';
  }

  _notEmpty(selectedChoices) {
    return selectedChoices.length > 0;
  }
}

window.customElements.define(PdaHeaderWithChoices.is, PdaHeaderWithChoices);

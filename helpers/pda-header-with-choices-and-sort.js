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
import './pda-header-with-choices';

class PdaHeaderWithChoicesAndSort extends PolymerElement {
  static get is() {
    return 'pda-header-with-choices-and-sort';
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
      </style>
      <pda-header-with-sort direction="{{direction}}">
        <pda-header-with-choices selected-choices="{{selectedChoices}}" choices="[[choices]]">
          [[header]]
        </pda-header-with-choices>
      </pda-header-with-sort>
  `;
  }

  static get properties() {
    return {
      header: String,
      direction: {
        type: String,
        notify: true,
      },
      choices: Array,
      selectedChoices: {
        type: Array,
        notify: true,
      },
    };
  }
}

window.customElements.define(PdaHeaderWithChoicesAndSort.is, PdaHeaderWithChoicesAndSort);

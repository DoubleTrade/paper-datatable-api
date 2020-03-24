import { PolymerElement } from '@polymer/polymer/polymer-element';
import { html } from '@polymer/polymer/lib/utils/html-tag';
import '@polymer/iron-flex-layout/iron-flex-layout-classes';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu';
import '@polymer/paper-listbox/paper-listbox';
import '@polymer/paper-item/paper-item';
import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/paper-tooltip/paper-tooltip';

class DtPaperDatatableApiFooter extends PolymerElement {
  static get is() {
    return 'paper-datatable-api-footer';
  }

  static get template() {
    return html`
      <style include="iron-flex iron-flex-alignment">
        :host {
          display: block;
        }

        .foot {
          font-size: 12px;
          font-weight: normal;
          height: 55px;
          border-top: 1px solid;
          border-color: rgba(0, 0, 0, var(--dark-divider-opacity));
          padding: 0 14px 0 0;
          color: rgba(0, 0, 0, var(--dark-secondary-opacity));
        }

        .foot .left {
          padding: 0 0 0 14px;
        }

        .foot paper-icon-button {
          width: 24px;
          height: 24px;
          padding: 0;
          margin-left: 24px;
          --paper-icon-button: {
            color: var(--paper-icon-button-color);
          }
          --paper-icon-button-disabled: {
            color: var(--paper-icon-button-color-disabled);
          }
          --paper-icon-button-hover: {
            color: var(--paper-icon-button-color-hover);
          }
        }

        .foot .status {
          margin: 0 8px 0 32px;
        }

        .foot .size {
          width: 64px;
          text-align: right;
        }

        .size paper-dropdown-menu {

          --paper-dropdown-menu-icon: {
            color: var(--paper-icon-button-color);
          }

          --paper-input-container-underline: {
            display: none;
          }

          ;

          --paper-input-container-input: {
            text-align: right;
            font-size: 12px;
            font-weight: 500;
            color: var(--paper-datatable-navigation-bar-text-color, rgba(0, 0, 0, .54));
          }

          ;

          --paper-dropdown-menu-icon: {
            color: var(--paper-datatable-navigation-bar-text-color, rgba(0, 0, 0, .54));
          }

          ;
        }
      </style>
      <div class$="layout horizontal center foot [[_computePosition(footerPosition)]]">
        <div class$="[[footerPosition]]">
          <div class="layout horizontal end-justified center">
            <div class="layout horizontal center">
              <div>
                [[localize('linesPerPage', language)]]
              </div>
              <div class="size">
                <paper-dropdown-menu no-label-float vertical-align="bottom">
                  <paper-listbox attr-for-selected="size" on-iron-select="_newSizeIsSelected" selected="[[size]]" slot="dropdown-content">
                    <dom-repeat items="[[availableSize]]" as="size">
                      <template>
                        <paper-item size="[[size]]">[[size]]</paper-item>
                      </template>
                    </dom-repeat>
                  </paper-listbox>
                </paper-dropdown-menu>
              </div>
            </div>
            <div class="status">
              [[_computeCurrentSize(page, size)]]-[[_computeCurrentMaxSize(page, size, totalElements)]]
              [[localize('of', language)]]
              [[totalElements]]
            </div>
            <dom-if if="[[!_prevButtonEnabled(page)]]">
              <template>
                <paper-icon-button id="previousPageBtn1" icon="chevron-left" disabled on-tap="_prevPage"></paper-icon-button>
                <paper-tooltip for="previousPageBtn1" position="top">[[localize('previousPage', language)]]</paper-tooltip>
              </template>
            </dom-if>
            <dom-if if="[[_prevButtonEnabled(page)]]">
              <template>
                <paper-icon-button id="previousPageBtn2" icon="chevron-left" on-tap="_prevPage"></paper-icon-button>
                <paper-tooltip for="previousPageBtn2" position="top">[[localize('previousPage', language)]]</paper-tooltip>
              </template>
            </dom-if>
            <dom-if if="[[!_nextButtonEnabled(page, totalPages)]]">
              <template>
                <paper-icon-button id="nextPageBtn1" icon="chevron-right" disabled on-tap="_nextPage"></paper-icon-button>
                <paper-tooltip for="nextPageBtn1" position="top">[[localize('nextPage', language)]]</paper-tooltip>
              </template>
            </dom-if>
            <dom-if if="[[_nextButtonEnabled(page, totalPages)]]">
              <template>
                <paper-icon-button id="nextPageBtn2" icon="chevron-right" on-tap="_nextPage"></paper-icon-button>
                <paper-tooltip for="nextPageBtn2" position="top">[[localize('nextPage', language)]]</paper-tooltip>
              </template>
            </dom-if>
          </div>
        </div>
      </div>
      `;
  }

  static get properties() {
    return {
      footerPosition: {
        type: String,
        value: 'left',
      },
      size: {
        type: Number,
        notify: true,
      },
      page: {
        type: Number,
        notify: true,
      },
      oldPage: Number,
      totalElements: Number,
      totalPages: Number,
      availableSize: Array,
      language: {
        type: String,
        value: 'fr',
      },
      resources: {
        notify: true,
        value() {
          return {
            en: {
              nextPage: 'Next page',
              previousPage: 'Previous page',
              linesPerPage: 'Lines per page',
              of: 'of',

            },
            'en-en': {
              nextPage: 'Next page',
              previousPage: 'Previous page',
              linesPerPage: 'Lines per page',
              of: 'of',
            },
            'en-US': {
              nextPage: 'Next page',
              previousPage: 'Previous page',
              linesPerPage: 'Lines per page',
              of: 'of',
            },
            'en-us': {
              nextPage: 'Next page',
              previousPage: 'Previous page',
              linesPerPage: 'Lines per page',
              of: 'of',
            },
            fr: {
              nextPage: 'Page suivante',
              previousPage: 'Page précédente',
              linesPerPage: 'Lignes par page',
              of: 'sur',
            },
            'fr-fr': {
              nextPage: 'Page suivante',
              previousPage: 'Page précédente',
              linesPerPage: 'Lignes par page',
              of: 'sur',
            },
          };
        },
      },
    };
  }

  localize(key, language) {
    if (this && this.resources && this.resources[language]) {
      return this.resources[language][key] || '';
    }
    return '';
  }

  _computeCurrentSize(page, size) {
    return (page * size) + 1;
  }

  _computeCurrentMaxSize(page, size, totalElements) {
    const maxSize = size * (page + 1);
    return maxSize > totalElements ? totalElements : maxSize;
  }

  _nextPage() {
    if (this.page + 1 < this.totalPages) {
      this.page = this.page + 1;
    }
  }

  _prevPage() {
    if (this.page > 0) {
      this.page = this.page - 1;
    }
  }

  _nextButtonEnabled(page, totalPages) {
    return page + 1 < totalPages;
  }

  _prevButtonEnabled(page) {
    return page > 0;
  }

  _newSizeIsSelected() {
    const newSize = this.shadowRoot.querySelector('paper-listbox').selected;
    if (newSize) {
      if (this.oldPage !== null && this.oldPage !== undefined) {
        this.page = 0;
      }
      this.size = newSize;
    }
  }

  _computePosition(position) {
    if (position === 'right') {
      return 'end-justified';
    }
    return '';
  }
}

customElements.define(DtPaperDatatableApiFooter.is, DtPaperDatatableApiFooter);

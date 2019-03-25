import { PolymerElement } from '@polymer/polymer/polymer-element';
import { html } from '@polymer/polymer/lib/utils/html-tag';
import { templatize } from '@polymer/polymer/lib/utils/templatize';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class';
import { Templatizer } from '@polymer/polymer/lib/legacy/templatizer-behavior';
/**
 * `paper-datatable-api`
 *
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class PaperDatatableApiColumn extends mixinBehaviors([Templatizer], PolymerElement) {
  static get is() {
    return 'paper-datatable-api-column';
  }

  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <slot></slot>`;
  }

  static get properties() {
    return {
      property: String,
      otherProperties: Array,
    };
  }

  constructor() {
    super();
    this.instances = [];
  }

  connectedCallback() {
    if (!this.ctor) {
      const props = {
        __key__: true,
        [this.header]: true,
        [this.property]: true,
      };
      const template = this.querySelector('template');
      this.ctor = templatize(template, this, {
        instanceProps: props,
        forwardHostProp(prop, value) {
          this.instances.forEach((inst) => {
            inst.forwardHostProp(prop, value);
          });
        },
      });
    }
  }

  /**
   * Stamp the value in template (according to property).
   *
   * @property fillTemplate
   * @param {String} value The value of the property.
   */
  fillTemplate(value, otherValues) {
    const instance = new this.ctor({ value, otherValues });
    this.instances.push(instance);
    return instance;
  }
}

window.customElements.define(PaperDatatableApiColumn.is, PaperDatatableApiColumn);

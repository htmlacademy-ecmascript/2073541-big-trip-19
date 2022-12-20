import { createElement } from '../render.js';
import { EMPTY_LIST_MESSAGES } from '../const';

function createEmptyListTemplate() {
  return `<p class="trip-events__msg">${EMPTY_LIST_MESSAGES.newEvent}</p>`;
}

export default class EmptyListView {

  #element = null;

  get template() {
    return createEmptyListTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}

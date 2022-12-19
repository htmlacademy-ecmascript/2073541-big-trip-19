import { createElement } from '../render.js';
import { TRIP_EVENT_MESSAGES } from '../const';

function createEmptyListTemplate() {
  return `<p class="trip-events__msg">${TRIP_EVENT_MESSAGES.everything}</p>`;
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

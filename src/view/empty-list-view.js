import AbstractView from '../framework/view/abstract-view.js';
import { EMPTY_LIST_MESSAGES } from '../const';

function createEmptyListTemplate(filterType) {
  return `<p class="trip-events__msg">${EMPTY_LIST_MESSAGES[filterType]}</p>`;
}

export default class EmptyListView extends AbstractView {

  #filterType = null;

  constructor({ filterType }) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createEmptyListTemplate(this.#filterType);
  }
}

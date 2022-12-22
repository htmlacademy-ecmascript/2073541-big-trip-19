import AbstractView from '../framework/view/abstract-view.js';
import { EMPTY_LIST_MESSAGES } from '../const';

function createEmptyListTemplate() {
  return `<p class="trip-events__msg">${EMPTY_LIST_MESSAGES.newEvent}</p>`;
}

export default class EmptyListView extends AbstractView {

  get template() {
    return createEmptyListTemplate();
  }
}

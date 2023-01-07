import AbstractView from '../framework/view/abstract-view.js';
import {SortType} from '../const.js';

function createListSortTemplate(currentSortType) {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      <div class="trip-sort__item  trip-sort__item--day">
        <input id=${SortType.DAY} class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" ${SortType.DAY === currentSortType ? 'checked' : ''}>
        <label class="trip-sort__btn" for=${SortType.DAY}>Day</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--event">
        <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
        <label class="trip-sort__btn" for="sort-event">Event</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--time">
        <input id=${SortType.TIME} class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time" ${SortType.TIME === currentSortType ? 'checked' : ''}>
        <label class="trip-sort__btn" for=${SortType.TIME}>Time</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--price">
        <input id=${SortType.PRICE} class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" ${SortType.PRICE === currentSortType ? 'checked' : ''}>
        <label class="trip-sort__btn" for=${SortType.PRICE}>Price</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--offer">
        <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
        <label class="trip-sort__btn" for="sort-offer">Offers</label>
      </div>
    </form>`
  );
}

export default class SortView extends AbstractView {
  #handleSortTypeChange = null;
  #currentSortType = null;

  constructor({ onSortTypeChange, currentSortType }) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;
    this.#currentSortType = currentSortType;

    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  }

  get template() {
    return createListSortTemplate(this.#currentSortType);
  }

  #sortTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.id);
  };
}


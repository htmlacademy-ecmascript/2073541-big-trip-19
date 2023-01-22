import AbstractView from '../framework/view/abstract-view.js';

const createFilterItemTemplate = (filters, currentFilterType) => {
  const {name, count} = filters;

  return (
    `<div class="trip-filters__filter">
      <input
        id="filter-${name}"
        class="trip-filters__filter-input  visually-hidden"
        type="radio" name="trip-filter"
        value="${name}"${count === 0 ? 'disabled' : ''}
        ${currentFilterType === name ? 'checked' : ''}>
      <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
    </div>`
  );
};

const createListFilterTemplate = (filterItems, currentFilterType) => {

  const filterItemsTemplate = filterItems.map((filter) => createFilterItemTemplate(filter, currentFilterType)).join('');
  return (
    `<form class="trip-filters" action="#" method="get">
      ${filterItemsTemplate}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export default class FilterView extends AbstractView {

  #filters = null;
  #currentFilter = null;
  #handleFilterChange = null;

  constructor({ filters, currentFilterType, onFilterTypeChange }) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this.#handleFilterChange = onFilterTypeChange;
    this.element.addEventListener('change', this.#filterChangeHandler);
  }

  get template() {
    return createListFilterTemplate(this.#filters, this.#currentFilter);
  }

  #filterChangeHandler = (evt) => {

    evt.preventDefault();
    this.#handleFilterChange(evt.target.value);
  };

}


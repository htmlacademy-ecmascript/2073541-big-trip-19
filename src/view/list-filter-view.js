import AbstractView from '../framework/view/abstract-view.js';

const createFilterItemTemplate = (filters) => {
  const {name, count} = filters;

  return (
    `<div class="trip-filters__filter">
      <input id="filter-${name}"
      class="trip-filters__filter-input  visually-hidden"
      type="radio" name="trip-filter"
      value="${name}"${count === 0 ? 'disabled' : ''}>
      <label class="trip-filters__filter-label"
      for="filter-${name}">${name}</label>
    </div>`
  );
};

const createListFilterTemplate = (filterItems) => {

  const filterItemsTemplate = filterItems.map((filter) => createFilterItemTemplate(filter)).join('');
  return (
    `<form class="trip-filters" action="#" method="get">
      ${filterItemsTemplate}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export default class ListFilterView extends AbstractView {

  #filters = null;

  constructor({ filters }) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createListFilterTemplate(this.#filters);
  }
}


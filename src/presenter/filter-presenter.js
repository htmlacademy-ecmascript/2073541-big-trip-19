import { render, replace, remove } from '../framework/render.js';
import FilterView from '../view/filter-view.js';
import { filter } from '../utils/filters.js';
import { FilterType, UpdateType } from '../const.js';

export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #pointsModel = null;
  #filterComponent = null;

  constructor({ filterContainer, filterModel, pointsModel }) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const points = this.#pointsModel.points;

    return [
      {
        type: FilterType.EVERYTHING,
        name: 'Everything',
        count: filter[FilterType.EVERYTHING](points).length,
      },
      {
        type: FilterType.FUTURE,
        name: 'Future',
        count: filter[FilterType.FUTURE](points).length,
      },
      {
        type: FilterType.PAST,
        name: 'Past',
        count: filter[FilterType.PAST](points).length,
      },
      {
        type: FilterType.PRESENT,
        name: 'Present',
        count: filter[FilterType.PRESENT](points).length,
      }
    ];
  }

  init() {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView({
      filters,
      currentFilterType: this.#filterModel.filter,
      onFilterTypeChange: this.#handleFilterTypeChange
    });

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {

    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}

import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import ListView from '../view/list-view.js';
import EmptyListView from '../view/empty-list-view.js';
import { updateItem } from '../utils/utils.js';
import { sortPointDate, sortPointTime, sortPointPrice } from '../utils/filters.js';
import { render } from '../framework/render.js';
import { generateFilter } from '../mock/filter.js';
import PointPresenter from './point-presenter.js';
import {SortType} from '../const.js';


export default class TripPresenter {
  #pointListContainer = new ListView();
  #pointsContainer = null;
  #pointsModel = null;
  #pointsList = null;
  #sourcedPointsList = null;
  #destinations = null;
  #allOffers = null;
  #pointPresenterMap = new Map();
  #currentSortType = SortType.DAY;
  #sortComponent = null;

  constructor({ pointsContainer, pointsModel }) {
    this.#pointsContainer = pointsContainer;
    this.#pointsModel = pointsModel;
  }

  #renderPoint = (point, offers, destination) => {

    const pointPresenter = new PointPresenter({
      pointListContainer: this.#pointListContainer.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange
    });

    pointPresenter.init(point, offers, destination);
    this.#pointPresenterMap.set(point.id, pointPresenter);
  };


  #renderEmptyList() {
    render(new EmptyListView(), this.#pointsContainer);
  }

  #renderPoints() {
    if (!this.#pointsList.length) {
      this.#renderEmptyList();
      return;
    }

    this.#pointsList.forEach((listPoint) =>
      this.#renderPoint(listPoint, this.#allOffers, this.#destinations));
  }

  #renderSort() {
    this.#sortComponent = new SortView({ onSortTypeChange: this.#handleSortTypeChange });
    render(this.#sortComponent, this.#pointsContainer);
  }


  #handleModeChange = () => {
    this.#pointPresenterMap.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#pointsList = updateItem(this.#pointsList, updatedPoint);
    this.#sourcedPointsList = updateItem(this.#sourcedPointsList, updatedPoint);
    this.#pointPresenterMap.get(updatedPoint.id).init(updatedPoint, this.#allOffers, this.#destinations );
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderPoints();
  };

  #sortPoints(sortType) {
    switch (sortType) {
      case SortType.DAY:
        this.#pointsList.sort(sortPointDate);
        break;
      case SortType.TIME:
        this.#pointsList.sort(sortPointTime);
        break;
      case SortType.PRICE:
        this.#pointsList.sort(sortPointPrice);
        break;
      default:
        this.#pointsList.sort(sortPointDate);
    }
    this.#currentSortType = sortType;
  }

  #clearPointList() {
    this.#pointPresenterMap.forEach((presenter) => presenter.destroy());
    this.#pointPresenterMap.clear();
  }


  init(container) {
    this.#pointsList = this.#pointsModel.points.sort(sortPointDate);
    this.#sourcedPointsList = [...this.#pointsModel.points];
    this.#destinations = [...this.#pointsModel.destinations];
    this.#allOffers = [...this.#pointsModel.offersByType];
    const filters = generateFilter(this.#pointsList);


    render(new FilterView({ filters }), container);
    this.#renderSort();
    render(this.#pointListContainer, this.#pointsContainer);

    this.#renderPoints();
  }
}

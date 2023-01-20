import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import ListView from '../view/list-view.js';
import EmptyListView from '../view/empty-list-view.js';
import { updateItem } from '../utils/utils.js';
import { sortPointDate, sortPointTime, sortPointPrice } from '../utils/filters.js';
import { render } from '../framework/render.js';
import { generateFilter } from '../mock/filter.js';
import PointPresenter from './point-presenter.js';
import {SortType, UpdateType, UserAction } from '../const.js';


export default class TripPresenter {
  #pointListContainer = new ListView();
  #pointsContainer = null;
  #pointsModel = null;
  #pointsList = null;
  #destinations = null;
  #allOffers = null;
  #pointPresenterMap = new Map();
  #currentSortType = SortType.DAY;
  #sortComponent = null;

  constructor({ pointsContainer, pointsModel }) {
    this.#pointsContainer = pointsContainer;
    this.#pointsModel = pointsModel;
    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  #renderPoint = (point, offers, destination) => {

    const pointPresenter = new PointPresenter({
      pointListContainer: this.#pointListContainer.element,
      onDataChange: this.#handleViewAction,
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
    this.#sortComponent = new SortView({ onSortTypeChange: this.#handleSortTypeChange, currentSortType: this.#currentSortType });
    render(this.#sortComponent, this.#pointsContainer);
  }


  #handleModeChange = () => {
    this.#pointPresenterMap.forEach((presenter) => presenter.resetView());
  };


  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearPointList();
    this.#renderPoints();
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
      default:
        throw new Error(`Unknown action type: '${actionType}'!`);
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenterMap.get(data.key).init(data, this.#allOffers, this.#destinations);
        break;
      case UpdateType.MINOR:
        this.#clearPointList();
        this.#renderPoints();
        break;
      case UpdateType.MAJOR:
        this.#clearPointList({resetRenderedPointCount: true, resetSortType: true});
        this.#renderPoints();
        break;
      default:
        throw new Error(`Unknown update type: '${updateType}'!`);
    }
  };


  #clearPointList() {
    this.#pointPresenterMap.forEach((presenter) => presenter.destroy());
    this.#pointPresenterMap.clear();
  }


  init(container) {
    this.#pointsList = [...this.#pointsModel.points];
    this.#destinations = [...this.#pointsModel.destinations];
    this.#allOffers = [...this.#pointsModel.offersByType];
    const filters = generateFilter(this.#pointsList);


    render(new FilterView({ filters }), container);
    this.#renderSort();
    render(this.#pointListContainer, this.#pointsContainer);

    this.#renderPoints();
  }
}


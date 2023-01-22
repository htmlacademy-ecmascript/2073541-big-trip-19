import SortView from '../view/sort-view.js';
import ListView from '../view/list-view.js';
import EmptyListView from '../view/empty-list-view.js';
import { updateItem } from '../utils/utils.js';
import { sortPointDate, sortPointTime, sortPointPrice } from '../utils/filters.js';
import { render, remove, RenderPosition } from '../framework/render.js';
import { generateFilter } from '../mock/filter.js';
import PointPresenter from './point-presenter.js';
import {SortType, UpdateType, UserAction, FilterType } from '../const.js';
import { filter } from '../utils/filters.js';


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
  #noPointComponent = null;
  #filterModel = null;
  #filterType = FilterType.EVERYTHING;
  #filteredPoints = null;

  constructor({ pointsContainer, pointsModel, filterModel }) {
    this.#pointsContainer = pointsContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
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
    this.#noPointComponent = new EmptyListView({
      filterType: this.#filterType
    });
    render(this.#noPointComponent, this.#pointsContainer);
  }

  #renderBoard() {
    this.#renderSort();
    const points = this.points;

    if (!points.length) {
      this.#renderEmptyList();
      return;
    }

    points.forEach((listPoint) =>
      this.#renderPoint(listPoint, this.#allOffers, this.#destinations));
  }

  #renderSort() {
    this.#sortComponent = new SortView({ onSortTypeChange: this.#handleSortTypeChange, currentSortType: this.#currentSortType });
    render(this.#sortComponent, this.#pointsContainer, RenderPosition.AFTERBEGIN);
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
    this.#renderBoard();
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
        this.#pointPresenterMap.get(data.id).init(data, this.#allOffers, this.#destinations);
        break;
      case UpdateType.MINOR:
        this.#clearPointList();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearPointList({resetRenderedPointCount: true, resetSortType: true});
        this.#renderBoard();
        break;
      default:
        throw new Error(`Unknown update type: '${updateType}'!`);
    }
  };


  #clearPointList({ resetSortType = false } = {}) {

    this.#pointPresenterMap.forEach((presenter) => presenter.destroy());
    this.#pointPresenterMap.clear();

    remove(this.#sortComponent);
    remove(this.#noPointComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }

  }


  get points() {

    const points = this.#pointsModel.points;
    const sortType = this.#currentSortType;
    this.#filterType = this.#filterModel.filter;
    const filteredPoints = filter[this.#filterType](points);

    switch (sortType) {
      case SortType.DAY:
        return [...filteredPoints].sort(sortPointDate);
      case SortType.TIME:
        return [...filteredPoints].sort(sortPointTime);
      case SortType.PRICE:
        return [...filteredPoints].sort(sortPointPrice);
      default:
        throw new Error(`Unknown sort type: '${sortType}'`);
    }
  }

  init() {
    this.#pointsList = [...this.#pointsModel.points];
    this.#destinations = [...this.#pointsModel.destinations];
    this.#allOffers = [...this.#pointsModel.offersByType];

    render(this.#pointListContainer, this.#pointsContainer);

    this.#renderBoard();
  }
}


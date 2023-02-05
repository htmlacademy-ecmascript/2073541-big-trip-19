import SortView from '../view/sort-view.js';
import ListView from '../view/list-view.js';
import EmptyListView from '../view/empty-list-view.js';
import LoadingView from '../view/loading-view.js';
import ErrorView from '../view/error-view.js';
import TripInfoView from '../view/trip-info-view.js';
import { sortPointDate, sortPointTime, sortPointPrice } from '../utils/filters.js';
import { render, remove, RenderPosition } from '../framework/render.js';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import {SortType, UpdateType, UserAction, FilterType, TimeLimit } from '../const.js';
import { filter } from '../utils/filters.js';
import dayjs from 'dayjs';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';


const DEFAULT_POINT = {
  basePrice: '',
  dateFrom: dayjs().toISOString(),
  dateTo: dayjs().toISOString(),
  destination: '',
  isFavorite: false,
  offers: [],
  type: 'flight'
};


export default class TripPresenter {
  #pointListContainer = new ListView();
  #pointsContainer = null;
  #tripInfoContainer = null;
  #pointsModel = null;
  #pointsList = null;
  #destinations = null;
  #allOffers = null;
  #pointPresenterMap = new Map();
  #currentSortType = SortType.DAY;
  #sortComponent = null;
  #tripInfoComponent = null;
  #noPointComponent = null;
  #filterModel = null;
  #filterType = FilterType.EVERYTHING;
  #newPointPresenter = null;
  #loadingComponent = new LoadingView();
  #loadingErrorComponent = new ErrorView();
  #isLoading = true;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });


  constructor({ pointsContainer, tripInfoContainer, pointsModel, filterModel, onNewPointDestroy }) {
    this.#tripInfoContainer = tripInfoContainer;
    this.#pointsContainer = pointsContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#newPointPresenter = new NewPointPresenter({
      pointListContainer: this.#pointListContainer.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy
    });

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


  #renderSort() {
    this.#sortComponent = new SortView({ onSortTypeChange: this.#handleSortTypeChange, currentSortType: this.#currentSortType });
    render(this.#sortComponent, this.#pointsContainer, RenderPosition.AFTERBEGIN);
  }

  #renderTripInfo() {
    remove(this.#tripInfoComponent);
    const points = this.#pointsModel.points.sort(sortPointDate);
    this.#tripInfoComponent = new TripInfoView(points, this.offers, this.destinations);
    render(this.#tripInfoComponent, this.#tripInfoContainer, RenderPosition.BEFOREBEGIN);
  }


  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
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

  #handleViewAction = async (actionType, updateType, update) => {

    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenterMap.get(update.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch (err) {
          this.#pointPresenterMap.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#newPointPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch (err) {
          this.#newPointPresenter.setAborting();
        }

        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenterMap.get(update.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch (err) {
          this.#pointPresenterMap.get(update.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
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
        this.#clearPointList({resetSortType: true});
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
        break;
      case UpdateType.INIT_ERROR:
        this.#isLoading = false;
        render(this.#loadingErrorComponent, this.#pointsContainer);
        remove(this.#loadingComponent);
        break;
      default:
        throw new Error(`Unknown update type: '${updateType}'!`);
    }
  };

  #renderLoading = () => {
    render(this.#loadingComponent, this.#pointsContainer);
  };

  #clearPointList({ resetSortType = false } = {}) {

    this.#pointPresenterMap.forEach((presenter) => presenter.destroy());
    this.#pointPresenterMap.clear();
    this.#newPointPresenter.destroy();

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

  get offers() {
    return this.#pointsModel.offers;
  }

  get destinations() {
    return this.#pointsModel.destinations;
  }

  createPoint() {
    const point = DEFAULT_POINT;
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter
      .init(point, this.offers, this.destinations);
  }

  #renderBoard() {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    const points = this.points;

    if (!points.length) {
      this.#renderTripInfo();
      this.#renderEmptyList();
      return;
    }
    this.#renderTripInfo();
    this.#renderSort();
    points.forEach((listPoint) =>
      this.#renderPoint(listPoint, this.offers, this.destinations));
  }

  init() {
    render(this.#pointListContainer, this.#pointsContainer);
    this.#renderBoard();

  }
}


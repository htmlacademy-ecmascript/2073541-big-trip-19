import ListFilterView from '../view/list-filter-view.js';
import ListSortView from '../view/list-sort-view.js';
import ListView from '../view/list-view.js';
import EmptyListView from '../view/empty-list-view.js';
import { updateItem } from '../utils/utils.js';
import { render } from '../framework/render.js';
import { generateFilter } from '../mock/filter.js';
import PointPresenter from './point-presenter.js';


export default class TripPresenter {
  #pointListContainer = new ListView();
  #pointsContainer = null;
  #pointsModel = null;
  #pointsList = null;
  #sourcedPointsList = null;
  #destinations = null;
  #allOffers = null;
  #pointPresenterMap = new Map();

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

  #handleModeChange = () => {
    this.#pointPresenterMap.forEach((presenter) => presenter.resetView());
  };

  //function updateItem(items, update) {
  //  return items.map((item) => item.id === update.id ? update : item);
  //}

  #handlePointChange = (updatedPoint) => {
    this.#pointsList = updateItem(this.#pointsList, updatedPoint);
    this.#sourcedPointsList = updateItem(this.#sourcedPointsList, updatedPoint);
    this.#pointPresenterMap.get(updatedPoint.id).init(updatedPoint, this.#allOffers, this.#destinations );
  };


  init(container) {
    this.#pointsList = [...this.#pointsModel.points];
    this.#sourcedPointsList = [...this.#pointsModel.points];
    this.#destinations = [...this.#pointsModel.destinations];
    this.#allOffers = [...this.#pointsModel.offersByType];
    const filters = generateFilter(this.#pointsList);


    render(new ListFilterView({ filters }), container);
    render(new ListSortView(), this.#pointsContainer);
    render(this.#pointListContainer, this.#pointsContainer);

    this.#renderPoints();
  }
}

import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';
import ListFilterView from '../view/list-filter-view.js';
import ListSortView from '../view/list-sort-view.js';
import ListView from '../view/list-view.js';
import EmptyListView from '../view/empty-list-view.js';
import { isEscKey } from '../utils.js';
import { render, replace } from '../framework/render.js';


export default class TripPresenter {
  #pointListContainer = new ListView();
  #pointsContainer = null;
  #pointsModel = null;
  #pointsList = null;
  #destinations = null;
  #offersByType = null;

  constructor({ pointsContainer, pointsModel }) {
    this.#pointsContainer = pointsContainer;
    this.#pointsModel = pointsModel;
  }

  #renderPoint(point, allOffers, destinations) {

    const pointComponent = new PointView({
      point,
      allOffers,
      destinations,
      onEditClick: () => {
        replaceCardToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const pointEditComponent = new EditPointView({
      point,
      allOffers,
      destinations,
      onFormSubmit:() => {
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onEditClick: () => {
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replaceCardToForm() {
      replace(pointEditComponent, pointComponent);
    }

    function replaceFormToCard() {
      replace(pointComponent, pointEditComponent);
    }

    function escKeyDownHandler (evt) {
      if (isEscKey(evt)) {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    }

    render(pointComponent, this.#pointListContainer.element);
  }

  #renderEmptyList() {
    render(new EmptyListView(), this.#pointsContainer);
  }

  #renderPoints() {
    this.#pointsList.forEach((listPoint) =>
      this.#renderPoint(listPoint, this.#offersByType, this.#destinations));
  }


  init(container) {
    this.#pointsList = this.#pointsModel.points;
    this.#destinations = this.#pointsModel.destinations;
    this.#offersByType = this.#pointsModel.offersByType;

    if (!this.#pointsList.length) {
      this.#renderEmptyList();
      return;
    }
    render(new ListFilterView(), container);
    render(new ListSortView(), this.#pointsContainer);
    render(this.#pointListContainer, this.#pointsContainer);

    this.#renderPoints();
  }
}


import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';
import ListFilterView from '../view/list-filter-view.js';
import ListSortView from '../view/list-sort-view.js';
import ListView from '../view/list-view.js';
import { isEscKey } from '../utils.js';
import {render} from '../render.js';


export default class TripPresenter {
  #pointListContainer = new ListView();
  #pointsContainer = null;
  #pointsModel = null;
  #listPoints = null;
  #destinations = null;
  #offersByType = null;

  constructor({ pointsContainer, pointsModel }) {
    this.#pointsContainer = pointsContainer;
    this.#pointsModel = pointsModel;
  }

  #renderPoint(point, allOffers, destinations) {
    const pointComponent = new PointView({ point, allOffers, destinations});
    const pointEditComponent = new EditPointView({ point, allOffers, destinations});

    const replaceCardToForm = () => {
      this.#pointListContainer.element.replaceChild(pointEditComponent.element, pointComponent.element);
    };

    const replaceFormToCard = () => {
      this.#pointListContainer.element.replaceChild(pointComponent.element, pointEditComponent.element);
    };

    const escKeyDownHandler = (evt) => {
      if (isEscKey(evt)) {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceCardToForm();
      document.addEventListener('keydown', escKeyDownHandler);
    });

    pointEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceFormToCard();
      document.removeEventListener('keydown', escKeyDownHandler);
    });

    pointEditComponent.element.addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener('keydown', escKeyDownHandler);
    });

    render(pointComponent, this.#pointListContainer.element);
  }

  init(container) {
    this.#listPoints = this.#pointsModel.points;
    this.#destinations = this.#pointsModel.destinations;
    this.#offersByType = this.#pointsModel.offersByType;

    render(new ListFilterView(), container);
    render(new ListSortView(), this.#pointsContainer);
    render(this.#pointListContainer, this.#pointsContainer);

    this.#listPoints.forEach((listPoint) =>
      this.#renderPoint(listPoint, this.#offersByType, this.#destinations));
  }
}


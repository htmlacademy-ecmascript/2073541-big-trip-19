import EditPointView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';
import ListFilterView from '../view/list-filter-view.js';
import ListSortView from '../view/list-sort-view.js';
import ListView from '../view/list-view.js';
import { isEscKey } from '../utils.js';
import {render} from '../render.js';


export default class TripPresenter {
  #pointListContainer = new ListView();

  constructor({ pointsContainer, pointsModel }) {
    this.pointsContainer = pointsContainer;
    this.pointsModel = pointsModel;
  }


  init(container) {
    this.listPoints = this.pointsModel.points;
    this.destinations = this.pointsModel.destinations;
    this.offersByType = this.pointsModel.offersByType;

    render(new ListFilterView(), container);
    render(new ListSortView(), this.pointsContainer);
    render(this.#pointListContainer, this.pointsContainer);
    render(new EditPointView({ point: this.listPoints[0] , allOffers: this.offersByType, destinations:  this.destinations }),
      this.#pointListContainer.element);

    this.listPoints.forEach((listPoint) => {
      render(new PointView({ point: listPoint, allOffers: this.offersByType, destinations: this.destinations}),
        this.#pointListContainer.element);
    });
  }
}


import EditPointView from '../view/edit-point-view.js';
import ListItemView from '../view/point-view.js';
import ListFilterView from '../view/list-filter-view.js';
import ListSortView from '../view/list-sort-view.js';
import ListView from '../view/list-view.js';

import {render} from '../render.js';


export default class TripPresenter {
  tripListComponent = new ListView();

  constructor({ boardContainer, pointsModel }) {
    this.boardContainer = boardContainer;
    this.pointsModel = pointsModel;
  }

  init(container) {
    this.listPoints = this.pointsModel.getPoints();
    this.destinations = this.pointsModel.getDestinations();
    this.offersByType = this.pointsModel.getOffersByType();


    render(new ListFilterView(), container);
    render(new ListSortView(), this.boardContainer);
    render(this.tripListComponent, this.boardContainer);

    render(new EditPointView({ point: this.listPoints[0] , allOffers: this.offersByType, destinations:  this.destinations }), this.tripListComponent.getElement());

    this.listPoints.forEach((listPoint) => {


      render(new ListItemView({ point: listPoint, allOffers: this.offersByType, destinations:  this.destinations}), this.tripListComponent.getElement());
    });
  }
}


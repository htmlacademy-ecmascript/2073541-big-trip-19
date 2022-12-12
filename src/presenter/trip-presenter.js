import EditPointView from '../view/edit-point-view.js';
import ListItemView from '../view/list-item-view.js';
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
    this.listPoints = [...this.pointsModel.getPoints()];

    render(new ListFilterView(), container);
    render(new ListSortView(), this.boardContainer);
    render(this.tripListComponent, this.boardContainer);

    render(new EditPointView({ point: this.listPoints[0] } ), this.tripListComponent.getElement());

    for (let i = 0; i < 5; i++) {
      render(new ListItemView({ point: this.listPoints[i] }), this.tripListComponent.getElement());
    }
  }
}


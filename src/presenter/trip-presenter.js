import EditPointView from '../view/edit-point-view.js';
import ListItemView from '../view/list-item-view.js';
import ListFilterView from '../view/list-filter-view.js';
import ListSortView from '../view/list-sort-view.js';
import ListView from '../view/list-view.js';

import {render} from '../render.js';


export default class TripPresenter {
  tripListComponent = new ListView();

  constructor({ boardContainer }) {
    this.boardContainer = boardContainer;
  }

  init(container) {
    render(new ListFilterView(), container);
    render(new ListSortView(), this.boardContainer);
    render(this.tripListComponent, this.boardContainer);
    render(new EditPointView(), this.tripListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new ListItemView(), this.tripListComponent.getElement());
    }
  }
}


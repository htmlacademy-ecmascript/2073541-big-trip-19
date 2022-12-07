import EditPointView from '../view/edit-point-view.js';
import NewListItemView from '../view/list-item-view.js';
import NewListFilterView from '../view/list-filter-view.js';
import NewListSortView from '../view/list-sort-view.js';
import TripListView from '../view/list-view.js';

import {render} from '../render.js';


export default class TripPresenter {
  tripListComponent = new TripListView();

  constructor({ boardContainer }) {
    this.boardContainer = boardContainer;
  }

  init(container) {
    render(new NewListFilterView(), container);
    render(new NewListSortView(), this.boardContainer);
    render(this.tripListComponent, this.boardContainer);
    render(new EditPointView(), this.tripListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new NewListItemView(), this.tripListComponent.getElement());
    }
  }
}


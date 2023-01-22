
import TripPresenter from './presenter/trip-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import './mock/point.js';

const headerElement = document.querySelector('.trip-controls');
const tripEventsElement = document.querySelector('.trip-events');
const pointsModel = new PointsModel();
const filterModel = new FilterModel();

const tripPresenter = new TripPresenter({
  pointsContainer: tripEventsElement, pointsModel, filterModel
});

const filterPresenter = new FilterPresenter({
  filterContainer: headerElement,
  filterModel,
  pointsModel
});

tripPresenter.init();
filterPresenter.init();

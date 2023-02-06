
import TripPresenter from './presenter/trip-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import NewPointBtnView from './view/new-point-button-view';
import { render } from './framework/render.js';
import PointsApiService from './points-api-service.js';

const AUTHORIZATION = 'Basic 2bacd1517';
const END_POINT = 'https://19.ecmascript.pages.academy/big-trip';
const headerElement = document.querySelector('.trip-controls');
const tripEventsElement = document.querySelector('.trip-events');
const newPointBtnContainerElement = document.querySelector('.trip-main');

const pointsModel = new PointsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});

const filterModel = new FilterModel();

const tripPresenter = new TripPresenter({
  pointsContainer: tripEventsElement,
  tripInfoContainer: headerElement,
  pointsModel,
  filterModel,
  onNewPointDestroy: handleNewPointFormClose
});

const filterPresenter = new FilterPresenter({
  filterContainer: headerElement,
  filterModel,
  pointsModel
});


const newPointButtonComponent = new NewPointBtnView({
  onClick: handleNewPointButtonClick
});

function handleNewPointButtonClick() {
  tripPresenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}

function handleNewPointFormClose () {
  newPointButtonComponent.element.disabled = false;
}

filterPresenter.init();
tripPresenter.init();
pointsModel.init().finally(() => {
  render(newPointButtonComponent, newPointBtnContainerElement);
});


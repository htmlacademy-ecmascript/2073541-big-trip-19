import dayjs from 'dayjs';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { capitalizeFirstLetter, isPositiveInteger } from '../utils/utils.js';
import flatpickr from 'flatpickr';
//import he from 'he';

import 'flatpickr/dist/flatpickr.min.css';

const getOffersTemplate = (offers, pointOffers) => pointOffers.map((offer) =>
  `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden"
          id="event-offer-${offer.id}" type="checkbox"
          name=${offer.title} ${offers.includes(offer.id) ? 'checked' : ''} value="${offer.id}">
        <label class="event__offer-label" for="event-offer-${offer.id}">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
   </div>`).join('');

const getTypeTemplate = (type, allOffers) => allOffers.map((offer) =>
  `<div class="event__type-item">
    <input id="event-type-${offer.type}-${offer.id}"
      class="event__type-input  visually-hidden" type="radio"
      name="event-type" value="${offer.type}" ${type === offer.type ? 'checked' : ''}>
    <label class="event__type-label  event__type-label--${offer.type}"
      for="event-type-${offer.type}-${offer.id}">${capitalizeFirstLetter(offer.type)}</label>
  </div>`).join('');


const getPointDescription = (destination) => {

  if(destination && destination.description) {
    return(
      `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
     <p class="event__destination-description">${destination.description}</p>
     <div class="event__photos-container">
        <div class="event__photos-tape">
          ${destination.pictures.map(({ src, description: pictureDescription }) =>
        `<img class="event__photo" src="${src}" alt="${pictureDescription}">`).join('')}
        </div>
      </div>
   </section>`);
  }
  return '';
};
const getDestinationInput = (destination, id) => {
  if(destination) {
    return `<input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination"
  value=${destination.name} list="destination-list-${id}" >`;
  }
  return `<input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination"
 value list="destination-list-${id}" >`;
};

function createEditPointTemplate (point, allOffers, destinations, isEditMode ) {

  const { type, dateFrom, dateTo, basePrice, destination, offers, id, isDisabled, isSaving, isDeleting} = point;
  const pointDestination = destinations.find((item) => destination === item.id);
  const pointOfferByType = allOffers.find((offer) => offer.type === type);
  const pointOffers = pointOfferByType.offers;
  const offersTemplate = getOffersTemplate(offers, pointOffers);
  const typesList = getTypeTemplate(type, allOffers);
  const destinationsList = destinations.map((item) => `<option value="${item.name}"></option>`).join('');
  const getRollupBtn = () => isEditMode ? '<button class="event__rollup-btn" type="button"></button>' : '';
  const getOffersSection = (template) => pointOffers.length ?
    ` <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          <div class="event__available-offers">
          ${template}
          </div>
    </section>` : '';
  const getResetBtn = () => {
    if (isEditMode) {
      if (isDeleting) {
        return 'Deleting...';
      }
      return 'Delete';
    }
    return 'Cancel';
  };

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${typesList}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            ${getDestinationInput(pointDestination, id)}
            <datalist id="destination-list-${id}">
              ${destinationsList}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time"
              value='${dayjs(dateFrom).format('DD/MM/YY HH:mm')}'>
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time"
              value='${dayjs(dateTo).format('DD/MM/YY HH:mm')}'>
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value=${basePrice}>
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
          <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>${getResetBtn()}</button>
          ${getRollupBtn()}
        </header>
        <section class="event__details">
          ${getOffersSection(offersTemplate)}
          ${getPointDescription(pointDestination)}
        </section>
      </form>
    </li>`
  );
}
export default class EditPointView extends AbstractStatefulView {

  #point = null;
  #allOffers = null;
  #destinations = null;
  #handleFormSubmit = null;
  #handleEditClick = null;
  #handleDeleteClick = null;
  #datepickerFrom = null;
  #datepickerTo = null;
  #isEditMode = null;


  constructor({ point, allOffers, destinations, onFormSubmit, onEditClick, onDeleteClick, isEditMode = true}) {
    super();
    this.#point = point;
    this.#allOffers = allOffers;
    this.#destinations = destinations;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleEditClick = onEditClick;
    this.#handleDeleteClick = onDeleteClick;
    this.#isEditMode = isEditMode;
    this._setState(EditPointView.parsePointToState(point));
    this.#setInnerHandlers();

  }

  get template() {
    return createEditPointTemplate(this._state, this.#allOffers, this.#destinations, this.#isEditMode);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditPointView.parseStateToPoint(this._state));
  };

  #editBtnHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };

  #pointTypeChangeHandler = (evt) => {
    evt.preventDefault();


    this.updateElement({
      type: evt.target.value,
      offers: []
    });

  };


  #destinationChangeHandler = (evt) => {
    evt.preventDefault();

    const selectedDestination = this.#destinations.find((destination) => evt.target.value === destination.name);

    if (selectedDestination) {
      this.updateElement({
        destination: selectedDestination.id
      });
      return;
    }
    evt.target.value = '';
  };

  #offerChangeHandler = (evt) => {
    evt.preventDefault();

    const selectedOffers = this._state.offers;
    const currentOfferId = +evt.target.value;
    const currentOfferIndex = selectedOffers.indexOf(currentOfferId);

    if (currentOfferIndex === -1) {
      selectedOffers.push(currentOfferId);
      return;
    }
    selectedOffers.splice(currentOfferIndex, 1);
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();

    if(isPositiveInteger(evt.target.value)) {
      this.updateElement({
        basePrice: evt.target.value
      });
      return;
    }
    this.updateElement({
      basePrice: 0
    });
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.event__rollup-btn')?.addEventListener('click', this.#editBtnHandler);
    this.element.querySelector('.event--edit').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#pointTypeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__available-offers')?.addEventListener('change', this.#offerChangeHandler);
    this.element.querySelector('.event__input--price')?.addEventListener('change', this.#priceChangeHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
    this.#setDateFromPicker();
    this.#setDateToPicker();
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
  };

  reset = (point) => {
    this.updateElement(EditPointView.parsePointToState(point));
  };

  #dateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate
    });
  };

  #setDateFromPicker = () => {
    this.#datepickerFrom = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateFrom,
        onChange: this.#dateFromChangeHandler,
        'time_24hr': true
      }
    );
  };

  #setDateToPicker = () => {
    this.#datepickerTo = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        minDate: this._state.dateFrom,
        defaultDate: this._state.dateTo,
        onChange: this.#dateToChangeHandler,
        'time_24hr': true
      }
    );
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(EditPointView.parseStateToPoint(this._state));
  };

  static parsePointToState = (point) => ({ ...point,
    isDisabled: false,
    isSaving: false,
    isDeleting: false,
  });

  static parseStateToPoint = (state) =>{
    const point = { ...state };
    delete point.isDisabled;
    delete point.isDeleting;
    delete point.isSaving;

    return point;
  };

}

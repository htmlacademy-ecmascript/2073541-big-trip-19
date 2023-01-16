import dayjs from 'dayjs';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { capitalizeFirstLetter } from '../utils/utils.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';


function createEditPointTemplate (point, allOffers, destinations ) {
  const { type, dateFrom, dateTo, basePrice, destination, offers} = point;

  const pointDestination = destinations.find((item) => destination.includes(item.id));
  const { pictures } = pointDestination;

  const pointOfferByType = allOffers.find((offer) => offer.type === type);

  const pointOffers = pointOfferByType.offers;


  const offersTemplate = pointOffers.map((offer) =>
    `<div class="event__available-offers">
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden"
          id="event-offer-${offer.id}" type="checkbox"
          name=${offer.title} ${offers.includes(offer.id) ? 'checked' : ''} value="${offer.id}">
        <label class="event__offer-label" for="event-offer-${offer.id}">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
   </div>`).join('');

  const typesList = allOffers.map((offer) =>
    `<div class="event__type-item">
      <input id="event-type-${offer.type}-${offer.id}"
        class="event__type-input  visually-hidden" type="radio"
        name="event-type" value="${offer.type}" ${type === offer.type ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--${offer.type}"
        for="event-type-${offer.type}-${offer.id}">${capitalizeFirstLetter(offer.type)}</label>
    </div>
   `).join('');


  const destinationsList = destinations.map((item) => `<option value="${item.name}"></option>`).join('');

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
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination"
              value=${pointDestination.name} list="destination-list-1">
            <datalist id="destination-list-1">
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

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
            ${pointOffers.length ?
      `<h3 class="event__section-title  event__section-title--offers">Offers</h3>
            ${offersTemplate}</section>`
      : ''}
          <section class="event__section  event__section--destination">
          ${pointDestination.description ?
      `<h3 class="event__section-title  event__section-title--destination">Destination</h3>
           <p class="event__destination-description">${pointDestination.description}</p>
           <div class="event__photos-container">
            <div class="event__photos-tape">
              ${pictures.map(({ src, description }) => `<img class="event__photo" src="${src}.jpg" alt="${description}">`).join('')}
            </div>
          </div>
         </section>`
      : ''}


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
  #datepickerFrom = null;
  #datepickerTo = null;


  constructor({ point, allOffers, destinations, onFormSubmit, onEditClick}) {
    super();
    this.#point = point;
    this.#allOffers = allOffers;
    this.#destinations = destinations;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleEditClick = onEditClick;
    this._setState(EditPointView.parsePointToState(point));
    this.#setInnerHandlers();

  }

  get template() {
    return createEditPointTemplate(this._state, this.#allOffers, this.#destinations);
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

    if (!evt.target.value) {
      this.updateElement({
        destination: ''
      });
      return;
    }

    const selectedDestination = this.#destinations
      .find((destination) => evt.target.value === destination.name);

    this.updateElement({
      destination: [selectedDestination.id]
    });
  };

  #offerChangeHandler = (evt) => {
    evt.preventDefault();

    const currentOfferId = +evt.target.value;
    const currentOfferIndex = this._state.offers.indexOf(currentOfferId);

    if (currentOfferIndex === -1) {
      this._setState(this._state.offers.push(currentOfferId));

      return;
    }

    this._setState(this._state.offers.splice(currentOfferIndex, 1));

  };

  #setInnerHandlers = () => {
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editBtnHandler);
    this.element.querySelector('.event--edit').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#pointTypeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__available-offers')?.addEventListener('change', this.#offerChangeHandler);
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
        minDate: this._state.dateTo,
        defaultDate: this._state.dateFrom,
        onChange: this.#dateFromChangeHandler,
        time24hr: true
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
        time24hr: true
      }
    );
  };

  static parsePointToState = (point) => ({ ...point });

  static parseStateToPoint = (state) => ({ ...state });

}

import {createElement} from '../render.js';
import dayjs from 'dayjs';


function createEditPointTemplate (point, allOffers, destinations ) {
  const { type, dateFrom, dateTo, basePrice, destination, offers} = point;

  const pointDestination = destinations.find((item) => destination.includes(item.id));
  const pointOfferByType = allOffers.find((offer) => offer.type === type);

  const pointOffers = pointOfferByType.offers;


  const offersTemplate = pointOffers.map((offer) =>
    `<div class="event__available-offers">
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox"
          name=${offer.title} ${offers.includes(offer.id) ? 'checked' : ''}>
        <label class="event__offer-label" for="event-offer-luggage-1">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
   </div>`).join('');

  const typesList = allOffers.map((offer) =>
    `<div class="event__type-item">
     <input id="event-type-${offer.type}-${offer.id}" class="event__type-input  visually-hidden" type="radio"
      name="event-type" value="${offer.type}">
     <label class="event__type-label  event__type-label--${offer.type}" for="event-type-${offer.type}-${offer.id}">${offer.type}</label>
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
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            ${offersTemplate}
          </section>

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${pointDestination.description}</p>
          </section>
        </section>
      </form>
    </li>`
  );
}
export default class EditPointView {
  #element = null;
  #point = null;
  #allOffers = null;
  #destinations = null;

  constructor({ point, allOffers, destinations }) {
    this.#point = point;
    this.#allOffers = allOffers;
    this.#destinations = destinations;
  }

  get template() {
    return createEditPointTemplate(this.#point, this.#allOffers, this.#destinations);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}

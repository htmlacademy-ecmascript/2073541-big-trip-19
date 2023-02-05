
import AbstractView from '../framework/view/abstract-view.js';
import dayjs from 'dayjs';
const MAX_VISIBLE_CITIES = 3;

function createTripInfoTemplate(route, dates, cost) {
  return (
    `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${route}</h1>

      <p class="trip-info__dates">${dates}</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
    </p>
    </section>`
  );
}

export default class TripInfoView extends AbstractView {
  #points = null;
  #offers = null;
  #destinations = null;

  constructor(points, offers, destinations) {
    super();

    this.#points = points;
    this.#offers = offers;
    this.#destinations = destinations;
  }

  get template() {
    const tripRoute = this.getRoute(this.#points, this.#destinations);
    const tripDates = this.getDates(this.#points);
    const tripTotalCost = this.getCost(this.#points,this.#offers);
    return createTripInfoTemplate(tripRoute, tripDates, tripTotalCost);
  }

  getRoute = (points, destinations) => {
    const cities = points.map((point) => {
      const city = destinations.find((item) => point.destination === item.id);

      return city.name;
    });

    if (!cities.length) {
      return '';
    }

    if (cities.length > MAX_VISIBLE_CITIES) {
      return `${cities[0]} &mdash; ... &mdash; ${cities.at(-1)}`;
    }

    return cities.slice(0, MAX_VISIBLE_CITIES).join(' &mdash; ');
  };

  getDates = (points) => {
    if (!points.length) {
      return '';
    }
    const firstPointDate = dayjs(points[0].dateFrom);
    const lastPointDate = dayjs(points.at(-1).dateTo);
    let startDate = firstPointDate.format('D MMM');
    let endDate = lastPointDate.format('D MMM');

    if(lastPointDate.isSame(firstPointDate, 'month')) {
      startDate = firstPointDate.format('MMM D');
      endDate = lastPointDate.format('DD');
    }

    return [startDate, endDate].join('  &mdash; ');
  };

  getCost = (points, offers) => {
    let totalCost = 0;

    if (!points.length) {
      return totalCost;
    }

    points.forEach((point) => {
      totalCost += point.basePrice;

      const pointOffers = offers.find((offer) => offer.type === point.type);

      if (!pointOffers) {
        return;
      }

      const selectedOffers = pointOffers.offers.filter((offer) => point.offers.includes(offer.id));
      selectedOffers.forEach((offer) => {
        totalCost += offer.price;
      });
    });

    return totalCost;
  };
}

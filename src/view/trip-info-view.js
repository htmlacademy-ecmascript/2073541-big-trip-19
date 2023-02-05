
import AbstractView from '../framework/view/abstract-view.js';
import dayjs from 'dayjs';

function createTripInfoTemplate(points, offers, destinations) {

  const generateRoute = () => {
    const cities = points.map((point) => {
      const city = destinations.find((item) => point.destination === item.id);
      return city.name;
    });

    if (cities.length === 0) {
      return '';
    }
    if (cities.length === 1) {
      return cities[0];
    }
    if (cities.length === 2) {
      return `${cities[0]} &mdash; ${cities[1]}`;
    }
    if (cities.length === 3) {
      return `${cities[0]} &mdash; ${cities[1]} &mdash; ${cities[2]}`;
    }
    return `${cities[0]} &mdash; ... &mdash; ${cities[cities.length - 1]}`;
  };


  const generateDates = () => {
    if (!points.length) {
      return '';
    }
    const firstPointDate = dayjs(points[0].dateFrom);
    const lastPointDate = dayjs(points[points.length - 1].dateTo);
    let startDate = firstPointDate.format('D MMM');
    let endDate = lastPointDate.format('D MMM');
    if(lastPointDate.isSame(firstPointDate, 'month')) {
      startDate = firstPointDate.format('MMM D');
      endDate = lastPointDate.format('DD');
    }

    return [startDate, endDate].join('  &mdash; ');
  };

  const generateCost = () => {
    let totalCost = 0;
    let offersCost = 0;
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
        offersCost += offer.price;
      });
    });

    return totalCost + offersCost;
  };


  return (
    `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${generateRoute()}</h1>

      <p class="trip-info__dates">${generateDates()}</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${generateCost()}</span>
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
    return createTripInfoTemplate(this.#points,this.#offers, this.#destinations);
  }


}

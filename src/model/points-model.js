import { points, destinations, offersByType } from '../mock/point.js';

export default class PointsModel {
  points = points;
  destinations = destinations;
  offersByType = offersByType;

  getPoints() {
    return this.points;
  }

  getDestinations() {
    return this.destinations;
  }

  getOffersByType() {
    return this.offersByType;

  }

}

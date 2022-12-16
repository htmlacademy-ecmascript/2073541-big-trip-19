import { points, destinations, offersByType } from '../mock/point.js';

export default class PointsModel {
  #points = points;
  #destinations = destinations;
  #offersByType = offersByType;

  get points() {
    return this.#points;
  }

  get destinations() {
    return this.#destinations;
  }

  get offersByType() {
    return this.#offersByType;

  }

}

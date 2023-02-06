import dayjs from 'dayjs';

const EMPTY_LIST_MESSAGES = {
  Everything: 'Click New Event to create your first point',
  Past: 'There are no past events now',
  Present: 'There are no present events now',
  Future: 'There are no future events now'
};

const DEFAULT_POINT = {
  basePrice: '',
  dateFrom: dayjs().toISOString(),
  dateTo: dayjs().toISOString(),
  destination: '',
  isFavorite: false,
  offers: [],
  type: 'flight'
};

const MAX_VISIBLE_CITIES = 3;

const FilterType = {
  EVERYTHING: 'Everything',
  FUTURE: 'Future',
  PRESENT: 'Present',
  PAST: 'Past',
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
  INIT_ERROR: 'INIT_ERROR',
};

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};


export { EMPTY_LIST_MESSAGES, FilterType, SortType, UserAction, UpdateType, TimeLimit, MAX_VISIBLE_CITIES, DEFAULT_POINT };

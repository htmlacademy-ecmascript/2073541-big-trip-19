const EMPTY_LIST_MESSAGES = {
  newEvent: 'Click New Event to create your first point',
  noPastEvents: 'There are no past events now',
  noPresentEvents: 'There are no present events now',
  noFutureEvents: 'There are no future events now'
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
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
};


export { EMPTY_LIST_MESSAGES, FilterType, SortType, UserAction, UpdateType };

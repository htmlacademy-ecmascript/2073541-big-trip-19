const EMPTY_LIST_MESSAGES = {
  Everything: 'Click New Event to create your first point',
  Past: 'There are no past events now',
  Present: 'There are no present events now',
  Future: 'There are no future events now'
};

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
};


export { EMPTY_LIST_MESSAGES, FilterType, SortType, UserAction, UpdateType };

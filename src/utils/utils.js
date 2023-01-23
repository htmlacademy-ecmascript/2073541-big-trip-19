import dayjs from 'dayjs';
import { require } from 'dayjs';
const duration = require('dayjs/plugin/duration');
dayjs.extend(duration);

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

const getRandomInt = (min = 0, max = 1) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getEventDuration = (start, finish) => {

  const differenceInMs = dayjs(finish).diff(dayjs(start));
  const differenceInHours = dayjs(finish).diff(dayjs(start), 'hour');
  let durationFormat = 'DD[D] HH[H] mm[M]';

  if(differenceInHours < 1) {
    durationFormat = 'mm[M]';
  }
  if (differenceInHours >= 1 && differenceInHours < 24) {
    durationFormat = 'HH[H] mm[M]';
  }
  const eventDuration = dayjs.duration(differenceInMs).format(durationFormat);

  return eventDuration;
};

const isEscKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

//const updateItem = (items, update) => items.map((item) => item.id === update.id ? update : item);

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const isPositiveInteger = (str) => typeof str === 'string' && Number.isInteger(Number(str)) && Number(str) > 0;

export { getRandomArrayElement, getRandomInt, getEventDuration, isEscKey, capitalizeFirstLetter, isPositiveInteger };


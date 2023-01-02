import dayjs from 'dayjs';
import { FilterType } from '../const.js';


const isStartDateExpired = (dateFrom) => dayjs(dateFrom).isAfter(dayjs());

const isEndDateExpired = (dateTo) => dayjs(dateTo).isAfter(dayjs());

const isFutureEvent = (dateFrom, dateTo) => isStartDateExpired(dateFrom) && isEndDateExpired(dateTo);

const isPresentEvent = (dateFrom, dateTo) => !isStartDateExpired(dateFrom) && isEndDateExpired(dateTo);

const isPastEvent = (dateFrom, dateTo) => !isStartDateExpired(dateFrom) && !isEndDateExpired(dateTo);


const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isFutureEvent(point.dateFrom, point.dateTo)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isPresentEvent(point.dateFrom, point.dateTo)),
  [FilterType.PAST]: (points) => points.filter((point) => isPastEvent(point.dateFrom, point.dateTo)),
};

function getFilteredEvents(points) {
  const pointsByFilter = {
    [FilterType.EVERYTHING]: points,
    [FilterType.FUTURE]: [],
    [FilterType.PRESENT]: [],
    [FilterType.PAST]: [],
  };
  for (const point of points) {
    if(isFutureEvent(point.dateFrom, point.dateTo)) {
      pointsByFilter[FilterType.FUTURE].push(point);
    }
    if(isPresentEvent(point.dateFrom, point.dateTo)) {
      pointsByFilter[FilterType.PRESENT].push(point);
    }
    if(isPastEvent(point.dateFrom, point.dateTo)) {
      pointsByFilter[FilterType.PAST].push(point);
    }
  }
  return pointsByFilter;
}

export { getFilteredEvents, filter };

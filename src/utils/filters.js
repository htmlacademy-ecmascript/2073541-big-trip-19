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

const sortPointDate = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
const sortPointTime = (pointA, pointB) => dayjs(pointA.dateTo).diff(pointA.dateFrom) - dayjs(pointB.dateTo).diff(pointB.dateFrom);
const sortPointPrice = (pointA, pointB) => pointA.basePrice - pointB.basePrice;


export { filter, sortPointDate, sortPointTime, sortPointPrice };

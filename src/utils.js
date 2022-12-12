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


/* Format
Get the formatted date according to the string of tokens passed in.

To escape characters, wrap them in square brackets (e.g. [MM]).

dayjs().format()
// current date in ISO8601, without fraction seconds e.g. '2020-04-02T08:02:17-05:00'

dayjs('2019-01-25').format('[YYYYescape] YYYY-MM-DDTHH:mm:ssZ[Z]')
// 'YYYYescape 2019-01-25T00:00:00-02:00Z'

dayjs('2019-01-25').format('DD/MM/YYYY') // '25/01/2019' */


const getEventDuration = (start, finish) => {

  const differenceInMs = dayjs(finish).diff(dayjs(start));
  const differenceInHours = dayjs(finish).diff(dayjs(start), 'hour');

  let durationFormat = 'DD[D] HH[H] mm[M]';

  if(differenceInHours < 1) {
    durationFormat = 'mm[M]';
  } else if (differenceInHours < 24 ) {
    durationFormat = 'HH[H] mm[M]';
  }
  const eventDuration = dayjs.duration(differenceInMs).format(durationFormat);

  //console.log(eventDuration);
  return eventDuration;
};

export {getRandomArrayElement, getRandomInt, getEventDuration};


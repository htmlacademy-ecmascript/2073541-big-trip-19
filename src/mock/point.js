
import { getRandomArrayElement, getRandomInt } from '../utils.js';
import dayjs from 'dayjs';


const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget',
  'Fusce tristique felis at fermentum pharetra',
  'Aliquam id orci ut lectus varius viverra',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui',
  'Sed sed nisi sed augue convallis suscipit in sed felis'
];


const getPictures = () => {
  const getPhotoLink = () => `https://loremflickr.com/248/152?random=${getRandomInt(0,100)}`;
  const picturesCount = getRandomInt(1, 5);
  return Array.from({length:picturesCount}).map(getPhotoLink);
};
const getRandomStartDate = () => dayjs()
  .subtract(getRandomInt(1, 24), 'h')
  .add(getRandomInt(1, 60), 'm');

const getRandomEndDate = () => dayjs()
  .add(getRandomInt(1, 24), 'h')
  .add(getRandomInt(1, 60), 'm');

const destinations = [
  {
    id: 1,
    description: getRandomArrayElement(DESCRIPTIONS),
    name: 'Geneva',
    pictures: [{
      src: getPictures(),
      description: getRandomArrayElement(DESCRIPTIONS)
    }]
  },
  {
    id: 2,
    description: getRandomArrayElement(DESCRIPTIONS),
    name: 'Amsterdam',
    pictures: [{
      src: getPictures(),
      description: getRandomArrayElement(DESCRIPTIONS)
    }]
  },
  {
    id:3,
    description: getRandomArrayElement(DESCRIPTIONS),
    name: 'Berlin',
    pictures: [{
      src: getPictures(),
      description: getRandomArrayElement(DESCRIPTIONS)
    }]
  },
  {
    id: 4,
    description: getRandomArrayElement(DESCRIPTIONS),
    name: 'Rome',
    pictures: [{
      src: getPictures(),
      description: getRandomArrayElement(DESCRIPTIONS)
    }]
  },
  {
    id: 5,
    description: getRandomArrayElement(DESCRIPTIONS),
    name: 'Milan',
    pictures: [{
      src: getPictures(),
      description: getRandomArrayElement(DESCRIPTIONS)
    }]
  }
];

const offersByType = [
  {
    type:'taxi',
    offers:[{
      id: 1,
      title: 'Upgrade to a business class',
      price: getRandomInt(10, 30)
    },
    {
      id: 2,
      title: 'Add luggage',
      price: getRandomInt(10, 30)
    }
    ]
  },
  {
    type:'drive',
    offers:[{
      id: 3,
      title: 'Rent a car',
      price: getRandomInt(10, 30)
    }
    ]
  },
  {
    type:'flight',
    offers:[{
      id: 5,
      title: 'Switch to comfort',
      price: getRandomInt(10, 30)
    },
    {
      id: 4,
      title: 'Book tickets',
      price: getRandomInt(10, 30)}]
  },
  {
    type: 'check-in',
    offers: [
      {
        'id': 1,
        'title': 'Add meal',
        'price': getRandomInt(10, 30)
      }
    ]
  }
];


const points = [
  {
    basePrice: getRandomInt(100, 1000),
    dateFrom: getRandomStartDate(),
    dateTo: getRandomEndDate(),
    destination: [1],
    id: '1',
    isFavorite: false,
    offers: [1],
    type: 'taxi'
  },
  {
    basePrice: getRandomInt(100, 1000),
    dateFrom: getRandomStartDate(),
    dateTo: getRandomEndDate(),
    destination: [2],
    id: '2',
    isFavorite: false,
    offers: [3],
    type: 'drive'
  },
  {
    basePrice: getRandomInt(100, 1000),
    dateFrom: getRandomStartDate(),
    dateTo: getRandomEndDate(),
    destination: [3],
    id: '3',
    isFavorite: true,
    offers: [],
    type: 'drive'
  },
  {
    basePrice: getRandomInt(100, 1000),
    dateFrom: getRandomStartDate(),
    dateTo: getRandomEndDate(),
    destination: [4],
    id: '4',
    isFavorite: false,
    offers: [4, 5],
    type: 'flight'
  },
  {
    basePrice: getRandomInt(100, 1000),
    dateFrom: getRandomStartDate(),
    dateTo: getRandomEndDate(),
    destination: [5],
    id: '5',
    isFavorite: false,
    offers: [],
    type: 'check-in'
  }
];

export{ points, destinations, offersByType };


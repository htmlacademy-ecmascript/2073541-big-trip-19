
import { getRandomArrayElement, getRandomInt } from '../utils.js';


const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget',
  'Fusce tristique felis at fermentum pharetra',
  'Aliquam id orci ut lectus varius viverra',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui',
  'Sed sed nisi sed augue convallis suscipit in sed felis'
];


const getDescription = () => getRandomArrayElement(DESCRIPTIONS);
const getPictures = () => {
  const getPhotoLink = () => `https://loremflickr.com/248/152?random=${getRandomInt(0,100)}`;
  const picturesCount = getRandomInt(1, 5);
  return Array.from({length:picturesCount}).map(getPhotoLink);
};


const destinations = [
  { id: 1,
    description: getDescription(),
    name: 'Geneva',
    pictures: [{
      src: getPictures(),
      description: getDescription()
    }]
  },
  { id: 2,
    description: getDescription(),
    name: 'Amsterdam',
    pictures: [{
      src: getPictures(),
      description: getDescription()
    }]
  },
  { id:3,
    description: getDescription(),
    name: 'Berlin',
    pictures: [{
      src: getPictures(),
      description: getDescription()
    }]
  },
  { id: 4,
    description: getDescription(),
    name: 'Rome',
    pictures: [{
      src: getPictures(),
      description: getDescription()
    }]
  },
  { id: 5,
    description: getDescription(),
    name: 'Milan',
    pictures: [{
      src: getPictures(),
      description: getDescription()
    }]
  }
];

const offersByType = [
  {type:'taxi',
    offers:[{
      id: 1,
      title: 'Upgrade to a business class',
      price: getRandomInt(10,30)
    },
    {
      id: 2,
      title: 'Add luggage',
      price: getRandomInt(10,30)
    }]
  },
  {type:'drive',
    offers:[{
      id: 3,
      title: 'Rent a car',
      price: getRandomInt(10,30)
    }]
  },
  {type:'flight',
    offers:[{
      id: 5,
      title: 'Switch to comfort',
      price: getRandomInt(10,30)
    },
    { id: 4,
      title: 'Book tickets',
      price: getRandomInt(10,30)}]
  },
  {
    type: 'check-in',
    offers: [
      {
        'id': 1,
        'title': 'Add meal',
        'price': getRandomInt(10,30)
      }
    ]
  }
];


const points = [
  {
    basePrice: getRandomInt(100, 1000),
    dateFrom: '2022-07-10T22:55:56.845Z',
    dateTo: '2022-07-10T23:51:56.845Z',
    destination: [1],
    id: '1',
    isFavorite: false,
    offers: [1],
    type: 'taxi'
  },
  {
    basePrice: getRandomInt(100, 1000),
    dateFrom: '2022-07-08T12:55:56.845Z',
    dateTo: '2022-07-10T22:55:56.845Z',
    destination: [2],
    id: '2',
    isFavorite: false,
    offers: [3],
    type: 'drive'
  },
  {
    basePrice: getRandomInt(100, 1000),
    dateFrom: '2022-08-06T03:55:56.845Z',
    dateTo: '2022-08-10T04:55:56.845Z',
    destination: [3],
    id: '3',
    isFavorite: true,
    offers: [0],
    type: 'drive'
  },
  {
    basePrice: getRandomInt(100, 1000),
    dateFrom: '2022-08-15T00:00:00.845Z',
    dateTo: '2022-08-16T20:55:56.845Z',
    destination: [4],
    id: '4',
    isFavorite: false,
    offers: [4, 5],
    type: 'flight'
  },
  {
    basePrice: getRandomInt(100, 1000),
    dateFrom: '2022-08-10T16:00:00.845Z',
    dateTo: '2022-08-11T20:30:56.845Z',
    destination: [5],
    id: '5',
    isFavorite: false,
    offers: [0],
    type: 'check-in'
  }
];

export{ points, destinations, offersByType };



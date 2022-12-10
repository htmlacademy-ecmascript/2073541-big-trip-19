
import { getRandomArrayElement, getRandomInt } from '../utils.js';

const CITIES = ['Chamonix', 'Geneva', 'Amsterdam', 'Berlin', 'Paris', 'Milan', 'Rome'];
const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget',
  'Fusce tristique felis at fermentum pharetra',
  'Aliquam id orci ut lectus varius viverra',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui',
  'Sed sed nisi sed augue convallis suscipit in sed felis'
];

const getCity = () => getRandomArrayElement(CITIES);
const getDescription = () => getRandomArrayElement(DESCRIPTIONS);
const getPictures = () => {
  const getPhotoLink = () => `https://loremflickr.com/248/152?random=${getRandomInt(0,100)}`;
  const picturesCount = getRandomInt(1, 5);
  return Array.from({length:picturesCount}).map(getPhotoLink);
};


const destinations = [
  { id: 1,
    description: getDescription(),
    name: getCity(),
    pictures: [{
      src: getPictures(),
      description: getDescription()
    }]
  },
  { id: 2,
    description: getDescription(),
    name: getCity(),
    pictures: [{
      src: getPictures(),
      description: getDescription()
    }]
  },
  { id:3,
    description: getDescription(),
    name: getCity(),
    pictures: [{
      src: getPictures(),
      description: getDescription()
    }]
  },
  { id: 4,
    description: getDescription(),
    name: getCity(),
    pictures: [{
      src: getPictures(),
      description: getDescription()
    }]
  },
  { id: 5,
    description: getDescription(),
    name: getCity(),
    pictures: [{
      src: getPictures(),
      description: getDescription()
    }]
  }
];


const offers = [
  {
    id: '1',
    title: 'Upgrade to a business class',
    price: '120'
  },
  {
    id: '2',
    title: 'Add luggage',
    price: '120'
  },
  {
    id: '3',
    title: 'Rent a car',
    price: '120'
  },
  {
    id: '4',
    title: 'Book tickets',
    price: '120'
  },
  {
    id: '5',
    title: 'Switch to comfort',
    price: '120'
  }
];


const points = [
  {
    basePrice: getRandomInt(100, 1000),
    dateFrom: '',
    dateTo: '',
    destination: [1],
    id: '1',
    isFavorite: false,
    offers: [1],
    type: 'taxi'
  },
  {
    basePrice: getRandomInt(100, 1000),
    dateFrom: '',
    dateTo: '',
    destination: [2],
    id: '2',
    isFavorite: false,
    offers: [2],
    type: 'train'
  },
  {
    basePrice: getRandomInt(100, 1000),
    dateFrom: '',
    dateTo: '',
    destination: [3],
    id: '3',
    isFavorite: false,
    offers: [3],
    type: 'drive'
  },
  {
    basePrice: getRandomInt(100, 1000),
    dateFrom: '',
    dateTo: '',
    destination: [4],
    id: '4',
    isFavorite: false,
    offers: [4],
    type: 'flight'
  },
  {
    basePrice: getRandomInt(100, 1000),
    dateFrom: '',
    dateTo: '',
    destination: [5],
    id: '5',
    isFavorite: false,
    offers: [5],
    type: 'check-in'
  }
];



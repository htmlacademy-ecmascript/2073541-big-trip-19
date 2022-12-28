import { filter } from '../utils/filters.js';

function generateFilter(points) {
  return Object.entries(filter).map(
    ([filterName, filteredPoints]) => ({
      name: filterName,
      filteredPoints: filteredPoints(points)
    })
  );
}


export { generateFilter };

import { createStore } from 'redux';

import favLocationsReducer from './reducers/favLocations';

export default createStore(favLocationsReducer);
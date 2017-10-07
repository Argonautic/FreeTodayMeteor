import { combineReducers } from 'redux';
import MapReducer from './reducer_map';
import CoordinatesReducer from './reducer_coordinates';

const rootReducer = combineReducers({
    map: MapReducer,
    coordinates: CoordinatesReducer
});

export default rootReducer;

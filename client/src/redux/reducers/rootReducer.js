import { combineReducers } from 'redux';
import mapReducers from './mapReducers';
import commentReducers from './commentReducers';

export default combineReducers({
 mapReducers,
 commentReducers
});
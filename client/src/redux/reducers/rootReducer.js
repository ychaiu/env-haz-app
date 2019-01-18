import { combineReducers } from 'redux';
import mapReducers from './mapReducers';
import commentReducer from './commentReducer';

export default combineReducers({
 mapReducers,
 commentReducer
});
import { combineReducers } from 'redux';
import mapReducers from './mapReducers';
import commentReducers from './commentReducers';
import userReducers from './userReducers';

export default combineReducers({
 mapReducers,
 commentReducers,
 userReducers,
});
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import articleReducer from './articleReducer';
import tagReducer from './tagReducer';
import profileReducer from './profileReducer';

export default combineReducers({
    auth: authReducer,
    article:articleReducer,
    tag:tagReducer,
    profile:profileReducer

});

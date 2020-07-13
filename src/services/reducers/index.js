import { combineReducers } from 'redux';
import authReducer from './authReducer';
import articleReducer from './articleReducer';
import tagReducer from './tagReducer';
import profileReducer from './profileReducer';
import commentReducer from './commentReducer';

export default combineReducers({
    auth: authReducer,
    article:articleReducer,
    tag:tagReducer,
    profile:profileReducer,
    comment: commentReducer

});

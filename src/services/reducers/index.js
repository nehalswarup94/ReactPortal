import { combineReducers } from 'redux';
import authReducer from './authReducer';
import articleReducer from './articleReducer';
import tagReducer from './tagReducer';

export default combineReducers({
    auth: authReducer,
    article:articleReducer,
    tag:tagReducer

});

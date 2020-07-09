import {GET_PROFILE, FOLLOW_AUTHOR, UNFOLLOW_AUTHOR} from '../actionTypes';
import axios from 'axios';
import setAuthToken from '../../../utils/setAuthToken';

export const getProfile = (username) => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    
    try {
        const res = await axios.get(`https://conduit.productionready.io/api/profiles/${username}`);
        dispatch({
            type: GET_PROFILE,
            payload: res.data.profile
        });
    }
    catch (err) {
        console.log(err);
    }
}

export const followAuthor = (username) => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    

    try {
        const res = await axios.post(`https://conduit.productionready.io/api/profiles/${username}/follow`);
        console.log('res.data')
        dispatch({
            type: FOLLOW_AUTHOR,
            payload: res.data.profile
        });
    }
    catch (err) {
        console.log(err);
    }
}

export const unFollowAuthor = (username) => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.delete(`https://conduit.productionready.io/api/profiles/${username}/follow`);
        dispatch({
            type: UNFOLLOW_AUTHOR,
            payload: res.data.profile
        });
    }
    catch (err) {
        console.log(err);
    }
}
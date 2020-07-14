import axios from 'axios';
import { GET_TAGS, SET_TAG, UNSET_TAG } from '../actionTypes';

export const getTags = () => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.get('https://conduit.productionready.io/api/tags',config);
        dispatch({
            type: GET_TAGS,
            payload: res.data
        });
    }
    catch (err) {
        console.log(err);
    }
}

export const setTag = (tag) => async dispatch => {
    dispatch({
        type:SET_TAG,
        payload: tag
    })
}

export const unSetTag = () => async dispatch => {
    dispatch({
        type:UNSET_TAG
    })
}
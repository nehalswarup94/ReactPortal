import axios from 'axios';
import { GET_TAGS } from '../actionTypes';
import setAuthToken from '../../../utils/setAuthToken';

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
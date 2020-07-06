import {CREATE_ARTICLE} from '../actionTypes';
import axios from 'axios';

export const createArticle = (newArticle) => async dispatch => {
    const token = localStorage.token;
    const config = {
        headers: {
            'Content-Type': 'application/json',
             'authorization' : `Token ${token}`
        }
    }

    const body = JSON.stringify(newArticle);
    try {
        const res = await axios.post('https://conduit.productionready.io/api/articles', body, config);
        dispatch({
            type: CREATE_ARTICLE,
            payload: res.data
        });
    }
    catch (err) {
        // dispatch({
        //     type: ARTICLE
        // })
    }
}
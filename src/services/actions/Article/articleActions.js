import {CREATE_ARTICLE, LIST_ARTICLES} from '../actionTypes';
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

export const listArticles = () => async dispatch => {
    const token = localStorage.token;
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    //const body = JSON.stringify(newArticle);
    try {
        const res = await axios.get('https://conduit.productionready.io/api/articles', config);
        dispatch({
            type: LIST_ARTICLES,
            payload: res.data
        });
    }
    catch (err) {
        // dispatch({
        //     type: ARTICLE
        // })
    }
}
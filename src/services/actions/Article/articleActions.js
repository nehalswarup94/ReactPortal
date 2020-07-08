import {CREATE_ARTICLE, LIST_ARTICLES, GET_ARTICLE, MARK_FAV, MARK_UNFAV, FOLLOW_AUTHOR, UNFOLLOW_AUTHOR} from '../actionTypes';
import axios from 'axios';
import setAuthToken from '../../../utils/setAuthToken';


//create a new article
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

//Get a single article
export const getArticle = (slug) => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get(`https://conduit.productionready.io/api/articles/${slug}`);
        dispatch({
            type: GET_ARTICLE,
            payload: res.data
        });
    }
    catch (err) {
        // dispatch({
        //     type: ARTICLE
        // })
    }
}


//Get all articles array
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

//fav article
export const markFavourite = (slug) => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    const token = localStorage.token;
    const config = {
        headers: {
            'Content-Type': 'application/json',
             'authorization' : `Token ${token}`
        }
    }
    try {
        const res = await axios.post(`https://conduit.productionready.io/api/articles/${slug}/favorite`);
        dispatch({
            type: MARK_FAV,
            payload: res.data
        });
    }
    catch (err) {
        console.log(err);
    }
}

//unfav article
export const markUnFavourite = (slug) => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    const token = localStorage.token;
    const config = {
        headers: {
            'Content-Type': 'application/json',
             'authorization' : `Token ${token}`
        }
    }
    try {
        const res = await axios.delete(`https://conduit.productionready.io/api/articles/${slug}/favorite`);
        dispatch({
            type: MARK_UNFAV,
            payload: res.data
        });
    }
    catch (err) {
        console.log(err);
    }
}

//follow author
export const followAuthor = (username) => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    const token = localStorage.token;
    const config = {
        headers: {
            'Content-Type': 'application/json',
             'authorization' : `Token ${token}`
        }
    }
    try {
        const res = await axios.post(`https://conduit.productionready.io/api/profiles/${username}/follow`);
        dispatch({
            type: FOLLOW_AUTHOR,
            payload: res.data
        });
    }
    catch (err) {
        console.log(err);
    }
}

//unfollow author
export const unFollowAuthor= (username) => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    const token = localStorage.token;
    const config = {
        headers: {
            'Content-Type': 'application/json',
             'authorization' : `Token ${token}`
        }
    }
    try {
        const res = await axios.delete(`https://conduit.productionready.io/api/profiles/${username}/follow`);
        dispatch({
            type: FOLLOW_AUTHOR,
            payload: res.data
        });
    }
    catch (err) {
        console.log(err);
    }
}
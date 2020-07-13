import {CREATE_COMMENT, EDIT_COMMENT, DELETE_COMMENT, LIST_COMMENTS} from '../actionTypes';
import axios from 'axios';
import setAuthToken from '../../../utils/setAuthToken';

export const createComment = (slug,comment) => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    const body = JSON.stringify(comment);

    try {
        const res = await axios.post(`https://conduit.productionready.io/api/articles/${slug}/comments`,body);
        dispatch({
            type: CREATE_COMMENT,
            payload: res.data
        });
    }
    catch (err) {
        // dispatch({
        //     type: ARTICLE
        // })
    }
}

export const getComments = (slug) =>  async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.get(`https://conduit.productionready.io/api/articles/${slug}/comments`);
        dispatch({
            type: LIST_COMMENTS,
            payload: res.data
        });
    }
    catch (err) {
        // dispatch({
        //     type: ARTICLE
        // })
    }
}

export const deleteComment = (id,slug) => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.delete(`https://conduit.productionready.io/api/articles/${slug}/comments/${id}`);
        console.log('deleted',id)
        dispatch({
            type: DELETE_COMMENT,
            payload: id
        });
    }
    catch (err) {
        // dispatch({
        //     type: ARTICLE
        // })
    }
}
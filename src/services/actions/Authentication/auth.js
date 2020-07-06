import axios from 'axios';
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from '../actionTypes';
import setAuthToken from '../../../utils/setAuthToken';

//Load user

export const loadUser = () => async dispatch => {
    //check if token present, put it in global header
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    const token = localStorage.token;
    try {
        const res = await axios.get('https://conduit.productionready.io/api/user', {
            headers: {
                authorization: `Token ${token}`
            }
        });
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    }
    catch (err) {
        dispatch({
            type: AUTH_ERROR
        });
    }
}

//Register user
export const registerUser = user => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify(user);

    try {
        const res = await axios.post('https://conduit.productionready.io/api/users', body, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data['user'].token
        });
    }
    catch (err) {
        dispatch({
            type: REGISTER_FAIL
        });
    }
}

export const login = user => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify(user);
    try {
        const res = await axios.post('https://conduit.productionready.io/api/users/login', body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
    }
    catch (err) {
        dispatch({
            type: LOGIN_FAIL
        })
    }
}

//logout

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    });
}
import {REGISTER_USER, LOGIN} from '../actionTypes';
import axios from 'axios';

export const registerUser = user => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify(user);

    const res= await axios.post('https://conduit.productionready.io/api/users',body,config);
    localStorage.setItem('token',res.data['user'].token)
    console.log(res.data)
        dispatch({
        type: REGISTER_USER,
        payload: res.data['user'].token
      });
}

export const login = user => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify(user);

    const res= await axios.post('https://conduit.productionready.io/api/users/login',body,config);
    localStorage.setItem('token',res.data['user'].token)
        dispatch({
        type: LOGIN,
        payload: res.data['user']
      });
}
import { REGISTER_FAIL, REGISTER_SUCCESS, USER_LOADED, USER_UPDATED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from '../actions/actionTypes';

const initialState = {
    token: localStorage.getItem('token'),
    loading: true,
    isAuthenticated: null,
    user: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_LOADED:
        case USER_UPDATED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload
            }

        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload['user'].token);
            return {
                ...state,
                token: action.payload['user'].token,
                isAuthenticated: true,
                loading: false,
                user: action.payload
            }
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            }

        default:
            return state;
    }
}


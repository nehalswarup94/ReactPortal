import { REGISTER_FAIL, REGISTER_SUCCESS, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from '../actions/actionTypes';

const initialState = {
    token: localStorage.getItem('token'),
    loading: true,
    isAuthenticated: null,
    loggedInUser: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload
            }

        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload);
            return {
                ...state,
                token: action.payload,
                isAuthenticated: true,
                loading: false
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

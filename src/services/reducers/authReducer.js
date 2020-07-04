import {REGISTER_USER, LOGIN} from '../actions/actionTypes';

const initialState = {
    token:'',
    loginuser:{}
}

export default function(state = initialState, action) {
    switch (action.type) {
        case REGISTER_USER:
            return {
                ...state,
                token: action.payload
            }
            break;
        case LOGIN:
            return {
                ...state,
                loginuser: action.payload
            }
            break;

        default:
            return state;
    }
}


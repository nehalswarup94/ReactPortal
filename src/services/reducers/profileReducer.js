import {GET_PROFILE, FOLLOW_AUTHOR, UNFOLLOW_AUTHOR} from '../actions/actionTypes';

const initialState = {
    profile:{}
};

export default function(state=initialState,action){
    switch(action.type){
        case GET_PROFILE:
            return{
                ...state,
                profile:action.payload
            }
        case FOLLOW_AUTHOR:
            return{
                ...state,
                profile:action.payload
            }
        case UNFOLLOW_AUTHOR:
            return {
                ...state,
                profile:action.payload
            }
        default:
            return state
    }
}

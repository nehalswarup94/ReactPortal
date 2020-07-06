import {CREATE_ARTICLE} from '../actionTypes';

const initialState={
    article:{}
}

export default function(state=initialState,action){
    switch(action.type){
        case CREATE_ARTICLE:
            return {
                ...state,
                article:action.payload
            }
        default:
            return state
    }
}
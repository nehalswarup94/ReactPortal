import {GET_TAGS} from '../actions/actionTypes';

const initialState={
    tags:[]
}

export default function (state = initialState, action) {
    switch(action.type){
        case GET_TAGS:
            return{
                ...state,
                tags:action.payload
            }
        default:
            return state
    }
}
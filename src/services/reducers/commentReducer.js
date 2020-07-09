import {CREATE_COMMENT, EDIT_COMMENT, DELETE_COMMENT, LIST_COMMENTS} from '../actionTypes';

const initialState = {
    comments:[],
    comment:{}
}

export default function(state=initialState,action){
    switch(action.type){
        case CREATE_COMMENT:
            return {
                ...state,
                comment:action.payload
            }

        default:
            return state
    }
}
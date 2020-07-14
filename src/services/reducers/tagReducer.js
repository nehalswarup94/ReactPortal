import {GET_TAGS, SET_TAG, UNSET_TAG} from '../actions/actionTypes';

const initialState={
    tags:[],
    tag:''
}

export default function (state = initialState, action) {
    switch(action.type){
        case GET_TAGS:
            return{
                ...state,
                tags:action.payload
            }
        case SET_TAG:
            return{
                ...state,
                tag:action.payload
            }

        case UNSET_TAG:
            return{
                ...state,
                tag: ''
            }
        default:
            return state
    }
}
import {CREATE_ARTICLE, LIST_ARTICLES} from '../actions/actionTypes';

const initialState={
    article:{},
    articles:[]
}

export default function(state=initialState,action){
    switch(action.type){
        case CREATE_ARTICLE:
            return {
                ...state,
                article:action.payload
            }
        case LIST_ARTICLES:
            return {
                ...state,
                articles:action.payload
            }
        default:
            return state
    }
}
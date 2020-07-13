import {CREATE_COMMENT, EDIT_COMMENT, DELETE_COMMENT, LIST_COMMENTS} from '../actions/actionTypes';

const initialState = {
    comments:[],
    comment:{}
}

export default function(state=initialState,action){
    switch(action.type){
        case CREATE_COMMENT:
            return {
                ...state,
                comments:[...state.comments,action.payload.comment],
                comment:action.payload
            }
        
        case LIST_COMMENTS:
            return{
                ...state,
                comments:action.payload.comments
            }

        case DELETE_COMMENT:
            console.log(action.payload);
            return{
                ...state,
                comments: state.comments.filter(comment => comment.id!==action.payload)
            }

        default:
            return state;
    }
}
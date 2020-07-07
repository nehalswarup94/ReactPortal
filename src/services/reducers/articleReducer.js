import {CREATE_ARTICLE, LIST_ARTICLES, MARK_FAV} from '../actions/actionTypes';

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
        case MARK_FAV:
            return {
                ...state,
                articles: state.articles.filter((article)=> action.payload.payload.article.slug === article.slug ? article = action.payload : null)
            }
        default:
            return state
    }
}
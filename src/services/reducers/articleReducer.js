import {CREATE_ARTICLE, LIST_ARTICLES, GET_ARTICLE, MARK_FAV, MARK_UNFAV, DEL_ARTICLE, EDIT_ARTICLE,LIST_ARTICLES_BY_AUTHOR} from '../actions/actionTypes';

const initialState={
    article:{},
    articles:[]
}

export default function(state=initialState,action){
    switch(action.type){
        case CREATE_ARTICLE:
        case GET_ARTICLE:
            return {
                ...state,
                article:action.payload
            }
        case LIST_ARTICLES:
            return {
                ...state,
                articles:action.payload.articles
            }
        case MARK_FAV:
        case MARK_UNFAV:
            return {
                ...state,
                article:action.payload,
                articles: state.articles.map((article)=> article.slug === action.payload.article.slug ? article = action.payload.article : article)
            }
        case DEL_ARTICLE:
            return{
                ...state,
                articles: state.articles.filter((article)=> article.slug !== action.payload)
            }
        case EDIT_ARTICLE:
            return {
                ...state,
                articles: state.article.map((article)=> article.slug === action.payload.article.slug ? article = action.payload.article.article : article)
            }
        default:
            return state
    }
}
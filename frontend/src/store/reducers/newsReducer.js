import {
    FETCH_NEWS_FAILURE,
    FETCH_NEWS_REQUEST,
    FETCH_NEWS_SUCCESS,
    FETCH_SINGLE_POST_SUCCESS
} from "../actions/actionTypes";

const initialState = {
    news: [],
    post: null
};

const newsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_NEWS_SUCCESS:
            return {...state, news: action.news};
        case FETCH_SINGLE_POST_SUCCESS:
            return {...state, post: action.post};
        case FETCH_NEWS_FAILURE:
            return {...state, error: action.error};
        case FETCH_NEWS_REQUEST:
            return {...state, error: null};
        default:
            return state;
    }
};


export default newsReducer;
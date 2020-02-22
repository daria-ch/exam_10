import {FETCH_NEWS_SUCCESS, FETCH_SINGLE_POST_SUCCESS} from "../actions/actionTypes";

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
        default:
            return state;
    }
};


export default newsReducer;
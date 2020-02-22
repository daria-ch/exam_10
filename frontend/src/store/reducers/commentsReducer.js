import {FETCH_COMMENTS_FAILURE, FETCH_COMMENTS_SUCCESS} from "../actions/actionTypes";

const initialState = {
    comments: [],
    error: null
};

const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_COMMENTS_SUCCESS:
            return {...state, comments: action.comments};
        case FETCH_COMMENTS_FAILURE:
            return {...state, error: action.error};
        default:
            return state;
    }
};


export default commentsReducer;
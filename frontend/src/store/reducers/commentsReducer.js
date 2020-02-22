import {FETCH_COMMENTS_SUCCESS} from "../actions/actionTypes";

const initialState = {
    comments: []
};

const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_COMMENTS_SUCCESS:
            return {...state, comments: action.comments};
        default:
            return state;
    }
};


export default commentsReducer;
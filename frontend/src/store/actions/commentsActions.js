import {FETCH_COMMENTS_FAILURE, FETCH_COMMENTS_SUCCESS, POST_COMMENT_SUCCESS} from "./actionTypes";
import axiosApi from "../../axios-api";

export const fetchCommentsSuccess = comments => ({type: FETCH_COMMENTS_SUCCESS, comments});
export const postCommentSuccess = () => ({type: POST_COMMENT_SUCCESS});
export const fetchCommentsFailure = (error) => ({type: FETCH_COMMENTS_FAILURE, error});

export const fetchComments = id => {
    return async dispatch => {
        try {
            const response = await axiosApi.get('/comments?news_id=' + id);
            dispatch(fetchCommentsSuccess(response.data));
        } catch (error) {
            dispatch(fetchCommentsFailure(error))
        }
    }
};

export const postComment = comment => {
    return async dispatch => {
        await axiosApi.post('/comments', comment);
        dispatch(postCommentSuccess());
    }
};
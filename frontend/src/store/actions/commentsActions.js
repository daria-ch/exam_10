import {FETCH_COMMENTS_SUCCESS} from "./actionTypes";
import axiosApi from "../../axios-api";

export const fetchCommentsSuccess = comments => ({type: FETCH_COMMENTS_SUCCESS, comments});

export const fetchComments = () => {
    return async dispatch => {
        const response = await axiosApi.get('/comments');
        dispatch(fetchCommentsSuccess(response.data));
    }
};
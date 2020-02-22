import {FETCH_NEWS_SUCCESS, POST_NEWS_SUCCESS,} from "./actionTypes";
import axiosApi from "../../axios-api";

export const fetchNewsSuccess = news => ({type: FETCH_NEWS_SUCCESS, news});
export const postNewsSuccess = () => ({type: POST_NEWS_SUCCESS});

export const fetchNews = () => {
    return async dispatch => {
        const response = await axiosApi.get('/news');
        dispatch(fetchNewsSuccess(response.data));
    }
};

export const postNews = post => {
    return async dispatch => {
        await axiosApi.post('/news', post);
        dispatch(postNewsSuccess());
    }
};
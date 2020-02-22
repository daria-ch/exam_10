import {FETCH_NEWS_SUCCESS,} from "./actionTypes";
import axiosApi from "../../axios-api";

export const fetchNewsSuccess = news => ({type: FETCH_NEWS_SUCCESS, news});

export const fetchNews = () => {
    return async dispatch => {
        const response = await axiosApi.get('/news');
        dispatch(fetchNewsSuccess(response.data));
    }
};
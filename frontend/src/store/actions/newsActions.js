import {
    FETCH_NEWS_FAILURE,
    FETCH_NEWS_REQUEST,
    FETCH_NEWS_SUCCESS,
    FETCH_SINGLE_POST_SUCCESS,
    POST_NEWS_SUCCESS,
} from "./actionTypes";
import axiosApi from "../../axios-api";

export const fetchNewsSuccess = news => ({type: FETCH_NEWS_SUCCESS, news});
export const postNewsSuccess = () => ({type: POST_NEWS_SUCCESS});
export const fetchSinglePostSuccess = post => ({type: FETCH_SINGLE_POST_SUCCESS, post});
export const fetchNewsRequest = () => ({type: FETCH_NEWS_REQUEST});
export const fetchNewsFailure = error => ({type: FETCH_NEWS_FAILURE, error});

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

export const fetchSinglePost = id => {
    return async (dispatch) => {
        const response = await axiosApi.get('/news/' + id);
        dispatch(fetchSinglePostSuccess(response.data));
    }
};

export const deletePost = id => {
    return async dispatch => {
        try {
            dispatch(fetchNewsRequest());
            await axiosApi.delete('/news/' + id);
            const response = await axiosApi.get('/news');
            const news = response.data;
            dispatch(fetchNewsSuccess(news));
        } catch (e) {
            dispatch(fetchNewsFailure(e));
        }
    }
};
import {CREATE_SHOW, DELETE_ALL_SHOWS, DELETE_SHOW, RETRIEVE_SHOWS, UPDATE_SHOW} from "./types";

import ShowDataService from "../services/show.service";
// import TutorialDataService to make asynchronous HTTP requests with trigger dispatch on the result.
export const createShow = (title, description,network,weekday,status) => async (dispatch) => {
    try {
        console.log("in show: create ",title, description,network,weekday,status)
        const res = await ShowDataService.create({ title, description,network,weekday,status });
        dispatch({
            type: CREATE_SHOW,
            payload: res.data,
        });
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const retrieveShows = () => async (dispatch) => {
    try {
        const res = await ShowDataService.getAll();
        dispatch({
            type: RETRIEVE_SHOWS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const updateShow = (id, data) => async (dispatch) => {
    try {
        const res = await ShowDataService.update(id, data);
        dispatch({
            type: UPDATE_SHOW,
            payload: data,
        });
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const deleteShow = (id) => async (dispatch) => {
    try {
        await ShowDataService.delete(id);
        dispatch({
            type: DELETE_SHOW,
            payload: { id },
        });
    } catch (err) {
        console.log(err);
    }
};

export const deleteAllShows = () => async (dispatch) => {
    try {
        const res = await ShowDataService.deleteAll();

        dispatch({
            type: DELETE_ALL_SHOWS,
            payload: res.data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const findShowsByTitle = (title) => async (dispatch) => {
    try {
        const res = await ShowDataService.findByTitle(title);

        dispatch({
            type: RETRIEVE_SHOWS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};

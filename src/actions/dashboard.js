import { START_LOADING, END_LOADING, FETCH_ALL } from '../constants/actionTypes';
import * as api from '../api/index.js';
import moment from 'moment';

export const getDashboard = (page) => async (dispatch) => {
    try {

        dispatch({ type: START_LOADING });
        const { data: { data, currentPage, numberOfPages } } = await api.fetchDashboard(page);
        data.forEach(element => {
            element.startedOn = moment(element.startedOn).format('LL');
            element.paymentDueDate = moment(element.paymentDueDate).format('LL');
        });
        dispatch({ type: FETCH_ALL, payload: { data, currentPage, numberOfPages } });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
};

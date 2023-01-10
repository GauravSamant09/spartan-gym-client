import { START_LOADING, END_LOADING, FETCH_ALL, CREATE, UPDATE } from '../constants/actionTypes';
import * as api from '../api/index.js';
import moment from 'moment';

export const getPayments = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data: { data, memberData, currentPage, numberOfPages } } = await api.fetchPayments(page);

        data.forEach(element => {
            element.paymentDate = moment(element.startedOn).format('LL');
            element.memberName = element.member_id.length > 0 ? element.member_id[0].name : 'Member Left';
            element.member_id = element.member_id.length > 0 ? element.member_id[0]._id : '';
            element.subscription = element.numberOfMonths === 1 ? 'One Month' : element.numberOfMonths === 2 ? 'Two Months' : 'Six Months';
        });
        dispatch({ type: FETCH_ALL, payload: { data, memberData, currentPage, numberOfPages } });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
};


export const createPayment = (payment) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const { data } = await api.createPayment(payment);
        data.paymentDate = moment(data.startedOn).format('LL');
        data.subscription = data.numberOfMonths === 1 ? 'One Month' : data.numberOfMonths === 2 ? 'Two Months' : 'Six Months';
        dispatch({ type: CREATE, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const updatePayment = (id, payment) => async (dispatch) => {
    try {
        const { data } = await api.updatePayment(id, payment);
        data.paymentDate = moment(data.startedOn).format('LL');
        data.subscription = data.numberOfMonths === 1 ? 'One Month' : data.numberOfMonths === 2 ? 'Two Months' : 'Six Months';
        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
};



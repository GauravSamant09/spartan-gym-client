import { START_LOADING, END_LOADING, FETCH_ALL, FETCH_MEMBER, CREATE, UPDATE, DELETE } from '../constants/actionTypes';
import * as api from '../api/index.js';
import moment from 'moment';

export const getMember = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const { data } = await api.fetchMember(id);
        data.startedOn = moment(data.startedOn).format('LL');
        data.paymentDueDate = moment(data.paymentDueDate).format('LL');

        dispatch({ type: FETCH_MEMBER, payload: { member: data } });
    } catch (error) {
        console.log(error);
    }
};

export const getMembers = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data: { data, currentPage, numberOfPages } } = await api.fetchMembers(page);
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


export const createMember = (member, history) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.createMember(member);
        data.startedOn = moment(data.startedOn).format('LL');
        data.paymentDueDate = moment(data.paymentDueDate).format('LL');

        dispatch({ type: CREATE, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const updateMember = (id, member) => async (dispatch) => {
    try {
        const { data } = await api.updateMember(id, member);
        data.startedOn = moment(data.startedOn).format('LL');
        data.paymentDueDate = moment(data.paymentDueDate).format('LL');
        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const deleteMember = (id) => async (dispatch) => {
    try {
        await await api.deleteMember(id);

        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error);
    }
};
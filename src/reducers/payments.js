import { FETCH_ALL, CREATE, UPDATE } from '../constants/actionTypes';

export default (state = { isLoading: true, payments: [], members: [] }, action) => {
    switch (action.type) {
        case 'START_LOADING':
            return { ...state, isLoading: true };
        case 'END_LOADING':
            return { ...state, isLoading: false };
        case FETCH_ALL:
            return {
                ...state,
                payments: action.payload.data,
                members: action.payload.memberData,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            };

        case CREATE:
            return { ...state, payments: [...state.payments, action.payload] };
        case UPDATE:
            return { ...state, payments: state.payments.map((payment) => (payment._id === action.payload._id ? action.payload : payment)) };
        default:
            return state;
    }
};

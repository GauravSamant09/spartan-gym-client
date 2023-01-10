import { FETCH_ALL } from '../constants/actionTypes';

export default (state = { isLoading: true, dashboard: [] }, action) => {
    switch (action.type) {
        case 'START_LOADING':
            return { ...state, isLoading: true };
        case 'END_LOADING':
            return { ...state, isLoading: false };
        case FETCH_ALL:

            return {
                ...state,
                dashboard: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            };
        default:
            return state;
    }
};

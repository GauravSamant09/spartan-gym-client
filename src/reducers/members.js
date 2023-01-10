import { FETCH_ALL, FETCH_MEMBER, CREATE, UPDATE, DELETE } from '../constants/actionTypes';

export default (state = { isLoading: true, members: [] }, action) => {
    switch (action.type) {
        case 'START_LOADING':
            return { ...state, isLoading: true };
        case 'END_LOADING':
            return { ...state, isLoading: false };
        case FETCH_ALL:
            return {
                ...state,
                members: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            };
        case FETCH_MEMBER:
            return { ...state, member: action.payload.member };
        case CREATE:
            return { ...state, members: [...state.members, action.payload] };
        case UPDATE:
            return { ...state, members: state.members.map((member) => (member._id === action.payload._id ? action.payload : member)) };
        case DELETE:
            return { ...state, members: state.members.filter((member) => member._id !== action.payload) };
        default:
            return state;
    }
};

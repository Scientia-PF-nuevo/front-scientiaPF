import {
    SET_COURSE_TOAPROVE,
    GET_COURSES_TO_APPROVE,
    APPROVE_COURSE,
    REJECT_COURSE
} from '../actions/constants';

const initialState = {
    courses: [],
    coursesToApprove: []
}

export default function reducerForm(state = initialState, action) {
    switch (action.type) {
        case SET_COURSE_TOAPROVE:
            return {
                ...state,
                courses: [...state.courses, action.payload]
            }
        case GET_COURSES_TO_APPROVE:
            console.log('reducer: ', action.payload)
            return {
                ...state,
                coursesToApprove: action.payload
            }
        default:
            return state;
    }
};
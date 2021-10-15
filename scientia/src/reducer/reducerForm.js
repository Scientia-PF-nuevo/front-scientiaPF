import { SET_COURSE_TOAPROVE } from '../actions/constants';

const initialState = {
    courses: []
}

export default function reducerForm (state = initialState, action){
    switch (action.type) {
        case SET_COURSE_TOAPROVE: 
            return {
                courses: [...state.courses, action.payload]
            }
        default: 
            return state;
    }
};
import {
    SET_COURSE_TOAPROVE,
    GET_COURSES_TO_APPROVE,
    APPROVE_COURSE,
    REJECT_COURSE,
    SALUDO
} from '../actions/constants';

const initialState = {
    name: '',
    description: '',
    price: 0,
    url: '',
    urlVideo: '',
    category: '',
    email: '',
    languaje: '',
    level: '',
    numbersOfDiscounts: 0,
    percentageDiscount: 0,
    courses: [],
    coursesToApprove: [],
    hi:[],
    bienvenido: true
}

export default function reducerForm(state = initialState, action) {
    switch (action.type) {
        case 'SET_NAME':
            return {
                ...state,
                name: action.payload.name
            }
        case 'SET_DESCRIPTION':
            return {
                ...state,
                description: action.payload.description
            }
        case 'SET_CATEGORY':
            return {
                ...state,
                category: action.payload.category,
                languaje: action.payload.languaje,
                level: action.payload.level,
                price: action.payload.price
            }
        case 'SET_URL':
            return {
                ...state,
                url: action.payload.url,
                urlVideo: action.payload.urlVideo,
            }
        case 'SET_AMOUNT':
            return {
                ...state,
                numbersOfDiscounts: action.payload.numbersOfDiscounts,
                percentageDiscount: action.payload.percentageDiscount,
            }
        case GET_COURSES_TO_APPROVE:
            return {
                ...state,
                coursesToApprove: action.payload
            }
        case APPROVE_COURSE:
            return {
                ...state,
                coursesToApprove: state.coursesToApprove.filter(el => el.id !== action.payload)
            }
        case REJECT_COURSE:
            return {
                ...state,
                coursesToApprove: state.coursesToApprove.filter(el => el.id !== action.payload)
            }
        case SALUDO:
            return {
                ...state,
                bienvenido: action.payload
            }
        case 'CLEAR_REDUX' :
            return {
                ...state,
                name: '',
                description: '',
                price: 0,
                url: '',
                urlVideo: '',
                category: '',
                email: '',
                languaje: '',
                level: '',
                numbersOfDiscounts: 0,
                percentageDiscount: 0,
            }
        default:
            return state;
    }
};
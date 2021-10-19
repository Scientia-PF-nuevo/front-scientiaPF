import {
    GET_ALL_COURSES,
    GET_USERS,
    GET_ADMINS,
    GET_FAVORITE_COURSES,
    GET_COURSE_DETAILS,
    SEARCH_BY_NAME,
    GET_GENRES_COURSES,
    FILTER_BY,
    ORDER_BY,
    ADD_CART,
    CLEAR_CART,
    REMOVE_CART,
    CONFIRM_ORDER,
    PENDING_ORDER,
    LOGIN,
    ADD_DETAILS,
    LOGEADO,
    NEW_USER
} from '../actions/constants';


const initialState = {
    users: [],
    admins: [],
    allCourses: [],
    courseByName: [],
    coursesByGenre: [],
    coursesBackup: [],
    courseDetails: [],
    favoritesCourses: [],
    filteredCourses: [],
    login: false,
    user: {},
    cart: [],
    orderConfirm: [],
    pendingOrders: []
};

export default function rootReducer(state = initialState, action) {

    switch (action.type) {

        case GET_ALL_COURSES:
            return {
                ...state,
                allCourses: action.payload,
                coursesBackup: action.payload,
            };

        case GET_USERS:
            return {
                ...state,
                users: action.payload
            };

        case GET_ADMINS:
            return {
                ...state,
                admins: action.payload
            };

        case GET_FAVORITE_COURSES:
            return {
                ...state,
                favoritesCourses: action.payload
            };

        case SEARCH_BY_NAME:
            return {
                ...state,
                allCourses: action.payload
            };

        case GET_COURSE_DETAILS:
            return {
                ...state,
                courseDetails: action.payload
            };

        case GET_GENRES_COURSES:
            return {
                ...state,
                coursesByGenre: action.payload
            };

        case FILTER_BY:
            console.log(action)
            if (action.payload === 'default') {
                return { ...state, allCourses: state.coursesBackup }
            } else {
                return { ...state, allCourses: state.coursesBackup.filter((course) => (action.payload) === course.categories) }
            }


        //! Ordena alfabeticamente
        case ORDER_BY:
            if (action.payload === 'A-Z') {
                return {
                    ...state, allCourses: [...state.coursesBackup].sort((prev, next) => {
                        if (prev.name > next.name) return 1
                        if (prev.name < next.name) return -1
                        return 0
                    })
                }
            }
            if (action.payload === 'Z-A') {
                return {
                    ...state, allCourses: [...state.coursesBackup].sort((prev, next) => {
                        if (prev.name > next.name) return -1
                        if (prev.name < next.name) return 1
                        return 0
                    })
                }
            }

            //! Ordena por valor del curso (asc o desc)
            if (action.payload === 'desc') {
                return { ...state, allCourses: [...state.coursesBackup].sort((prev, next) => prev.price - next.price) }
            }
            if (action.payload === 'asc') {
                return { ...state, allCourses: [...state.coursesBackup].sort((prev, next) => next.price - prev.price) }
            }

            //! Ordena por fecha (new o old)
            if (action.payload === 'new') {
                return { ...state, allCourses: [...state.coursesBackup].sort((prev, next) => prev.date - next.date) }
            }
            if (action.payload === 'old') {
                return { ...state, allCourses: [...state.coursesBackup].sort((prev, next) => next.date - prev.date) }
            }

            //! Ordena por Rating (best o worst)
            if (action.payload === 'worst') {
                return { ...state, allCourses: [...state.coursesBackup].sort((prev, next) => prev.score - next.score) }
            }
            if (action.payload === 'best') {
                return { ...state, allCourses: [...state.coursesBackup].sort((prev, next) => next.score - prev.score) }
            }

            //! Orden por default como llega de la DB
            else {
                return { ...state, filteredCourses: state.coursesBackup }
            };

        case LOGIN:
            return {
                ...state,
                user: action.payload,
                login: true
            }
        case ADD_CART:
            return {
                ...state,
                cart: state.cart.concat(action.payload)
            }
        case REMOVE_CART:
            return {
                ...state,
                cart: state.cart.filter((course) => course.id !== action.payload)
            }

        case CLEAR_CART:
            return {
                ...state, 
                cart: []
            }   

        case CONFIRM_ORDER:
            return {
                ...state, 
                orderConfirm: action.payload
            }

        case PENDING_ORDER:
            return {
                ...state, 
                pendingOrders: action.payload
            }    

            case ADD_DETAILS:
                return {
                    ...state, 
                    courseDetails: state.coursesBackup.filter((course) => course.id === action.payload)
                }
            case NEW_USER: 
                return {
                    ...state,
                    user: action.payload
                }
        default:
            return state;
    }
};
import {
    GET_ALL_COURSES,
    GET_USERS,
    GET_USER_INFO,
    GET_ADMINS,
    GET_FAVORITE_COURSES,
    GET_COURSE_DETAILS,
    SEARCH_BY_NAME,
    GET_GENRES_COURSES,
    GET_REVIEWS_BY_COURSEID,
    GET_FILTERED_COURSES,
    CREATE_REVIEW,
    FILTER_BY,
    ORDER_BY,
    ADD_CART,
    CLEAR_CART,
    REMOVE_CART,
    CONFIRM_ORDER,
    PENDING_ORDER,
    LOGIN,
    ADD_DETAILS,
    LOGOUT,
    NEW_USER,
    SET_VIDEO,
    VIDEO_PLAYING,
    CLEAR_CART_TO_PAY,
} from '../actions/constants';


const initialState = {
    users: [],
    admins: [],
    allCourses: [],
    courseByName: [],
    coursesByGenre: [],
    coursesBackup: [],
    courseDetails: [],
    coursesReviews: [],
    favoritesCourses: [],
    filteredCourses: [],
    login: false,
    user: {},
    userInfo: {},
    cart: [],
    cartToPay: [],
    orderConfirm: [],
    pendingOrders: [],
    videoUpdated: "",
    videoPlaying: {},
    reviewCreated: {}
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

        case GET_USER_INFO:
            return {
                 ...state,
                 userInfo: action.payload
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

        case GET_REVIEWS_BY_COURSEID:
            return {
                ...state,
                coursesReviews: action.payload
            }; 
        
            //*!! chequear
        case GET_FILTERED_COURSES:
            return {
                ...state,
                allCourses: action.payload
            }; 

        case GET_GENRES_COURSES:
            return {
                ...state,
                coursesByGenre: action.payload
            };

        case FILTER_BY:
            if (action.payload === 'default') {
                return { ...state, allCourses: state.coursesBackup }
            } else {
                return { ...state, allCourses: state.coursesBackup.filter((course) => (action.payload) === course.categories) }
            }


        //! Ordena alfabeticamente
        case ORDER_BY:
            if (action.payload === 'A-Z') {
                return {
                    ...state, allCourses: [...state.allCourses].sort((prev, next) => {
                        if (prev.name > next.name) return 1
                        if (prev.name < next.name) return -1
                        return 0
                    })
                }
            }
            if (action.payload === 'Z-A') {
                return {
                    ...state, allCourses: [...state.allCourses].sort((prev, next) => {
                        if (prev.name > next.name) return -1
                        if (prev.name < next.name) return 1
                        return 0
                    })
                }
            }

            //! Ordena por valor del curso (asc o desc)
            if (action.payload === 'desc') {
                return { ...state, allCourses: [...state.allCourses].sort((prev, next) => prev.price - next.price) }
            }
            if (action.payload === 'asc') {
                return { ...state, allCourses: [...state.allCourses].sort((prev, next) => next.price - prev.price) }
            }

            //! Ordena por fecha (new o old)
            if (action.payload === 'new') {
                return { ...state, allCourses: [...state.allCourses].sort((prev, next) => prev.date - next.date) }
            }
            if (action.payload === 'old') {
                return { ...state, allCourses: [...state.allCourses].sort((prev, next) => next.date - prev.date) }
            }

            //! Ordena por Rating (best o worst)
            if (action.payload === 'worst') {
                return { ...state, allCourses: [...state.allCourses].sort((prev, next) => prev.score - next.score) }
            }
            if (action.payload === 'best') {
                return { ...state, allCourses: [...state.allCourses].sort((prev, next) => next.score - prev.score) }
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
            let agregar_carrito = state.cart.concat(action.payload)
            return {
                ...state,
                cart: agregar_carrito,
                cartToPay: agregar_carrito
            }
        case REMOVE_CART:
            let remover_carrito = state.cart.filter((course) => course.id !== action.payload)
            return {
                ...state,
                cart: remover_carrito,
                cartToPay: remover_carrito
            }

        case CLEAR_CART:
            return {
                ...state,
                cart: []
            }
        case CLEAR_CART_TO_PAY:
            return {
                ...state,
                cartToPay: []
            }

        case CONFIRM_ORDER:
            return {
                ...state,
                orderConfirm: action.payload
            }

        case CREATE_REVIEW:
            return {
                ...state,
                reviewCreated: action.payload
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

        case SET_VIDEO:
            return {
                ...state,
                videoUpdated: action.payload
            }

        case VIDEO_PLAYING:
            return {
                ...state,
                videoPlaying: action.payload
            }
        case LOGOUT:
            return {
                ...state,
                user: {},
                login: action.payload
            }
        default:
            return state;
    }
};
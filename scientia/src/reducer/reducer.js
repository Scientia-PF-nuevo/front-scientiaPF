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
    ADD_CART_LOGGED,
    GET_CART,
    ADD_GIFT,
    REMOVE_GIFT,
    DELETE_CART_LOGGED,
    CLEAR_CART,
    REMOVE_CART,
    CONFIRM_ORDER,
    LOGIN,
    ADD_DETAILS,
    LOGOUT,
    NEW_USER,
    SET_VIDEO,
    VIDEO_PLAYING,
    CLEAR_CART_TO_PAY,
    REMOVE_ALL_GIFT,
    BIENVENIDO,
    ADD_FREE_COURSE,
    GET_ALL_CATEGORIES
} from '../actions/constants';


const initialState = {
    users: [],
    admins: [],
    allCourses: [],
    allCategories: [],
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
    reviewCreated: {},
    gift: [],
    freeCourse: []
};

export default function rootReducer(state = initialState, action) {

    switch (action.type) {
        case GET_ALL_CATEGORIES:
        return {
            ...state,
            allCategories: action.payload
        };


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

        case GET_CART:
            return {
                ...state,
                cart: action.payload,
                cartToPay: action.payload
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
                coursesReviews: action.payload,
                coursesDetails: action.payload

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
                return {
                    ...state,
                    allCourses: state.allCourses
                }
            } else {
                return {
                    ...state,
                    allCourses: state.allCourses.filter((course) => (action.payload) === course.categories)
                }
            }


        //! Ordena alfabeticamente
        case ORDER_BY:
            if (action.payload === 'A-Z') {
                return {
                    ...state,
                    allCourses: [...state.allCourses].sort((prev, next) => {
                        if (prev.name > next.name) return 1
                        if (prev.name < next.name) return -1
                        return 0
                    })
                }
            }
            if (action.payload === 'Z-A') {
                return {
                    ...state,
                    allCourses: [...state.allCourses].sort((prev, next) => {
                        if (prev.name > next.name) return -1
                        if (prev.name < next.name) return 1
                        return 0
                    })
                }
            }

            //! Ordena por valor del curso (asc o desc)
            if (action.payload === 'desc') {
                return {
                    ...state,
                    allCourses: [...state.allCourses].sort((prev, next) => prev.price - next.price)
                }
            }
            if (action.payload === 'asc') {
                return {
                    ...state,
                    allCourses: [...state.allCourses].sort((prev, next) => next.price - prev.price)
                }
            }

            //! Ordena por fecha (new o old)
            if (action.payload === 'new') {
                return {
                    ...state,
                    allCourses: [...state.allCourses].sort((prev, next) => prev.date - next.date)
                }
            }
            if (action.payload === 'old') {
                return {
                    ...state,
                    allCourses: [...state.allCourses].sort((prev, next) => next.date - prev.date)
                }
            }

            //! Ordena por Rating (best o worst)
            if (action.payload === 'worst') {
                return {
                    ...state,
                    allCourses: [...state.allCourses].sort((prev, next) => prev.score - next.score)
                }
            }
            if (action.payload === 'best') {
                return {
                    ...state,
                    allCourses: [...state.allCourses].sort((prev, next) => next.score - prev.score)
                }
            }

            //! Ordena por Solds (less o most)
            if (action.payload === 'less') {
                return {
                    ...state,
                    allCourses: [...state.allCourses].sort((prev, next) => prev.solds - next.solds)
                }
            }
            if (action.payload === 'most') {
                return {
                    ...state,
                    allCourses: [...state.allCourses].sort((prev, next) => next.solds - prev.solds)
                }
            }

            //! Orden por default como llega de la DB
            else {
                return {
                    ...state,
                    filteredCourses: state.coursesBackup
                }
            };

        case LOGIN:
            let iState = {
                bienvenido: false
            }
            let res = {
                ...iState,
                ...action.payload
            }
            return {
                ...state,
                user: res,
                login: true
            }
        case ADD_CART:
            let agregar_carrito = state.cart.concat(action.payload)
            return {
                ...state,
                cart: agregar_carrito,
                cartToPay: agregar_carrito
            }

        case ADD_CART_LOGGED:

            return {
                ...state,
                cart: action.payload,
                cartToPay: action.payload
            }

        case ADD_FREE_COURSE:

            return {
                ...state,
                freeCourse: action.payload,
            }

        case DELETE_CART_LOGGED:
            return {
                ...state,
                cart: action.payload,
                cartToPay: action.payload
            }


        case REMOVE_CART:
            let remover_carrito = state.cart.filter((course) => course.coursesId !== action.payload)
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
        case REMOVE_ALL_GIFT:
            return {
                ...state,
                gift: action.payload
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

        case ADD_GIFT:
            return {
                ...state,
                gift: state.gift.concat(action.payload)
            }

        case REMOVE_GIFT:
            return {
                ...state,
                gift: state.gift.filter((g) => g.courseId !== action.payload )
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
        case BIENVENIDO:
            return {
                ...state,
                user: { ...state.user, bienvenido: action.payload },
            }
        default:
            return state;
    }
};
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
    LOGIN,
    LOGEADO
} from '../actions/constants';


const initialState = {
    users: [],
    admins: [],
    allCourses: [],
    courseByName: [],
    coursesByGenre: [],
    coursesBackup: [],
    courseDetails: {},
    favoritesCourses: [],
    filteredCourses: [],
    login: false,
    user: {}
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
                courseByName: action.payload
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
            if (action.payload === 'default') {
                return { ...state, filteredCourses: state.coursesBackup }
            }
            if (action.payload === 'DB') {
                return { ...state, filteredCourses: state.coursesBackup.filter((course) => (typeof course.id) === 'string') }
            }
            if (action.payload === 'API') {
                return { ...state, filteredCourses: state.coursesBackup.filter((course) => (typeof course.id) === 'number') }
            }
            else {
                return {
                    ...state, filteredCourses: state.coursesBackup.filter((course) => {
                        return course.genres.find((genre) => {
                            return genre === action.payload
                        })
                    })
                }
            };

        case ORDER_BY:
            if (action.payload === 'A-Z') {
                return {
                    ...state, filteredCourses: [...state.filteredCourses].sort((prev, next) => {
                        if (prev.name > next.name) return 1
                        if (prev.name < next.name) return -1
                        return 0
                    })
                }
            }
            if (action.payload === 'Z-A') {
                return {
                    ...state, filteredCourses: [...state.filteredCourses].sort((prev, next) => {
                        if (prev.name > next.name) return -1
                        if (prev.name < next.name) return 1
                        return 0
                    })
                }
            }
            if (action.payload === 'desc') {
                return { ...state, filteredCourses: [...state.filteredCourses].sort((prev, next) => prev.rating - next.rating) }
            }
            if (action.payload === 'asc') {
                return { ...state, filteredCourses: [...state.filteredCourses].sort((prev, next) => next.rating - prev.rating) }
            }
            else {
                return { ...state, filteredCourses: state.coursesBackup }
            };

        case LOGIN:
            return {
                ...state,
                user: action.payload
            }
        case LOGEADO:
            return {
                ...state,
                login: true
            }
        default:
            return state;
    }
};
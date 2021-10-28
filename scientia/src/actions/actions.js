import axios from 'axios';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import {
    GET_ALL_COURSES,
    GET_USERS,
    GET_USER_INFO,
    GET_ADMINS,
    GET_FAVORITE_COURSES,
    GET_COURSE_DETAILS,
    GET_GENRES_COURSES,
    GET_REVIEWS_BY_COURSEID,
    GET_FILTERED_COURSES,
    CREATE_REVIEW,
    CONFIRM_ORDER,
    PENDING_ORDER,
    ADD_CART,
    REMOVE_CART,
    CLEAR_CART,
    CLEAR_CART_TO_PAY,
    SEARCH_BY_NAME,
    FILTER_BY,
    ORDER_BY,
    LOGIN,
    LOGOUT,
    ADD_DETAILS,
    SET_COURSE_TOAPROVE,
    NEW_USER,
    SET_VIDEO,
    VIDEO_PLAYING
} from './constants.js';


//* Trae todos los cursos (DB + API)
export function getAllCourses() {
    return async function (dispatch) {
        return await axios.get('http://localhost:3001/courses/')
            .then(res => {
                dispatch({ type: GET_ALL_COURSES, payload: res.data })
            })
            .catch(err => { return err })
    }
}

//* Trae todos los cursos filtrados por valores de filtro (QUERY)
export function getFilteredCourses(info) {
    const {
      level1,
      level2,
      level3,
      price1,
      price2,
      languaje1,
      languaje2,
      languaje3,
      ranking1,
      ranking2,
      ranking3,
      ranking4,
      ranking5,
      category,
    } = info;
    return async function (dispatch) {
        console.log(info)
        return await axios
          .get(
            `http://localhost:3001/courses/filters?level1=${level1}&level2=${level2}&level3=${level3}&price1=${price1}&price2=${price2}&languaje1=${languaje1}&languaje2=${languaje2}&languaje3=${languaje3}&ranking1=${ranking1}&ranking2=${ranking2}&ranking3=${ranking3}&ranking4=${ranking4}&ranking5=${ranking5}&category=${category}`
          )
          .then((res) => {
            dispatch({ type: GET_FILTERED_COURSES, payload: res.data });
          })
          .catch((err) => {
            return err;
          });
    }
}

//* Trae todos los cursos encontrados por nombre (QUERY: "name")
export function searchByName(name) {
    return function (dispatch) {
        return axios.get(`http://localhost:3001/courses?name=${name}`)

            .then(res => {

                dispatch({ type: SEARCH_BY_NAME, payload: res.data });
            })
            .catch(err => { return err })
    }
}

//! NO HAY ENDPOIND CREADO EN EL BACK AUN - 
//!Trae los detalles del curso pedido por PARAMS por (params :ID)
export function getCourseDetail(id) {
    return function (dispatch) {
        axios.get(`http://localhost:3001/courses/${id}`)
            .then(res => {

                dispatch({ type: GET_COURSE_DETAILS, payload: res.data });
            })
            .catch(err => { return err })

    }
}

//* Trae las reviews de los cursos pedidos por ID 
export function getCoursesReviewsById(id) {
    return function (dispatch) {
        axios.get(`http://localhost:3001/courses/id/${id}`)
            .then(res => {

                dispatch({ type: GET_REVIEWS_BY_COURSEID, payload: res.data });
            })
            .catch(err => { return err })

    }
}

//* Trae todos los cursos por generos
export function getGenresCourses() {
    return function (dispatch) {
        axios.get(`http://localhost:3001/courses/allcategories`)
            .then(res => {

                dispatch({ type: GET_GENRES_COURSES, payload: res.data });
            })
            .catch(err => { return err })
    }
}

//* Trae todos los usuarios de la DB
export function getUsers() {
    return function (dispatch) {
        axios.get(`http://localhost:3001/users`)
            .then(res => {

                dispatch({ type: GET_USERS, payload: res.data });
            })
            .catch(err => { return err })
    }
}

//* Trae todos los datos de un usuario en particular (DB)
export function getUserInfo(email) {
    return function (dispatch) {
        axios.get(`http://localhost:3001/users/email/${email}`)
            .then(res => {
                dispatch({ type: GET_USER_INFO, payload: res.data });
            })
            .catch(err => { return err })
    }
}

//* Trae todos los administradores de la DB
export function getAdmins() {
    return function (dispatch) {
        axios.get(`http://localhost:3001/admins`)
            .then(res => {

                dispatch({ type: GET_ADMINS, payload: res.data });
            })
            .catch(err => { return err })
    }
}

//* Trae todos los cursos favoritos por USUARIO (OJO!!!) de la DB
export function getFavoritesCourses() {
    return function (dispatch) {
        axios.get(`http://localhost:3001/favorites`)
            .then(res => {

                dispatch({ type: GET_FAVORITE_COURSES, payload: res.data });
            })
            .catch(err => { return err })
    }
}

//* Ordenamiento
export function orderBy(order) {
    return function (dispatch) {
        dispatch({ type: ORDER_BY, payload: order })
    }
}

//* Filtrado
export function filterBy(order) {
    return function (dispatch) {
        dispatch({ type: FILTER_BY, payload: order })
    }
}

export function setCourseToAprove(payload) {
    return function (dispatch) {
        axios.post(`http://localhost:3001/courses/newcourse`, payload)
            .then(res => {

                dispatch({ type: GET_COURSE_DETAILS, payload: res.data });
            })
            .catch(err => { return err })

    }
}

export function logear(data) {
    return {
        type: LOGIN,
        payload: data
    }
}

export function addCart(data) {
    return {
        type: ADD_CART,
        payload: data
    }
}

export function removeCart(id) {
    return {
        type: REMOVE_CART,
        payload: id
    }
}

export function clearCart() {

    return {
        type: CLEAR_CART
    }
}
export function clearCartToPay() {
    return {
        type: CLEAR_CART_TO_PAY
    }
}


//* Confirma un CURSO a la DB (COMPLETA)
export function confirmOrder(userCart) {
    return function (dispatch) {
        axios.post(`http://localhost:3001/order/${userCart.email}`, { state: "completa", courseId: userCart.courseId })
            .then(res => {

                dispatch({ type: CONFIRM_ORDER, payload: res.data });
            })
            .catch(err => { return err })
    }
}

//* Confirma un CURSO a la DB (PENDIENTE)
export function pendingOrder(userCart) {
    return function (dispatch) {
        axios.post(`http://localhost:3001/order/${userCart.email}`, { state: "creada", courseId: userCart.courseId })
            .then(res => {

                dispatch({ type: PENDING_ORDER, payload: res.data });
            })
            .catch(err => { return err })
    }
}

export function addDetails(id) {
    return {
        type: ADD_DETAILS,
        payload: id
    }
}

export function setInfoVideoPlaying(info) {
    return {
        type: VIDEO_PLAYING,
        payload: info
    }
}

export function autenticarConGoogle(prop) {
    return function (dispatch) {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                dispatch(logear(user))
                if (prop === 'register') {
                    dispatch(register(user))
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                return errorCode
            });
    }
}

//*Crea nuevo usuario desde google
export function register(user) {
    if (user.displayName) {
        let nombre = user.displayName.split(" ")
        let values = {
            firstName: nombre[0],
            lastName: nombre[nombre.length - 1],
            email: user.email,
            password: user.uid,
        }
        axios.post('http://localhost:3001/users/register', values);
    }
}

//*Crea nuevo usuario directo
export function createUser(user) {
    return async function (dispatch) {
        return await axios.post('http://localhost:3001/users/register', user)
            .then((response) => {
                dispatch({
                    type: NEW_USER,
                    payload: response.data
                })
                window.location.href = 'http://localhost:3000/home';
            })
    }
}

//*Actualiza la info de perfil
export function updateInfoUser(email) {
    return async function (dispatch) {
        return await axios.get(`http://localhost:3001/users/email/${email}`)
            .then((response) => {
                dispatch({
                    type: GET_USER_INFO,
                    payload: response.data
                })
            })
    }
}

//*Actualizad el estado del video
export function updateInfoVideo(info) {
    const { email, ...others } = info
    return async function (dispatch) {
        return await axios.put(`http://localhost:3001/courses/${email}`, others)
            .then((response) => {
                dispatch({
                    type: SET_VIDEO,
                    payload: response.data
                })
            })
    }
}

export function logout() {
    return {
        type: LOGOUT,
        payload: false
    }
}

//*Crea nueva review
export function createReview(review) {
    return async function (dispatch) {
        return await axios.post('http://localhost:3001/courses/newreview', review)
            .then((response) => {
                dispatch({
                    type: CREATE_REVIEW,
                    payload: response.data
                })
            })
    }
}
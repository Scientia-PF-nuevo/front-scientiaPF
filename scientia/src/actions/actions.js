import axios from 'axios';
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider
} from "firebase/auth";

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
    ADD_CART,
    ADD_GIFT,
    REMOVE_GIFT,
    ADD_CART_LOGGED,
    GET_CART,
    DELETE_CART_LOGGED,
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
    VIDEO_PLAYING,
    GET_COURSES_TO_APPROVE,
    REJECT_COURSE,
    APPROVE_COURSE,
    REMOVE_ALL_GIFT,
    SALUDO,

} from './constants.js';


//* Trae todos los cursos (DB + API)
export function getAllCourses() {
    return async function (dispatch) {
        return await axios.get('http://localhost:3001/courses/')
            .then(res => {
                dispatch({
                    type: GET_ALL_COURSES,
                    payload: res.data
                })
            })
            .catch(err => {
                return err
            })
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
        price3,
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

        return await axios
            .get(
                `http://localhost:3001/courses/filters?level1=${level1}&level2=${level2}&level3=${level3}&price1=${price1}&price2=${price2}&price3=${price3}&languaje1=${languaje1}&languaje2=${languaje2}&languaje3=${languaje3}&ranking1=${ranking1}&ranking2=${ranking2}&ranking3=${ranking3}&ranking4=${ranking4}&ranking5=${ranking5}&category=${category}`
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

                dispatch({
                    type: SEARCH_BY_NAME,
                    payload: res.data
                });
            })
            .catch(err => {
                return err
            })
    }
}

//* Trae las reviews de los cursos pedidos por ID 
export function getCoursesReviewsById(id) {
    return function (dispatch) {
        axios.get(`http://localhost:3001/courses/id/${id}`)
            .then(res => {

                dispatch({
                    type: GET_REVIEWS_BY_COURSEID,
                    payload: res.data
                });
            })
            .catch(err => {
                return err
            })

    }
}

//* Trae todos los cursos por generos
export function getGenresCourses() {
    return function (dispatch) {
        axios.get(`http://localhost:3001/courses/allcategories`)
            .then(res => {

                dispatch({
                    type: GET_GENRES_COURSES,
                    payload: res.data
                });
            })
            .catch(err => {
                return err
            })
    }
}

//* Trae todos los usuarios de la DB
export function getUsers() {
    return function (dispatch) {
        axios.get(`http://localhost:3001/users`)
            .then(res => {

                dispatch({
                    type: GET_USERS,
                    payload: res.data
                });
            })
            .catch(err => {
                return err
            })
    }
}



//* Trae todos los datos de un usuario en particular (DB)
export function getUserInfo(email) {
    return function (dispatch) {
        axios.get(`http://localhost:3001/users/email/${email}`)
            .then(res => {
                dispatch({
                    type: GET_USER_INFO,
                    payload: res.data
                });
            })
            .catch(err => {
                return err
            })
    }
}

//* Trae todos los administradores de la DB
export function getAdmins() {
    return function (dispatch) {
        axios.get(`http://localhost:3001/admins`)
            .then(res => {

                dispatch({
                    type: GET_ADMINS,
                    payload: res.data
                });
            })
            .catch(err => {
                return err
            })
    }
}

//* Trae todos los cursos favoritos por USUARIO (OJO!!!) de la DB
export function getFavoritesCourses() {
    return function (dispatch) {
        axios.get(`http://localhost:3001/favorites`)
            .then(res => {

                dispatch({
                    type: GET_FAVORITE_COURSES,
                    payload: res.data
                });
            })
            .catch(err => {
                return err
            })
    }
}

//* Ordenamiento
export function orderBy(order) {
    return function (dispatch) {
        dispatch({
            type: ORDER_BY,
            payload: order
        })
    }
}

//* Filtrado
export function filterBy(order) {
    return function (dispatch) {
        dispatch({
            type: FILTER_BY,
            payload: order
        })
    }
}

export function setCourseToAprove(payload) {
    return function (dispatch) {
        axios.post(`http://localhost:3001/courses/newcourse`, payload)
            .then(res => {

                dispatch({
                    type: GET_COURSE_DETAILS,
                    payload: res.data
                });
            })
            .catch(err => {
                return err
            })

    }
}

//* Trae todos las orders del carro de la DB
export function getCart(email) {
    return async function (dispatch) {
        return await axios.get(`http://localhost:3001/order/${email}`)
            .then(res => {

                dispatch({ type: GET_CART, payload: res.data });
            })
            .catch(err => { return err })
    }
}

export function addCartLogged(data) {
    const course = { state: "carrito", courseId: data.id, price: data.offerPrice }

    return async function (dispatch) {
        return await axios.post(`http://localhost:3001/order/${data.email}`, course)
            .then(res => {

                dispatch({ type: ADD_CART_LOGGED, payload: res.data });
            })
            .catch(err => { return err })
    }

}

export function deleteCartLogged(data) {
    return async function (dispatch) {
        return await axios.post(`http://localhost:3001/order/delete/${data.email}/${data.id}`)
            .then(res => {

                dispatch({ type: DELETE_CART_LOGGED, payload: res.data });

            })
            .catch(err => { return err })
    }

}

export function logear(correo, contra, cart, normal, name, apellido) {

    var data = {
        email: correo,
        password: contra,
        cart,
    }
    if (normal) {
        data = {
            ...data,
            isGoogle: false
        }
    } else {
        data = {
            ...data,
            isGoogle: true,
            firstName: name,
            lastName: apellido
        }

    }
    if (normal) {
        return function (dispatch) {
            axios.post('http://localhost:3001/users/login', data)
                .then(r => {
                    dispatch({
                        type: LOGIN,
                        payload: (r.data)
                    })
                })
                .catch(err => console.log(err))
        }
    } else {
        return function (dispatch) {
            axios.post('http://localhost:3001/users/login', data)
                .then(r => {
                    dispatch({
                        type: LOGIN,
                        payload: (r.data)
                    })
                })
                .catch(err => console.log(err))
        }
    }
}

export function addCart(data) {
    return {
        type: ADD_CART,
        payload: data
    }
}

export function addGift(data) {
    return {
        type: ADD_GIFT,
        payload: data
    }
}

export function removeGift(id) {
    return {
        type: REMOVE_GIFT,
        payload: id
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
export function removeAllGift() {
    console.log('asd')
    return {
        type: REMOVE_ALL_GIFT,
        payload: []
    }
}


//* Confirma un CURSO a la DB (COMPLETA)
export function confirmOrder(userCart) {
    return function (dispatch) {
        axios.post(`http://localhost:3001/order/${userCart.email}`, {
            state: "completa",
            courseId: userCart.courseId
        })
            .then(res => {

                dispatch({
                    type: CONFIRM_ORDER,
                    payload: res.data
                });
            })
            .catch(err => {
                return err
            })
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

export function autenticarConGoogle(cart) {
    return function (dispatch) {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                dispatch(logear(user.email, user.uid, cart, false, user.displayName.split(' ')[0], user.displayName.split(' ')[user.displayName.split(' ').length - 1]))
            })
            .catch((error) => {
                const errorCode = error.code;
                return errorCode
            });
    }
}

//*Crea nuevo usuario desde google
export function register(user) {
    if (user.firstName) {
        let nombre = user.firstName.split(" ")
        let values = {
            firstName: nombre[0],
            lastName: nombre[nombre.length - 1],
            email: user.email,
            password: user.uid,
        }
        axios.post('http://localhost:3001/users/register', values);
        // window.location.href = 'http://localhost:3000/success';
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

//*Actualizad el estado del video
export function updateInfoVideo(info) {
    const {
        email,
        ...others
    } = info
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
    return async function (dispatch) {
        axios.post(`http://localhost:3001/users/logout`)
            .then(r =>
                dispatch({
                    type: LOGOUT,
                    payload: false
                })
            )
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

export function getCoursesToApprove() {
    return async function (dispatch) {
        axios.get('http://localhost:3001/admin/listdata')
            .then(res => dispatch({
                type: GET_COURSES_TO_APPROVE,
                payload: res.data
            }))
    }
}

export function approveCourse(id) {
    return async function (dispatch) {
        axios.put(`http://localhost:3001/admin/editcoursestate/active/${id}`)
            .then(res => {
                dispatch({
                    type: APPROVE_COURSE,
                    payload: id
                })
            })
    }
}
export function rejectCourse(id, motivo) {
    return async function (dispatch) {
        axios.put(`http://localhost:3001/admin/editcoursestate/rejected/${id}`, { motivo: motivo })
            .then(res => {
                dispatch({
                    type: REJECT_COURSE,
                    payload: id
                })
            })
    }
}

export function saludo() {
    return {
        type: SALUDO,
        payload: false
    }
}
export function iniciarSaludo() {
    return {
        type: SALUDO,
        payload: true
    }
}
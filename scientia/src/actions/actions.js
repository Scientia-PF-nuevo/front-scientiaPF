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
    NEW_USER,
    SET_VIDEO,
    VIDEO_PLAYING,
    GET_COURSES_TO_APPROVE,
    REJECT_COURSE,
    APPROVE_COURSE,
    REMOVE_ALL_GIFT,
    GET_ALL_CATEGORIES,
    ADD_FREE_COURSE,
    SALUDO,
    DELETE_COURSE
} from './constants.js';

//trae todas las categorias 
export function getAllCategories() {
    return async function (dispatch) {
        return await axios.get('/courses/allcategories/')
            .then(response => {
                dispatch({
                    type: GET_ALL_CATEGORIES,
                    payload: response.data
                })
            })
            .catch(err => { return err })
    }
}

//* Trae todos los cursos (DB + API)
export function getAllCourses() {
    return async function (dispatch) {
        return await axios.get('/courses/')
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
                `/courses/filters?level1=${level1}&level2=${level2}&level3=${level3}&price1=${price1}&price2=${price2}&price3=${price3}&languaje1=${languaje1}&languaje2=${languaje2}&languaje3=${languaje3}&ranking1=${ranking1}&ranking2=${ranking2}&ranking3=${ranking3}&ranking4=${ranking4}&ranking5=${ranking5}&category=${category}`
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
        return axios.get(`/courses?name=${name}`)

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
        axios.get(`/courses/id/${id}`)
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
        axios.get(`/courses/allcategories`)
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
        axios.get(`/users`)
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
        axios.get(`/users/email/${email}`)
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
        axios.get(`/admins`)
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
        axios.get(`/favorites`)
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
        axios.post(`/courses/newcourse`, payload)
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


export function clearReduxer() {
    return {
        type: 'CLEAR_REDUX',
    }
}

export function setNewCourse(payload) {

    if (payload.name) {
        return {
            type: 'SET_NAME',
            payload
        }
    }
    if (payload.description) {
        return {
            type: 'SET_DESCRIPTION',
            payload
        }
    }
    if (payload.category) {
        return {
            type: 'SET_CATEGORY',
            payload
        }
    }
    if (payload.url) {
        return {
            type: 'SET_URL',
            payload
        }
    }
    if (payload.numbersOfDiscounts === 0 || payload.numbersOfDiscounts > 0) {
        return {
            type: 'SET_AMOUNT',
            payload
        }
    }
}
//* Trae todos las orders del carro de la DB
export function getCart(email) {
    return async function (dispatch) {
        return await axios.get(`/order/${email}`)
            .then(res => {

                dispatch({ type: GET_CART, payload: res.data });
            })
            .catch(err => { return err })
    }
}

//* agrega curso gratuito directamente
export function addFreeCourse(email, id) {
    return async function (dispatch) {
        return await axios.post(`/purchase/freecourses/${email}/${id}`)
            .then(res => {

                dispatch({ type: ADD_FREE_COURSE, payload: res.data });
            })
            .catch(err => { return err })
    }
}

//* borra curso directamente
export function deleteCourse(email, id) {
    return async function (dispatch) {
        return await axios.post(`/courses/delete/${email}/${id}`)
            .then(res => {

                dispatch({ type: DELETE_COURSE, payload: res.data });
            })
            .catch(err => { return err })
    }
}

export function addCartLogged(data) {
    const course = { state: "carrito", courseId: data.id, price: data.offerPrice }

    return async function (dispatch) {
        return await axios.post(`/order/${data.email}`, course)
            .then(res => {

                dispatch({ type: ADD_CART_LOGGED, payload: res.data });
            })
            .catch(err => { return err })
    }

}

export function deleteCartLogged(data) {
    return async function (dispatch) {
        return await axios.post(`/order/delete/${data.email}/${data.id}`)
            .then(res => {

                dispatch({ type: DELETE_CART_LOGGED, payload: res.data });

            })
            .catch(err => { return err })
    }

}

export function logear(correo, contra, cart, normal, name, apellido, photo) {
    
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
            lastName: apellido,
            profilePicture: photo
        }

    }
    if (normal) {
        return function (dispatch) {
            axios.post('/users/login', data)
                .then(r => {
                    if (r.data !== 'Check your email and password') {
                        dispatch({
                            type: LOGIN,
                            payload: (r.data)
                        })
                    } else {
                        dispatch({
                            type: LOGIN,
                            payload: 'C'
                        })
                    }
                })
                .catch(err => console.log(err))
        }
    } else {
        return function (dispatch) {
            axios.post('/users/login', data)
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
    return {
        type: REMOVE_ALL_GIFT,
        payload: []
    }
}


//* Confirma un CURSO a la DB (COMPLETA)
export function confirmOrder(userCart) {
    return function (dispatch) {
        axios.post(`/order/${userCart.email}`, {
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
                console.log(user)
                dispatch(logear(user.email, user.uid, cart, false, user.displayName.split(' ')[0], user.displayName.split(' ')[user.displayName.split(' ').length - 1], user.photoURL))
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
        axios.post('/users/register', values);
    }
}

//*Crea nuevo usuario directo
export function createUser(user, enqueueSnackbar, save, saveError) {

    return async function (dispatch) {
        return await axios.post('/users/register', user)
            .then((response) => {
                dispatch({
                    type: NEW_USER,
                    payload: response.data
                })
                window.location.href = '/home';
                save()
            })
            .catch((error) => {
                saveError()
            });
            
            
            
    }
}

//*Actualizad el estado del video
export function updateInfoVideo(info) {
    const {
        email,
        ...others
    } = info
    return async function (dispatch) {
        return await axios.put(`/courses/${email}`, others)
            .then((response) => {
                dispatch({
                    type: SET_VIDEO,
                    payload: response.data
                })
            })
    }
}

export function logout() {
    axios.post(`/users/logout`)
    return({
        type: LOGOUT,
        payload: false
    })
}

//*Crea nueva review
export function createReview(review) {
    return async function (dispatch) {
        return await axios.post('/courses/newreview', review)
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
        axios.get('/admin/listdata')
            .then(res => dispatch({
                type: GET_COURSES_TO_APPROVE,
                payload: res.data
            }))
    }
}

export function approveCourse(id) {
    return async function (dispatch) {
        axios.put(`/admin/editcoursestate/active/${id}`)
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
        axios.put(`/admin/editcoursestate/rejected/${id}`, { motivo: motivo })
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
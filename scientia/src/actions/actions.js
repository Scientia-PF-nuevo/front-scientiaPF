import axios from 'axios';

import { GET_ALL_COURSES,
         GET_USERS,
         GET_ADMINS,
         GET_FAVORITE_COURSES,
         GET_COURSE_DETAILS,
         GET_GENRES_COURSES,
         SEARCH_BY_NAME,
         FILTER_BY,
         ORDER_BY, 
         LOGIN,
         LOGEADO} from './constants.js';


//* Trae todos los cursos (DB + API)
export function getAllCourses() {
    return function(dispatch) {
        return axios.get('http://localhost:3001/courses/')
        .then(res => {
            dispatch({type: GET_ALL_COURSES, payload: res.data})
        })
        .catch(err => {return err})
    }
}

//* Trae todos los cursos encontrados por nombre (QUERY: "name")
export function searchByName(name) {
    return function (dispatch) {
        return axios.get(`http://localhost:3001/courses?name=${name}`)
       
        .then(res => {

            dispatch({ type: SEARCH_BY_NAME, payload: res.data });
        })
        .catch(err => {return err})
    }
}

//* Trae los detalles del curso pedido por PARAMS por (params :ID)
export function getCourseDetail(id) {
    return function (dispatch) {
        axios.get(`http://localhost:3001/course/${id}`)
        .then(res => {
            
            dispatch({ type: GET_COURSE_DETAILS, payload: res.data });
        })
        .catch(err => {return err})

    }
}

//* Trae todos los cursos por generos
export function getGenresCourses(){
	return function(dispatch){
		axios.get(`http://localhost:3001/genres`)
        .then(res => {

            dispatch({ type: GET_GENRES_COURSES, payload: res.data });
        })
        .catch(err => {return err})
    }
}

//* Trae todos los usuarios de la DB
export function getUsers(){
	return function(dispatch){
		axios.get(`http://localhost:3001/users`)
        .then(res => {

            dispatch({ type: GET_USERS, payload: res.data });
        })
        .catch(err => {return err})
    }
}

//* Trae todos los administradores de la DB
export function getAdmins(){
	return function(dispatch){
		axios.get(`http://localhost:3001/admins`)
        .then(res => {

            dispatch({ type: GET_ADMINS, payload: res.data });
        })
        .catch(err => {return err})
    }
}

//* Trae todos los cursos favoritos por USUARIO (OJO!!!) de la DB
export function getFavoritesCourses(){
	return function(dispatch){
		axios.get(`http://localhost:3001/favorites`)
        .then(res => {

            dispatch({ type: GET_FAVORITE_COURSES, payload: res.data });
        })
        .catch(err => {return err})
    }
}

//* Ordenamiento
export function orderBy(order) {
    return function (dispatch) {
        dispatch({type: ORDER_BY, payload: order})
    }
}

//* Filtrado
export function filterBy(order) {
    return function (dispatch) {
        dispatch({type: FILTER_BY, payload: order})
    }
}

export function logear(data){
    return {
        type: LOGIN,
        payload: data
    }
}

export function logeado (){
    return {
        type: LOGEADO
    }
}
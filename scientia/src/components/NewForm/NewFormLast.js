import React, { useState, useEffect } from 'react';
import './NewFormLast.css'
import { useDispatch, useSelector } from 'react-redux';
import { setCourseToAprove, getGenresCourses } from '../../actions/actions';
import { Modal, Button } from 'react-bootstrap'

import barra6 from '../../images/barras/barra6.png';

export default function NewFormLast(props) {

    const [show, setShow] = useState(false)
    const [msg, setMsg] = useState('')
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true);

    useEffect(() => {
        getGenresCourses()
    }, [])
    const dispatch = useDispatch();
    const reduxer = useSelector(state => state.reducerForm)
    const user = useSelector(state => state.rootReducer.user);

    const [course, setCourse] = useState({
        name: reduxer.name,
        description: reduxer.description,
        price: reduxer.price,
        url: reduxer.url,
        urlVideo: reduxer.urlVideo,
        category: reduxer.category,
        email: user.email,
        languaje: reduxer.languaje,
        level: reduxer.level,
        numbersOfDiscounts: reduxer.numbersOfDiscounts,
        percentageDiscount: reduxer.percentageDiscount
    });


    function handleSubmit(e) {
        e.preventDefault();
        if (course.name === '' || course.name === undefined || course.name.length > 20) {
            setMsg('People should know the name of the course or name is more longer than 20 characters')
            return handleShow();
        }
        if (course.description === '' || course.description === undefined) {
            setMsg('People should know the description of the course')
            return handleShow();
        }
        if (course.price <= 0 || course.price === undefined) {
            setMsg('People should know the price of the course')
            return handleShow();
        }
        if (course.url === '' || course.url === undefined) {
            setMsg('People should know the url of the course')
            return handleShow();
        }
        if (course.category === '' || course.category === undefined) {
            setMsg('People should know the category of the course')
            return handleShow();
        }
        if(course.languaje === '' || course.languaje === undefined) {
            return alert ('People should know the lenguage of the course');
        }
        if(course.level === '' || course.level === undefined) {
            return alert ('People should know the experience required for the course');
        }
        dispatch(setCourseToAprove(course));

        // Redirect
        props.history.push('/home');
    };

    function handleBack(e) {
        e.preventDefault();
        props.history.goBack()
    }


    return (
        <div>
        <div className="title-form-div">
            <h1>CHECK DATA</h1>
        </div>
        <div className='containerBarra'>
            <img src={barra6} alt='barra de progreso'/>
        </div>
        <div className="form-div-container">
            <form className='formLast'>
                <div className='containerLastForm'>
                    <h3>Name</h3>
                    <h4>{course.name}</h4>
                </div>
                <br></br>
                <div className='containerLastForm'>
                    <h3>Description</h3>
                    <h4>{course.description}</h4>
                </div>
                <br></br>
                <div className='containerLastForm'>
                    <h3>Price</h3>
                    <h4>{course.price}</h4>
                </div>
                <br></br>
                <div className='containerLastForm'>
                    <h3>Imagen</h3>
                    <img src={course.url} alt='course image' />
                </div>
                <br></br>
                <div className='containerLastForm'>
                    <h3>UrlVideo</h3>
                    <h4>{course.urlVideo}</h4>
                </div>
                <br></br>
                <div className='containerLastForm'>
                    <h3>Category</h3>
                    <h4>{course.category}</h4>
                </div>
                <br></br>
                <div className='containerLastForm'>
                    <h3>Email</h3>
                    <h4>{course.email}</h4>
                </div>
                <br></br>
                <div className='containerLastForm'>
                    <h3>Languaje</h3>
                    <h4>{course.languaje}</h4>
                </div>
                <br></br>
                <div className='containerLastForm'>
                    <h3>Experience required</h3>
                    <h4>{course.level}</h4>
                </div>
                <br></br>
                <div className='containerLastForm'>
                    <h3>Amount of discounts</h3>
                    <h4>{course.numbersOfDiscounts}</h4>
                </div>
                <br></br>
                <div className='containerLastForm'>
                    <h3>Percentage of the discounts</h3>
                    <h4>{course.percentageDiscount}</h4>
                </div>
                <br></br>
                
            <div className='containerbtSub'>
                <input className="form-button" value='Submit' type='submit' onClick={e=>handleSubmit(e)}/>
                <button className="form-button" style={{backgroundColor:"#12351c"}} onClick={e=>handleBack(e)}>Back</button>
            </div>      

            </form>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Notificación</Modal.Title>
                </Modal.Header>
                <Modal.Body>{msg}</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Ok!
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
        </div>
    );
};
import React, { useState, useEffect } from 'react';
import './NewFormLast.css'
import { useDispatch, useSelector } from 'react-redux';
import { setCourseToAprove, clearReduxer, getGenresCourses } from '../../actions/actions';
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
            setMsg('The name of the course can´t be longer than 20 characters')
            return handleShow();
        }
        if (course.description === '' || course.description === undefined) {
            setMsg('The description of the course is mandatory')
            return handleShow();
        }
        if (course.price === undefined) {
            setMsg('The price of the course is mandatory')
            return handleShow();
        }
        if (course.url === '' || course.url === undefined) {
            setMsg('The url of the course is mandatory')
            return handleShow();
        }
        if (course.category === '' || course.category === undefined) {
            setMsg('The category of the course is mandatory')
            return handleShow();
        }
        if(course.languaje === '' || course.languaje === undefined) {
            return alert ('The lenguage of the course is mandatory');
        }
        if(course.level === '' || course.level === undefined) {
            return alert ('The experience required for the course is mandatory');
        }
        dispatch(setCourseToAprove(course));

        setCourse({
            name: '',
            description: '',
            price: 0,
            url: '',
            urlVideo: '',
            email: '',
            category: '',
            languaje: '',
            level: '',
            numbersOfDiscounts: 0,
            percentageDiscount: 0
        });

        dispatch(clearReduxer())

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
                    <h3>Image</h3>
                    <img src={course.url} alt='course image' />
                </div>
                <br></br>
                <div className='containerLastForm'>
                    <h3>URL Video</h3>
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
                    <h3>Language</h3>
                    <h4>{course.languaje}</h4>
                </div>
                <br></br>
                <div className='containerLastForm'>
                    <h3>Level required</h3>
                    <h4>{course.level}</h4>
                </div>
                <br></br>
                <div className='containerLastForm'>
                    <h3>Amount of discounts</h3>
                    <h4>{course.numbersOfDiscounts}</h4>
                </div>
                <br></br>
                <div className='containerLastForm'>
                    <h3>Percentage of the discount</h3>
                    <h4>{course.percentageDiscount}</h4>
                </div>
                <br></br>
                
            <div className='containerbtSub'>
                <button className="form-button" style={{backgroundColor:"#12351c"}} onClick={e=>handleBack(e)}>Back</button>
                <input className="form-button" value='Submit' type='submit' onClick={e=>handleSubmit(e)}/>
            </div>      

            </form>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Notification</Modal.Title>
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
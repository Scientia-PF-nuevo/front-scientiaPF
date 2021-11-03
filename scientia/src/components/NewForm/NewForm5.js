import React, { useState, useEffect } from 'react';
import './Form.css'
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
//import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { setCourseToAprove, getGenresCourses, setNewCourse } from '../../actions/actions';
import { Modal, Button } from 'react-bootstrap'

import barra5 from '../../images/barras/barra5.png';

export default function NewForm5(props) {

    const [show, setShow] = useState(false)
    const [msg, setMsg] = useState('')
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true);

    useEffect(() => {
        getGenresCourses()
    }, [])
    const dispatch = useDispatch();
    const categories = useSelector(state => state.rootReducer.coursesByGenre);
    const user = useSelector(state => state.rootReducer.user);
    const reduxer = useSelector(state => state.reducerForm)

    const [course, setCourse] = useState({
        numbersOfDiscounts: reduxer.numbersOfDiscounts !== '' || reduxer.numbersOfDiscounts || undefined ? reduxer.numbersOfDiscounts : 0,
        percentageDiscount: reduxer.percentageDiscount !== '' || reduxer.percentageDiscount || undefined ? reduxer.percentageDiscount : 0,
    });

    function handleChange(e) {
        e.preventDefault();
        setCourse({
            ...course,
            [e.target.name]: e.target.value
        });
    };

    function handleSubmit(e) {
        e.preventDefault();

        if (course.numbersOfDiscounts !== 0 && course.percentageDiscount === 0) {
            setMsg('People would not use your discount if percentage is under 0')
            return handleShow();
        }
        if (course.percentageDiscount !== 0 && course.numbersOfDiscounts === 0) {
            setMsg('People would not use your discount if the amount of discounts is under 0')
            return handleShow();
        }

        dispatch(setNewCourse(course));

        setCourse({
            numbersOfDiscounts: 0,
            percentageDiscount: 0
        });

        // Redirect
        props.history.push('/addCourses_step_final');
    };

    function handleBack(e) {
        e.preventDefault();
        props.history.goBack()
    }


    return (
        <div>
            <div className="title-form-div">
                <h1>Add Course</h1>
            </div>
            <div className='containerBarra'>
                <img src={barra5} alt='barra de progreso' />
            </div>
            <div className="form-div-container">
                <form>
                    <h1>DISCOUNTS?</h1>
                    <br></br>
                    <TextField required
                        style={{ marginBottom: "10px" }}
                        id="outlined-required"
                        label="Percentage"
                        // className='placeHolder' 
                        type="number"
                        value={course.percentageDiscount}
                        name="percentageDiscount"
                        // min = "1"
                        autocomplete="off"
                        onChange={e => handleChange(e)} />

                    <h4>AMOUNT OF DISCOUNTS</h4>
                    <br></br>
                    <TextField required
                        style={{ marginBottom: "10px" }}
                        id="outlined-required"
                        label="Amount"
                        // className='placeHolder' 
                        type="number"
                        value={course.numbersOfDiscounts}
                        name="numbersOfDiscounts"
                        // min = "1"
                        autocomplete="off"
                        onChange={e => handleChange(e)} />


                    <div className='containerbtSub'>
                        <input className="form-button" value='Next' type='submit' onClick={e => handleSubmit(e)} />
                    </div>
                    <div className='containerbtSub'>
                        <button className="form-button" onClick={e => handleBack(e)}>Back</button>
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
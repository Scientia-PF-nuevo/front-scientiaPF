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

    const [course, setCourse] = useState({
        amount: 0,
        percentage: 0
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

        dispatch(setNewCourse(course));

        setCourse({
            amount: 0,
            percentage: 0
        });

        // Redirect
        props.history.push('/newFormLast');
    };

    return (
        <div>
        <div className="title-form-div">
            <h1>You wanna add a discount?</h1>
        </div>
        <div className='containerBarra'>
            <img src={barra5} alt='barra de progreso'/>
        </div>
        <div className="form-div-container">
            <form>
                <h1>IF NOT, SKIP THIS STEP</h1>
                <br></br>
                <TextField required 
                style={{marginBottom:"10px"}}
                id="outlined-required"
                label="Percentage"
                // className='placeHolder' 
                type="number" 
                // value={course.price}
                name="percentage" 
                // min = "1"
                autocomplete="off"
                onChange={e => handleChange(e)} />

                <h4>AMOUNT OF DISCOUNTS</h4>
                <br></br>
                <TextField required 
                style={{marginBottom:"10px"}}
                id="outlined-required"
                label="amount"
                // className='placeHolder' 
                type="number" 
                // value={course.price}
                name="amount" 
                // min = "1"
                autocomplete="off"
                onChange={e => handleChange(e)} />


            <div className='containerbtSub'>
                <input className="form-button" value='Next' type='submit' onClick={e=>handleSubmit(e)}/>
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
import React, { useState, useEffect } from 'react';
import './Form.css'
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import { getGenresCourses, setNewCourse } from '../../actions/actions';
import { Modal, Button } from 'react-bootstrap'

import barra2 from '../../images/barras/barra2.png';

export default function NewForm2(props) {

    const [show, setShow] = useState(false)
    const [msg, setMsg] = useState('')
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true);

    useEffect(() => {
        getGenresCourses()
    }, [])
    const dispatch = useDispatch();

    const [course, setCourse] = useState({
        description: '',
    });

    function handleChange(e) {
        e.preventDefault();
        setCourse({
            ...course,
            description: e.target.value
        });
    };

    function handleSubmit(e) {
        e.preventDefault();
        if (course.description === '' || course.description === undefined && course.description.length < 20) {
            setMsg('People should know the description of the course or description is more smallest than 20 characters')
            return handleShow();
        }

        dispatch(setNewCourse(course));

        setCourse({
            description: '',
        });

        // Redirect
        props.history.push('/newForm3');
    };

    return (
        <div>
        <div className="title-form-div">
            <h1>Add Description</h1>
        </div>
        <div className='containerBarra'>
            <img src={barra2} alt='barra de progreso'/>
        </div>
        <div className="form-div-container">
            <form>
                <h1>ADD NEW DESCRPTION</h1>
                <br></br>
                <TextField required 
                style={{marginBottom:"10px"}}
                id="outlined-required"
                label="DESCRIPTION"
                value={course.description}
                name="description" 
                autocomplete="off"
                onChange={e => handleChange(e)} />

            <div className='containerbtSub'>
                <input className="form-button" type='submit' onClick={e=>handleSubmit(e)}/>
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
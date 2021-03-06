import React, { useState, useEffect } from 'react';
import './Form.css'
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import { getGenresCourses, setNewCourse } from '../../actions/actions';
import { Modal, Button } from 'react-bootstrap'
import barra1 from '../../images/barras/barra1.png';

export default function NewForm(props) {

    const [show, setShow] = useState(false)
    const [msg, setMsg] = useState('')
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true);
    
    useEffect(() => {
        getGenresCourses()
    }, [])
    const dispatch = useDispatch();
    
    const reduxer = useSelector(state => state.reducerForm)
    const [course, setCourse] = useState({
        name: reduxer.name !== '' || reduxer.name || undefined ? reduxer.name : '',
    });

    function handleChange(e) {
        e.preventDefault();
        setCourse({
            ...course,
            name: e.target.value
        });
    };

    function handleSubmit(e) {
        e.preventDefault();
        if (course.name === '' || course.name.length > 20) {
            setMsg('The name must be longer than 20 characters')
            return handleShow();
        }

        dispatch(setNewCourse(course));

        setCourse({
            name: '',
        });

        // Redirect
        props.history.push('/addCourses_step_2');
    };

    return (
        <div>
        <div className="title-form-div">
            <h1>Add Course</h1>
        </div>
        <div className='containerBarra'>
            <img src={barra1} alt='barra de progreso'/>
        </div>
        <div className="form-div-container">
            <form>
                <h1>ADD NEW COURSE</h1>
                <br></br>
                <TextField required
                    // className='placeHolder'
                    // type="text" 
                    style={{ marginBottom: "10px" }}
                    id="outlined-required"
                    label="COURSE NAME"
                    value={course.name}
                    name="name" 
                    autocomplete="off"
                    onChange={e => handleChange(e)} 
                />

            <div className='containerbtSub'>
                <input className="form-button" value='Next' type='submit' onClick={e=>handleSubmit(e)}/>
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
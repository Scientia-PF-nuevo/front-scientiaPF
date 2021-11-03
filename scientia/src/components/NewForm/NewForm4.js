import React, { useState, useEffect } from 'react';
import './Form.css'
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
//import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { setCourseToAprove, getGenresCourses, setNewCourse } from '../../actions/actions';
import { Modal, Button } from 'react-bootstrap'

import barra4 from '../../images/barras/barra4.png';

export default function NewForm4(props) {

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
        url: reduxer.url !== '' || reduxer.url || undefined ? reduxer.url : '',
        urlVideo: reduxer.urlVideo !== '' || reduxer.urlVideo || undefined ? reduxer.urlVideo : '',
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
        if (course.url === '' || course.url === undefined) {
            setMsg('People should know the url image of the course')
            return handleShow();
        }
        if (course.urlVideo === '' || course.urlVideo === undefined) {
            setMsg('People should know the url video of the course')
            return handleShow();
        }
        dispatch(setNewCourse(course));

        setCourse({
            url: '',
            urlVideo: '',
        });

        // Redirect
        props.history.push('/addCourses_step_5');
    };


    function handleBack(e) {
        e.preventDefault();
        props.history.goBack()
    }


    return (
        <div>
        <div className="title-form-div">
            <h1>Add url</h1>
        </div>
        <div className='containerBarra'>
            <img src={barra4} alt='barra de progreso'/>
        </div>
        <div className="form-div-container">
            <form>
                <h1>URL IMAGE</h1>
                <br></br>

                <TextField required 
                style={{marginBottom:"10px"}}
                id="outlined-required"
                label="URL IMAGE"
                // defaultValue="Hello World"
                // className='placeHolder' 
                type="text" 
                value={course.url}
                placeholder='Course url...'
                name="url" 
                autocomplete="off"
                onChange={e => handleChange(e)} />

                <h1>URL VIDEO</h1>
                <br></br>

               <TextField required 
                style={{marginBottom:"10px"}}
                id="outlined-required"
                label="URL VIDEO"
                // defaultValue="Hello World"
                // className='placeHolder' 
                type="category" 
                value={course.urlVideo}
                placeholder='Course url...'
                name="urlVideo" 
                autocomplete="off"
                onChange={e => handleChange(e)} /> 


            <div className='containerbtSub'>
                <button className="form-button" style={{backgroundColor:"#12351c"}} onClick={e=>handleBack(e)}>Back</button>
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
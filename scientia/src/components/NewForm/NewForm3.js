import React, { useState, useEffect } from 'react';
import './Form.css'
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
//import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { setCourseToAprove, getGenresCourses, setNewCourse } from '../../actions/actions';
import { Modal, Button } from 'react-bootstrap'

import barra3 from '../../images/barras/barra3.png';

export default function NewForm3(props) {

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
        category: '',
        languaje: '',
        level: '',
        price: 0,
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
        if (course.category === '' || course.category === undefined && course.category.length < 20) {
            setMsg('People should know the name of the course or name is more longer than 20 characters')
            return handleShow();
        }
        if(course.languaje === '' || course.languaje === undefined) {
            return alert ('People should know the lenguage of the course');
        }
        if (course.price <= 0 || course.price === undefined) {
            setMsg('People should know the price of the course')
            return handleShow();
        }
        if(course.level === '' || course.level === undefined) {
            return alert ('People should know the experience required for the course');
        }

        dispatch(setNewCourse(course));

        setCourse({
            description: '',
            languaje: '',
            level: '',
            price: 0,
        });

        // Redirect
        props.history.push('/newForm4');
    };

    return (
        <div>
        <div className="title-form-div">
            <h1>Add Category, experience and lenguage</h1>
        </div>
        <div className='containerBarra'>
            <img src={barra3} alt='barra de progreso'/>
        </div>
        <div className="form-div-container">
            <form>
                <h1>ADD THE CATEGORY</h1>
                <br></br>
                 
              {  <select className='selector'  name="category" value={course.category} onChange={handleChange} >
                 <option defaultValue="selected"></option>
                {categories ? 
                    categories.map((a)=>{
                    return (
                    <option> { a.name } </option>)}
                            
                           
                    
                ) : 
                    null    
                    }
                </select>}

                <br></br>
                <h4>THE LENGUAGE OF THE COURSE IS...</h4>
                <br></br>
                <select className='selector' name="languaje" value={course.languaje} onChange={handleChange} >
                        <option defaultValue="selected"></option>
                        <option name="languaje"> spanish </option>
                        <option name="languaje"> english </option>
                        <option name="languaje"> others </option>
                    </select>

                <br></br>
                <h4>THE COURSE IS FOR...</h4>
                <select className='selector' placeholder='Experience required...' name="level" value={course.level} onChange={handleChange} >
                        <option defaultValue="selected"></option>
                        <option name="level"> begginer </option>
                        <option name="level"> middle </option>
                        <option name="level"> expert </option>
                    </select>

                <br></br>
                <h4>THE PRICE IS...</h4>
                <br></br>
                <TextField required
                    style={{ marginBottom: "10px" }}
                    id="outlined-required"
                    label="PRICE (Dollars)"
                    // defaultValue="Hello World"
                    // className='placeHolder' 
                    type="number"
                    // value={course.price}
                    name="price"
                    // min = "1"
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
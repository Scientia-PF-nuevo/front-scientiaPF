import React, { useState, useEffect } from 'react';
import './Form.css'
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
//import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { setCourseToAprove, getGenresCourses } from '../../actions/actions';
import { Modal, Button } from 'react-bootstrap'

export default function Form(props) {

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
        name: '',
        description: '',
        price: 0,
        url: '',
        urlVideo: '',
        category: '',
        email: user.email,
        leng: '',
        dif: '',
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
        if (course.name === '' || course.name === undefined && course.name.length > 20) {
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
        if(course.leng === '' || course.leng === undefined) {
            return alert ('People should know the lenguage of the course');
        }
        if(course.dif === '' || course.dif === undefined) {
            return alert ('People should know the experience required for the course');
        }
        dispatch(setCourseToAprove(course));

        setCourse({
            name: '',
            description: '',
            price: 0,
            url: '',

            urlVideo:'',    
            category: '',
            leng: '',
            dif: '',
            amount: 0,
            percentage: 0

        });

        // Redirect
        props.history.push('/home');
    };

    return (
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
                    // placeholder='Nombre...'

                // defaultValue="Hello World"
                name="name" 
                autocomplete="off"
                onChange={e => handleChange(e)} />
                
                <TextField required 
                style={{marginBottom:"10px"}}
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

                <TextField required 
                // className='placeHolder' 
                // type="text"
                style={{marginBottom:"10px"}}
                id="outlined-required"
                label="DESCRIPTION"
                // defaultValue="Hello World"
                value={course.description}
                // placeholder='Course description...'
                name="description" 
                autocomplete="off"
                onChange={e => handleChange(e)} />

                {/* <label>Course price USD:</label> */}

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

                <select className='selector' name="leng" value={course.leng} onChange={handleChange} >
                 <option defaultValue="selected"></option>
                 <option> Español </option>
                 <option> English </option>
                 <option> Others </option>
                </select>

                <select className='selector' placeholder='Experience required...' name="dif" value={course.dif} onChange={handleChange} >
                <option defaultValue="selected"></option>
                 <option> Beginner </option>
                 <option> Intermediate </option>
                 <option> Advance </option>
                </select>

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
    );
};
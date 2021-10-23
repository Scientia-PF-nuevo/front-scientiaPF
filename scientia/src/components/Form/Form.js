import React, { useState, useEffect } from 'react';
import './Form.css'
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { setCourseToAprove, getGenresCourses } from '../../actions/actions';

export default function Form (props) {

    useEffect(() => {
        getGenresCourses()
    }, [])
    const dispatch = useDispatch();
    const categories = useSelector(state => state.rootReducer.coursesByGenre);
    //console.log(categories);

    const [course, setCourse] = useState({
        name: '',
        description: '',
        price: 0,
        url: '',
        category: ''
    });

    function handleChange (e) {
        e.preventDefault();
        setCourse ({
            ...course,
            [e.target.name]: e.target.value
        });
    };

    function handleSubmit (e) {
        e.preventDefault();
        if(course.name === '' || course.name === undefined) {
            return alert ('People should know the name of the course');
        }
        if(course.name.length <= 25) {
            return alert ('The Name cannot be longer than 25 characters');
        }
        if(course.description === '' || course.description === undefined) {
            return alert ('People should know the description of the course');
        }
        if(course.price <= 0 || course.price === undefined ) {
            return alert ('People should know the price of the course');
        }
        if(course.url === '' || course.url === undefined) {
            return alert ('People should know the url of the course');
        }
        if(course.category === '' || course.category === undefined) {
            return alert ('People should know the category of the course');
        }
        dispatch(setCourseToAprove(course));
        alert('Course created, waiting for the admin approval');
        setCourse({
            name: '',
            description: '',
            price: 0,
            url: '',
            urlVideo:'',
            category: ''
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
                style={{marginBottom:"10px"}}
                id="outlined-required"
                label="COURSE NAME"
                value={course.name}
                    // placeholder='Nombre...'
                defaultValue="Hello World"
                name="name" 
                autocomplete="off"
                onChange={e => handleChange(e)} />
                
                <TextField required 
                style={{marginBottom:"10px"}}
                id="outlined-required"
                label="Price (Dollars)"
                defaultValue="Hello World"
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
                label="URL IMAGE"
                defaultValue="Hello World"
                value={course.description}
                // placeholder='Course description...'
                name="description" 
                autocomplete="off"
                onChange={e => handleChange(e)} />

                {/* <label>Course price USD:</label> */}

                <TextField required 
                style={{marginBottom:"10px"}}
                id="outlined-required"
                label="URL VIDEO"
                defaultValue="Hello World"
                // className='placeHolder' 
                type="text" 
                value={course.url}
                placeholder='Course url...'
                name="url" 
                autocomplete="off"
                onChange={e => handleChange(e)} />

                {/* <TextField required 
                   style={{marginBottom:"10px"}}
                id="outlined-required"
                label="CATEGORY"
                defaultValue="Hello World"
                // className='placeHolder' 
                type="category" 
                value={course.category}
                placeholder='Course category...'
                name="category" 
                autocomplete="off"
                onChange={e => handleChange(e)} /> */}

              {  <select name="category" value={course.category} onChange={handleChange} >
                 <option defaultValue="selected"></option>
                {categories ? 
                    categories.map((a)=>{
                    console.log(a.name);
                    
                   return (
                    <option> { a.name } </option>)}
                            
                           
                    
                ) : 
                    null    
                    }
                </select>}

            <div className='containerbtSub'>
                <input className="form-button" type='submit' onClick={e=>handleSubmit(e)}/>
            </div>
            </form>


        </div>
    );
};
import React, { useState } from 'react';
import './Form.css'
import { useDispatch } from 'react-redux';
import { setCourseToAprove } from '../../actions/actions';

export default function Form (props) {

    const dispatch = useDispatch();

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
            category: ''
        });

        // Redirect
        props.history.push('/home');
    };

    return (
        <div className="form-div-container">

            <form>
                <input required 
                className='placeHolder' 
                type="text" 
                value={course.name}
                placeholder='Course name...'
                name="name" 
                autocomplete="off"
                onChange={e => handleChange(e)} />
                
                <input required 
                className='placeHolder' 
                type="text" 
                value={course.description}
                placeholder='Course description...'
                name="description" 
                autocomplete="off"
                onChange={e => handleChange(e)} />

                <label>Course price USD:</label>
                <input required 
                className='placeHolder' 
                type="number" 
                value={course.price}
                name="price" 
                min = "1"
                autocomplete="off"
                onChange={e => handleChange(e)} />

                <input required 
                className='placeHolder' 
                type="text" 
                value={course.url}
                placeholder='Course url...'
                name="url" 
                autocomplete="off"
                onChange={e => handleChange(e)} />

                <input required 
                className='placeHolder' 
                type="category" 
                value={course.category}
                placeholder='Course category...'
                name="category" 
                autocomplete="off"
                onChange={e => handleChange(e)} />
            </form>

            <div className='containerbtSub'>
                <input className='btnSub' type='submit' onClick={e=>handleSubmit(e)}/>
            </div>

        </div>
    );
};
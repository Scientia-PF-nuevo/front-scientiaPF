import React, { useState, useEffect } from 'react';
import './Form.css'
import { useDispatch, useSelector } from 'react-redux';
import {  getGenresCourses, setNewCourse } from '../../actions/actions';
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
    // const categories = useSelector(state => state.rootReducer.coursesByGenre);
    // const user = useSelector(state => state.rootReducer.user);
    const reduxer = useSelector(state => state.reducerForm)

    const [course, setCourse] = useState({
        numbersOfDiscounts: reduxer.numbersOfDiscounts !== '' || reduxer.numbersOfDiscounts || undefined ? reduxer.numbersOfDiscounts : 0,
        percentageDiscount: reduxer.percentageDiscount !== '' || reduxer.percentageDiscount || undefined ? reduxer.percentageDiscount : 0,
    });

    function handleChange(e) {
        e.preventDefault();
        setCourse({
            ...course,
            [e.target.name]: parseInt(e.target.value)
        });
    };

    function handleSubmit(e) {
        e.preventDefault();
        if (course.numbersOfDiscounts !== 0 && course.percentageDiscount === 0) {
            setMsg('Do not apply a discount if percentage is under 0')
            return handleShow();
        }
        if (course.percentageDiscount !== 0 && course.numbersOfDiscounts === 0) {
            setMsg('Do not apply discount if the amount of discounts is under 0')
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
            <h1>Discount</h1>
        </div>
        <div className='containerBarra'>
            <img src={barra5} alt='barra de progreso'/>
        </div>
        <div className="form-div-container">
            <form className='formLast'>
                <h1>Do you wanna add a discount?</h1>
                <br></br>
                <select className='selector' placeholder='Percentage...' name="percentageDiscount" value={course.percentageDiscount} onChange={handleChange} >
                    <option defaultValue="selected">0%</option>
                    <option name="percentageDiscount" value={10}> 10% </option>
                    <option name="percentageDiscount" value={15}> 15% </option>
                    <option name="percentageDiscount" value={20}> 20% </option>
                    <option name="percentageDiscount" value={25}> 25% </option>
                    <option name="percentageDiscount" value={30}> 30% </option>
                    <option name="percentageDiscount" value={35}> 35% </option>
                </select>

                <h4>Amount of discounts</h4>
                <br></br>
                <select className='selector' placeholder='Quantity...' name="numbersOfDiscounts" value={course.numbersOfDiscounts} onChange={handleChange} >
                    <option defaultValue="selected">0</option>
                    <option name="numbersOfDiscounts" value={5}> 5 </option>
                    <option name="numbersOfDiscounts" value={10}> 10 </option>
                    <option name="numbersOfDiscounts" value={20}> 20 </option>
                    <option name="numbersOfDiscounts" value={25}> 25 </option>
                    <option name="numbersOfDiscounts" value={30}> 30 </option>
                    <option name="numbersOfDiscounts" value={35}> 35 </option>
                    <option name="numbersOfDiscounts" value={40}> 40 </option>
                    <option name="numbersOfDiscounts" value={50}> 50 </option>
                </select>


            <div className='containerbtSub'>
                <button className="form-button" style={{backgroundColor:"#12351c"}} onClick={e=>handleBack(e)}>Back</button>
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
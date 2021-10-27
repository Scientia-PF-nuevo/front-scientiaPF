import React, { useState } from "react";
import "react-credit-cards/es/styles-compiled.css";
import useMercadoPago from "./useMercadoPago";
import Card from "react-credit-cards";
import s from './tarjeta.module.css'
import { Modal, Button, Spinner } from 'react-bootstrap'
import { Redirect } from "react-router-dom"
import { clearCartToPay, confirmOrder } from "../../actions/actions";
import { connect, useSelector } from "react-redux";


const INITIAL_STATE = {
    cvc: "",
    cardExpirationMonth: "",
    cardExpirationYear: "",
    focus: "cardNumber",
    cardholderName: "",
    cardNumber: "",
    issuer: "",
};

function MercadoPagoForm(props) {
    const [state, setState] = useState(INITIAL_STATE);
    const [show, setShow] = useState(false);
    const [redir, setRedir] = useState(false)
    const [msg, setMsg] = useState('')
    const [showMsg, setShowMsg] = useState(false)

    // const cart = useSelector(state => state.rootReducer.cartToPay)

    const handleClose = () => {
        setShow(false)
        setRedir(true)
    };
    const handleShow = () => {
        setShow(true)
        setTimeout(() => {
            setShowMsg(true)
            setShow(false)
        }, 5000);
    };

    const resultPayment = useMercadoPago(props.cartToPay, props.user.email);
    console.log('respuesta: ', resultPayment)
    const handleInputChange = (e) => {
        setState({
            ...state,
            [e.target.dataset.name || e.target.name]: e.target.value,
        });
    };

    function mensajeModel() {
        if (msg === '') {
            if (resultPayment) {
                clearCartToPay()
                setMsg(`Pagado con éxito!`)
            }
            return <Spinner animation="border" variant="primary" />
        } else {
            return msg
        }
    }

    const handleInputFocus = (e) => {
        setState({ ...state, focus: e.target.dataset.name || e.target.name });
    };

    return (
        <div className={s.container}>
            <Card
                cvc={state.cvc}
                expiry={state.cardExpirationMonth + state.cardExpirationYear}
                name={state.cardholderName}
                number={state.cardNumber}
                focused={state.focus}
                brand={state.issuer}
            />

            <form className={s.form} id="form-checkout">
                <div className={s.formControl}>
                    <input
                        maxLength="19"
                        className={s.input}
                        type="number"
                        name="cardNumber"
                        id="form-checkout__cardNumber"
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                    />
                </div>
                <div className={s.formControl}>
                    <input
                        maxLength="2"
                        className={s.input}
                        type="tel"
                        name="cardExpirationMonth"
                        id="form-checkout__cardExpirationMonth"
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                    />
                    <input
                        maxLength="2"
                        className={s.input}
                        type="number"
                        name="cardExpirationYear"
                        id="form-checkout__cardExpirationYear"
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                    />
                    <input
                        maxLength="4"
                        className={s.input}
                        type="number"
                        name="cvc"
                        id="form-checkout__securityCode"
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                    />
                </div>
                <div className={s.formControl}>
                    <input
                        className={s.input}
                        type="text"
                        name="cardholderName"
                        id="form-checkout__cardholderName"
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                    />
                    <input
                        className={s.input}
                        type="email"
                        name="cardholderEmail"
                        id="form-checkout__cardholderEmail"
                        onFocus={handleInputFocus}
                    />
                </div>
                <div className={s.formControl}>
                    <select
                        className={s.select}
                        name="issuer"
                        id="form-checkout__issuer"
                        on
                    ></select>
                    <select
                        className={s.select}
                        name="identificationType"
                        id="form-checkout__identificationType"
                    ></select>
                </div>
                <div className={s.formControl}>
                    <input
                        maxLength="8"
                        className={s.input}
                        type="number"
                        name="identificationNumber"
                        id="form-checkout__identificationNumber"
                    />
                </div>
                <div className={s.formControl}>
                    <select
                        className={s.select}
                        name="installments"
                        id="form-checkout__installments"
                    ></select>
                </div>
                <div className={s.formControl}>
                    <button className={s.button} type="submit" id="form-checkout__submit" onClick={handleShow}>
                        Pagar
                    </button>
                </div>
                {showMsg ?
                    resultPayment ?
                        <p>{msg}</p>
                        :
                        <p>Hubo un error con el pago</p>
                    :
                    <></>
                }
            </form>
            {
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Procesando el pago</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{mensajeModel()}</Modal.Body>
                    <Modal.Footer>
                        {
                            (msg !== '') &&
                            <Button variant="primary" onClick={handleClose}>
                                Ok!
                            </Button>}
                    </Modal.Footer>
                </Modal>
            }
            {
                redir && <Redirect to="/home" />
            }
        </div>
    );
}

function mapStateToProps(state) {
    return {
        cartToPay: state.rootReducer.cartToPay,
        user: state.rootReducer.user,
    }
}

export default connect(mapStateToProps, { confirmOrder, clearCartToPay })(MercadoPagoForm)
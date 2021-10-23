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

    // const cart = useSelector(state => state.rootReducer.cartToPay)

    const handleClose = () => {
        setShow(false)
        setRedir(true)
    };
    const handleShow = () => setShow(true);

    const resultPayment = useMercadoPago(props.cartToPay, props.user.email);

    const handleInputChange = (e) => {
        setState({
            ...state,
            [e.target.dataset.name || e.target.name]: e.target.value,
        });
    };

    function mensajeModel() {
        if (resultPayment) {
            clearCartToPay()
            return `Pagado con éxito!`
        }
        return <Spinner animation="border" variant="primary" />
    }

    const handleInputFocus = (e) => {
        setState({ ...state, focus: e.target.dataset.name || e.target.name });
    };

    return (
        <div className="container">
            <Card
                cvc={state.cvc}
                expiry={state.cardExpirationMonth + state.cardExpirationYear}
                name={state.cardholderName}
                number={state.cardNumber}
                focused={state.focus}
                brand={state.issuer}
            />

            <form id="form-checkout">
                <div className="form-control">
                    <input
                        type="tel"
                        name="cardNumber"
                        id="form-checkout__cardNumber"
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                    />
                </div>
                <div className="form-control">
                    <input
                        type="tel"
                        name="cardExpirationMonth"
                        id="form-checkout__cardExpirationMonth"
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                    />
                    <input
                        type="tel"
                        name="cardExpirationYear"
                        id="form-checkout__cardExpirationYear"
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                    />
                    <input
                        type="tel"
                        name="cvc"
                        id="form-checkout__securityCode"
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                    />
                </div>
                <div className="form-control">
                    <input
                        type="text"
                        name="cardholderName"
                        id="form-checkout__cardholderName"
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                    />
                    <input
                        type="email"
                        name="cardholderEmail"
                        id="form-checkout__cardholderEmail"
                        onFocus={handleInputFocus}
                    />
                </div>
                <div className="form-control">
                    <select
                        name="issuer"
                        id="form-checkout__issuer"
                        on
                    ></select>
                    <select
                        name="identificationType"
                        id="form-checkout__identificationType"
                    ></select>
                </div>
                <div className="form-control">
                    <input
                        type="text"
                        name="identificationNumber"
                        id="form-checkout__identificationNumber"
                    />
                </div>
                <div className="form-control">
                    <select
                        name="installments"
                        id="form-checkout__installments"
                    ></select>
                </div>
                <div className="form-control">
                    {/* {resultPayment ?
                        <p> Pagado con éxito!</p>
                        : */}
                    <button type="submit" id="form-checkout__submit" onClick={handleShow}>
                        Pagar
                    </button>
                    {/* } */}
                </div>
                {/* <progress value="0" className="progress-bar">
                    Cargando...
                </progress> */}
            </form>
            {
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Inicio de Sesión</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{mensajeModel()}</Modal.Body>
                    <Modal.Footer>
                        {
                            resultPayment &&
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
import React, { useState } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from './../../actions/actions'
import s from './login.module.css'
import { bindActionCreators } from 'redux';
import { Modal, Button } from 'react-bootstrap'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";


function Login(props) {

    function autenticarConGoogle() {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                props.logear(user)
                props.logeado()
                handleShow()
            }).catch((error) => {
                const errorCode = error.code;
                return errorCode
            });
    }

    const [state, setState] = useState({ email: '', password: '', remember: false })
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function handleChange(e) {
        e.preventDefault()
        if (e.target.name === 'remember') {
            setState({ ...state, remember: e.target.checked })
        } else {
            setState({ ...state, [e.target.name]: e.target.value })
        }
    }

    async function handleSubmit(e) {
        e.preventDefault()
        await props.logear(state)
        handleShow()
    }

    function submitGoogle(e) {
        e.preventDefault()
        autenticarConGoogle();
    }

    return (
        <>
            <div className={s.contenedorFormLogin}>
                <form>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Correo electrónico</label>
                        <input name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
                        <input name="password" type="password" className="form-control" id="exampleInputPassword1" onChange={handleChange} />
                    </div>
                    <div className="mb-3 form-check">
                        <input name="remember" type="checkbox" className="form-check-input" id="exampleCheck1" onChange={handleChange} />
                        <label className="form-check-label" htmlFor="exampleCheck1">Permanecer logeado</label>
                    </div>
                    <div className={s.botones}>
                        <button onClick={handleSubmit} type="submit" className="btn btn-primary btn-lg">Entrar</button>
                        <button onClick={submitGoogle} type="submit" className="btn btn-outline-primary btn-lg">Entrar con Google</button>
                    </div>
                </form>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Inicio de Sesión</Modal.Title>
                </Modal.Header>
                <Modal.Body>{props.user ? `Bienvenido ${props.user.displayName}!` : 'Revisa tus credenciales'}</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Ok!
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch)
}

function mapStateToProps(state) {
    return {
        login: state.login,
        user: state.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)

import React, { useState, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import * as actionCreators from './../../actions/actions'
import { register } from './../../actions/actions'
import s from './login.module.css'
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom'
import { Modal, Button, Spinner } from 'react-bootstrap'
import { Redirect } from "react-router-dom"

function Login(props) {

    const [state, setState] = useState({ email: '', password: '', remember: false })
    const [show, setShow] = useState(false);
    const [redir, setRedir] = useState(false)
    const [logeo, setLogeo] = useState('')
    const dispatch = useDispatch();
    const userLoggin = props.user

    useEffect(() => {
        props.getUsers();
    }, [])

    const handleClose = () => {
        if (logeo === 'Bienvenido!') {
            let exist = false;
            const checking = () => {
                props.users.forEach(user => {
                    if (user.email === userLoggin.email) {
                        exist = true;
                    }
                });
                if (!exist) {
                    const obj = {
                        "name": userLoggin.name,
                        "lastName": userLoggin.email,
                        "email": userLoggin.email,
                        "password": userLoggin.token
                    }

                    dispatch(register(userLoggin))
                    setShow(false)
                    setRedir(true)

                } else {
                    setShow(false)
                    setRedir(true)
                }
            }
            checking()
        }
        
        if (props.user.displayName !== '' && props.user.displayName){
            setRedir(true)
        }
        setShow(false)
    };

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
        let filtrado = props.users.filter(el => el.email === state.email)
        if (filtrado.length > 0) {
            if (filtrado[0].password === state.password) {
                setLogeo(`Bienvenido!`);
                let nombreCompleto = (filtrado[0].firstName + ' ' + filtrado[0].lastName)
                let usuario = { email: filtrado[0].email, displayName: nombreCompleto, photoURL: '', remember: state.remember }
                await props.logear(usuario)
            } else {
                setLogeo(`Contraseña Incorrecta!`);
                setRedir(false)
            }
        } else {
            setLogeo(`Email Incorrecto!`);
            setRedir(false)
        }
        handleShow()
    }

    async function submitGoogle(e) {
        e.preventDefault()
        props.autenticarConGoogle()
        let google = true
        handleShow(google)
    }

    function mensajeModel() {
        if (props.user.displayName) {
            return `Bienvenido ${props.user.displayName}!`
        }
        if (logeo) {
            return logeo
        }
        return <Spinner animation="border" variant="primary" />
    }

    return (
        <>
            <div className={s.contenedorFormLogin}>
                <form>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">E-mail</label>
                        <input name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input name="password" type="password" className="form-control" id="exampleInputPassword1" onChange={handleChange} />
                    </div>
                    <div className="mb-3 form-check">
                        <input name="remember" type="checkbox" className="form-check-input" id="exampleCheck1" onChange={handleChange} />
                        <label className="form-check-label" htmlFor="exampleCheck1">Keep Login</label>
                    </div>
                    <div className={s.botones}>
                        <button onClick={state.email && state.password && handleSubmit} disabled={!state.email || !state.password} type="submit" className="btn btn-primary btn-lg">Enter</button>
                        <button onClick={submitGoogle} type="submit" className="btn btn-outline-primary btn-lg">Login with Google</button>
                        <Link to='/signup' className="btn btn-outline-primary btn-lg">Register</Link>
                    </div>
                </form>
            </div>
            {redir ?
                <Redirect to="/home" />
                :
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Inicio de Sesión</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{mensajeModel()}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleClose}>
                            Ok!
                        </Button>
                    </Modal.Footer>
                </Modal>
            }
        </>
    )
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch)
}

function mapStateToProps(state) {
    return {
        login: state.rootReducer.login,
        user: state.rootReducer.user,
        users: state.rootReducer.users
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)

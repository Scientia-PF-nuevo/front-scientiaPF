import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from './../../actions/actions'
import s from './login.module.css'
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import { Redirect } from "react-router-dom"
import { useSnackbar } from 'notistack';
import Slide from '@material-ui/core/Slide';

function Login(props) {

    const [state, setState] = useState({ email: '', password: '', remember: false })
    const [redir, setRedir] = useState(false)

    const { enqueueSnackbar } = useSnackbar();

    const errorLogeo = () => {
        enqueueSnackbar('Credenciales erroneas', {
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'left',
            },
            TransitionComponent: Slide,
            variant: 'error',
        })
    }

    useEffect(() => {
        if (props.user[0] === 'C') {
            errorLogeo()
        } else if (props.user.firstName !== '' && props.user.firstName) {
            setRedir(true)
            props.iniciarSaludo()
        }
    }, [props.user])

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
        let normal = true
        props.logear(state.email, state.password, props.cart, normal)

    }

    async function submitGoogle(e) {
        e.preventDefault()
        props.autenticarConGoogle(props.cart)
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
                    {/* <div className="mb-3 form-check">
                        <input name="remember" type="checkbox" className="form-check-input" id="exampleCheck1" onChange={handleChange} />
                        <label className="form-check-label" htmlFor="exampleCheck1">Keep Login</label>
                    </div> */}
                    <div className={s.botones}>
                        <button onClick={state.email && state.password && handleSubmit} disabled={!state.email || !state.password} type="submit" className="btn btn-primary btn-lg">Enter</button>
                        <button onClick={submitGoogle} type="submit" className="btn btn-outline-primary btn-lg">Login with Google</button>
                        <Link to='/signup' className="btn btn-outline-primary btn-lg">Register</Link>
                    </div>
                </form>
            </div>
            {redir && <Redirect to="/home" />}
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
        cart: state.rootReducer.cart
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)

import { connect } from 'react-redux'
import * as actionCreators from './../../actions/actions'
import { bindActionCreators } from 'redux';
import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Button, Modal } from 'react-bootstrap';
import ModalVideo from 'react-modal-video'
import 'react-modal-video/scss/modal-video.scss'
import s from './passCourses.module.css'
import { Link } from 'react-router-dom';
//localhost:3001/admin/listprops.coursesToApprove
//localhost:3001/admin/editcoursestate
//rejected
//active

function PassCourses(props) {
    useEffect(() => {
        props.getCrousesToApprove()
    }, [])
    console.log(props.coursesToApprove)
    const [show, setShow] = useState(false);
    const [msg, setMsg] = useState('');
    const [isOpen, setOpen] = useState(false)
    const [link, setLink] = useState('')

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const openVideo = (enlace) => {
        setLink(enlace.split('v=')[1].split('&')[0])
        setOpen(true)
    }

    const aprobar = () => {
        handleClose()
    }
    const rechazar = () => {
        handleClose()
    }
    const consultarAprobacion = () => {
        setMsg('¿Está seguro de aprobar este curso?')
        handleShow()
    }
    const consultarRechazo = () => {
        setMsg('¿Está seguro de rechazar este curso?')
        handleShow()
    }

    return (
        <div className={s.contenedor}>
            <Row xs={1} md={2} className="g-4">
                {Array.from(props.coursesToApprove).map((_, idx) => (
                    <Col>
                        <Card>
                            <Card.Img variant="top" height="300px" src={props.coursesToApprove[idx].url} />
                            <Card.Body>
                                <Card.Title><h2>{props.coursesToApprove[idx].name}</h2></Card.Title>
                                <Card.Text>
                                    {props.coursesToApprove[idx].description} <br />
                                    <div className={s.precio}>Precio: ${props.coursesToApprove[idx].price}</div>
                                </Card.Text>
                                <div className={s.botones}>
                                    <Link to={{ pathname: "/details", state: { isAdmin: true, details: [props.coursesToApprove[idx]] } }}>
                                        <Button variant="primary">Detalles</Button>
                                    </Link>
                                    <Button variant="primary" onClick={() => openVideo(props.coursesToApprove[idx].urlVideo)}>Ver Video</Button>
                                
                                    <Button variant="success" onClick={consultarAprobacion}>Aprobar</Button>
                                    <Button variant="danger" onClick={consultarRechazo}>Rechazar</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Advertencia!</Modal.Title>
                </Modal.Header>
                <Modal.Body>{msg}</Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleClose}>
                        No
                    </Button>
                    <Button variant="danger" onClick={msg === '¿Está seguro de aprobar este curso?' ? aprobar : rechazar}>
                        Si
                    </Button>
                </Modal.Footer>
            </Modal>
            <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId={link} onClose={() => setOpen(false)} />
        </div>
    )
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch)
}

function mapStateToProps(state) {
    return {
        coursesToApprove: state.reducerForm.coursesToApprove
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PassCourses)


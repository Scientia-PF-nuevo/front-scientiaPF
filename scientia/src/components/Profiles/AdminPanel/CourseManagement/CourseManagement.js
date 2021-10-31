import { connect } from 'react-redux'
import * as actionCreators from './../../../../actions/actions'
import { bindActionCreators } from 'redux';
import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Button, Modal } from 'react-bootstrap';
import ModalVideo from 'react-modal-video'
import 'react-modal-video/scss/modal-video.scss'
import s from './CourseManagement.module.css'
import { Link } from 'react-router-dom';

const CourseManagement = (props) => {
  useEffect(() => {
    props.getCoursesToApprove()
  }, [])

  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState('');
  const [isOpen, setOpen] = useState(false)
  const [link, setLink] = useState('')
  const [id, setId] = useState(0)
  const [motivo, setMotivo] = useState(0)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const openVideo = (enlace) => {
    setLink(enlace.split('v=')[1].split('&')[0])
    setOpen(true)
  }

  const handleChange = (e) => {
    e.preventDefault()
    setMotivo(e.target.value)
  }

  const aprobar = () => {
    props.approveCourse(id)
    handleClose()
  }
  const rechazar = () => {
    props.rejectCourse(id, motivo)
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
  const tam = props.coursesToApprove.length - 1

  return (
    <>
      {!props.coursesToApprove ?
        <h1>Cargando...</h1>
        :
        (props.coursesToApprove.length === 0) ?
          <h1>No hay cursos para analizar</h1>
          :
          <div className={s.contenedor}>
            <Row className={s.tarjetas}>
              {Array.from(props.coursesToApprove).map((_, idx) => (
                <Col >
                  <Card className={s.tarjeta}>
                    <Card.Img variant="top" height="300px" src={props.coursesToApprove[idx].url} />
                    <Card.Body>
                      <Card.Title><h2>{props.coursesToApprove[idx].name}</h2></Card.Title>
                      <Card.Text>
                        <div className={s.contenedorPrecio}>
                          <div className={s.precio}>Precio: ${props.coursesToApprove[idx].price}</div>
                        </div>
                      </Card.Text>
                      <div className={s.botones}>
                        <Link to={{ pathname: "/details", state: { isAdmin: true, details: [props.coursesToApprove[idx]] } }}>
                          <Button variant="primary">Ver Detalles</Button>
                        </Link>
                        <Button variant="primary" onClick={() => openVideo(props.coursesToApprove[idx].urlVideo)}>Ver Video</Button>
                        <Button variant="success" onClick={() => { consultarAprobacion(); setId(props.coursesToApprove[idx].id) }}>Aprobar</Button>
                        <Button variant="danger" onClick={() => { consultarRechazo(motivo); setId(props.coursesToApprove[idx].id) }}>Rechazar</Button>
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
              <Modal.Body>
                <div className={s.contenedorModal}>
                  {msg} <br />
                  {msg !== '¿Está seguro de aprobar este curso?' && <textarea onChange={handleChange} placeholder="Cuentanos el motivo del rechazo..." name="motivoRechazo" rows="3" cols="50" />}
                </div>
              </Modal.Body>
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
      }
    </>
  )
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}

const mapStateToProps = (state) => {
  return {
    coursesToApprove: state.reducerForm.coursesToApprove,
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(CourseManagement)
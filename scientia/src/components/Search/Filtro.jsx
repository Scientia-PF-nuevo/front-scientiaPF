import React, { useState } from 'react'
import SearchBar from './SearchBar';
import { Button, Offcanvas } from 'react-bootstrap'

function Filtro() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div className="botonFiltro">
                <Button variant="dark" onClick={handleShow}>
                    Filter
                </Button>
            </div>
            <Offcanvas style={{maxWidth:"320px"}} show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Filters</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <SearchBar />
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default Filtro
import React from 'react';
import { Modal, Button, Container, Col, Row } from 'react-bootstrap';
import gm_img from '../assets/gm.jpg';

const DrawModal = ({ show, onHide, showContent, showLinkText, onLinkClick }) => {
    return (
        <Modal show={show} onHide={onHide} animation={false} aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
            <Container>
                <Row className='align-items-center bg-gray' height="150px">
                {/* xs 寬度 md 斷點 */}
                <Col xs={4} md={3}>
                    <img src={gm_img}></img>
                </Col>
                <Col xs={12} md={9}>
                    {showContent}
                    <br />
                    <a href="#" onClick={onLinkClick} onKeyDown={e => e.key === 'v'}>
                    {showLinkText}
                    </a>
                </Col>
                </Row>
            </Container>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="success" onClick={onHide}>
                停止對話
            </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DrawModal;
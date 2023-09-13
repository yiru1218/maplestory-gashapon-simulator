import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { Nav, Navbar, NavDropdown, Container, Modal } from 'react-bootstrap';
import './nav-bar.css'

export default function CustomizeNavBar() {
    const fashionBoxCount = useSelector((state) => state.buyFashionBox.count);
    const petBoxCount = useSelector((state) => state.buyPetBox.count);
    const fashionBoxPrice = useSelector((state) => state.buyFashionBox.totalPrice);
    const petBoxPrice = useSelector((state) => state.buyPetBox.totalPrice);
    const totalPrice = fashionBoxPrice + petBoxPrice

    const [showDropdown, setShowDropdown] = useState(false);

    const handleToggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };
    const [show, setShow] = useState(false);

    return (
        <>
            <Navbar sticky="top" bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="http://localhost:3000/"><b>楓之谷轉蛋模擬器</b></Navbar.Brand>
                    <Nav>
                        <NavDropdown title="目前累積" id="basic-nav-dropdown"
                            show={showDropdown}
                            onClick={handleToggleDropdown}
                        >
                            <NavDropdown.Item>時尚隨機箱 {fashionBoxCount} 抽</NavDropdown.Item>
                            <NavDropdown.Item>寵物隨機箱 {petBoxCount} 抽</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item>
                                總金額: {totalPrice}
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link onClick={() => setShow(true)}>使用說明</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            <Modal
                show={show}
                onHide={() => setShow(false)}
                aria-labelledby="example-modal-sizes-title-sm"

            >
                <Modal.Header closeButton>
                    <Modal.Title className="modal-title h5">
                        使用說明   一直抽一直爽假裝錢一直丟水溝
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>1. 點選要購買的物品</p>
                    <p>2. 雙擊圖示開啟小視窗</p>
                    <p>3. 點選立即使用後可案 Enter 抽下一箱</p>
                    <p>4. 左上角有目前累積抽數與金額</p>
                    <p>5. 移動到圖示會顯示目前中獎機率</p>
                </Modal.Body>
            </Modal>
        </>
    )
}
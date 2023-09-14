import './App.css';
import React from "react";
import { Navbar, NavDropdown, Container } from 'react-bootstrap';
import CustomizeNavBar from './components/nav-bar/nav-bar';
import { FashionBox, HandleClickFashionBox } from './components/fashion-box/fashion-box-redux';
import { PetBox, HandleClickPetBox } from './components/pet-box/pet-box';
import ChatBox from './components/chat-box/chat-box';


function App() {

    return (
        <body>
            <CustomizeNavBar />
            <div className='store-container'>
                <div className='buy-box'>
                    <FashionBox />
                    <PetBox />
                </div>
                <div className='buy-box'>
                    <HandleClickFashionBox />
                    <HandleClickPetBox />
                </div>
                <div className='chat-box'>
                    <ChatBox />
                </div>

            </div>
            <div className="footer">
                Made By yiru1218. 有任何問題可聯繫信箱: mousechen24@gmail.com
                <br></br>
                圖片皆取自<a href='http://www.gametsg.com/maplestory/'>新楓之谷透視鏡</a>
            </div>
            <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        </body>
    )
}

export default App;
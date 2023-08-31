import gm_img from './gm.jpg';
import './App.css';
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { Button, Modal, Container, Col, Row, Card } from 'react-bootstrap';
import parse from "html-react-parser";
import Header from './Header';

function App() {
  const [itemPool, setItemPool] = useState();
  useEffect(() => {
    axios.get('http://127.0.0.1:5000/fashion-box-data')
      .then((response) => {
        setItemPool(response.data.pool);
      })
  }, []);
  
  const [itemUrlData, setItemUrl] = useState();
  useEffect(() => {
    axios.get('http://127.0.0.1:5000/fashion-box-img-url')
      .then((response) => {
        setItemUrl(response.data.item_info);
      })
  }, []);
  

  const [awardList, setAwardList] = useState([]);
  const notAwardList = ['時裝神奇剪刀', '超性能擴音器', '核心寶石1個交換券(不可交易)', '核心寶石1個交換券', '日拋隱形眼鏡',
    '通用高級染髮券', '通用高級護膚券', '通用高級整形券', '通用整形券',
    '通用高級美髮券', '通用美髮券', '透明耳環', '透明鞋子', '透明手套',
    '透明披風', '透明眼部裝飾', '透明面具', '透明帽'];
  const [count, setCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showModal, setshowModal] = useState();
  const [showLinkText, setShowLinkText] = useState();
  // 純機率
  const getRandomFashionBoxItem = () => {
    const idx = Math.floor(Math.random() * itemPool.length);
    setCount(count + 1);
    if (!notAwardList.includes(itemPool[idx])) {
      setAwardList(getAwardList => [...getAwardList, itemPool[idx]]);
    }
  };
  
  const [boxCount, setBoxCount] = useState(0);
  const buyFashionBox = () => {
    setBoxCount(boxCount + 10);
    setTotalPrice(totalPrice + 270);
  }
  
  // 拿一個從pool中砍一個
  const getRandomFashionBoxDelItem = () => {
    if(boxCount > 0) {
      setCount(count + 1);
      setBoxCount(boxCount - 1);
      // 隨機選擇 pool[idx]
      const idx = Math.floor(Math.random() * itemPool.length);
      // 移除array中選擇過的idx
      itemPool.splice(idx, 1);
      let imgUrl = itemUrlData.find(img => img.item_name === itemPool[idx]);
      // 新的時裝查不到圖片網址
      if(!imgUrl) { imgUrl = `[new]`; }
      const htmlContent = `如何？<img src='${imgUrl.item_url}'
      ></img><span className='text-danger'>${itemPool[idx]}</span>拿到道具了嗎？不覺得很神奇嗎？下次再有
        <span className='text-primary'>時尚隨機箱卷</span>的時候找我吧！<br/>`;
      const reactElement = parse(htmlContent);
      setshowModal(reactElement);
      setShowLinkText('再抽一次');
      if (!notAwardList.includes(itemPool[idx])) {
        setAwardList(getAwardList => [...getAwardList, itemPool[idx]]);
      }
    } else {
      console.log('cant draw!');
      handleClose();
    }
    
  };

  // 滾動到最下面
  const awardListEl = useRef(null);
  React.useLayoutEffect(() => {
    if (awardListEl.current) {
      awardListEl.current.scrollTop = awardListEl.current.scrollHeight;
      // console.log(awardListEl.current.scrollHeight);
    }
  });

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const []
  const drawBox = () => {
    if(boxCount > 0) {
      const htmlContent = `擁有<img src='http://gametsg.techbang.com/maplestory/icon_item/cd1d4ea695bbbd48cdb8642b57696cd6.png'
      ></img><span className='text-danger'>時尚隨機箱</span>的話我就可以換一種最新的造型現金道具給你喔！如何，要立即使用嗎？ 
      <br/>`;
      const reactElement = parse(htmlContent);
      setshowModal(reactElement);
      setShowLinkText('現在立即使用時尚隨機箱');
      handleShow();
    } else {
      console.log('cant draw!');
    }
    
  }

  return (
    <body>
      {/* <Header/> */}
      {/* <Button variant="outline-primary" onClick={getRandomFashionBoxDelItem} onKeyDown={e => e.key === 'Enter'}>
        test
      </Button> */}
      <Container className='background'>
      <Header/>
      {/* <Button variant="primary" onClick={() => {
        drawBox();
        // handleShow();
      }}>
        Test
      </Button> */}
      <Card className='market-box' style={{ width: '150px' }}>
        <Card.Body>
          <img src='http://gametsg.techbang.com/maplestory/icon_item/cd1d4ea695bbbd48cdb8642b57696cd6.png'
            width="80px"
            height="80px"
          ></img>
          <p>時尚隨機箱</p>
          <p><s style={{ color: 'gray' }}>300樂豆點</s><span style={{ color: 'red' }}><b>(10%)</b></span></p>
          <p>270樂豆點(10個)</p>
          <Button variant='success' style={{ width: '100%' }} onClick={buyFashionBox}>
            購買
          </Button>
        </Card.Body>

      </Card>

      <div style={{ position: 'relative' }}>
        <img src='http://gametsg.techbang.com/maplestory/icon_item/cd1d4ea695bbbd48cdb8642b57696cd6.png'
          onDoubleClick={() => {
            drawBox();
          }}
          style={{ cursor: 'pointer' }}
          width="40px"
          height="40px"
        ></img>
        <span className='box-count-text' style={{ position: 'absolute', bottom: '0', left: '0' }}><b>{boxCount}</b></span>
      </div>

      <p>
        {/* 目前有{boxCount}箱時尚隨機箱<img src='http://gametsg.techbang.com/maplestory/icon_item/cd1d4ea695bbbd48cdb8642b57696cd6.png'></img>
        <br/> */}
        目前累積{count}抽 共花費{totalPrice}元
      </p>
      <Card style={{ width: '500px', height: '150px' }}>
        <Card.Body ref={awardListEl} className='chat-body'>
          <div style={{ padding: '2px' }}>
            {awardList.map(item =>
              <li className='bg-warning'>
                恭喜你從時尚隨機箱獲得<span className='award-item'>{item}</span>
              </li>
            )}
          </div>
        </Card.Body>
      </Card>
      </Container>

      <Modal show={show} onHide={handleClose} animation={false} aria-labelledby="contained-modal-title-vcenter"
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
                {showModal}
                <br />
                <a href="#" onClick={getRandomFashionBoxDelItem} onKeyDown={e => e.key === 'v'}>
                  {showLinkText}
                </a>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleClose}>
            停止對話
          </Button>
        </Modal.Footer>
      </Modal>
    </body>
  );
}
// eslint-disable-next-line
export default App;
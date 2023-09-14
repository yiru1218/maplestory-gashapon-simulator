import axios from "axios";
import React, { useState, useEffect } from "react";
import { PETBOX_IMG_API_URL, PETBOX_DRAW_API_URL } from "../../api.js";
import parse from "html-react-parser";
import DrawModal from '../draw-modal.js'
import { Button, Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import '../store-box.css'
// Redux
import { addBox, addPrice, drawBox, addCurrentUseBox } from "../../redux/reducers/pet-box/actions.js";
import { addAward, addPetAward } from "../../redux/reducers/award-list/actions.js";
// useSelector 讀取 data
// useDispatch 操作 data
import { useSelector, useDispatch } from 'react-redux';
import pet_box from '../../assets/pet-box.png'

// 購買時尚箱並計算價錢
const PetBox = () => {
    const dispatch = useDispatch();

    return (
        <Card className='market-box' style={{ width: '150px' }}>
            <Card.Body>
                <img src={pet_box}
                    width="80px"
                    height="80px"
                    alt="寵物隨機箱"
                ></img>
                <p>寵物隨機箱</p>
                <p><s style={{ color: 'gray' }}>600樂豆點</s><span style={{ color: 'red' }}><b>(16%)</b></span></p>
                <p>499樂豆點(10個)</p>
                <Button variant='success' style={{ width: '100%' }} onClick={() => { dispatch(addBox()); dispatch(addPrice()) }}>
                    購買
                </Button>
            </Card.Body>
        </Card>
    )
}

// 雙擊時尚箱 icon 開啟小視窗
const HandleClickPetBox = () => {

    // 使用 useSelector 取得 state
    const boxCount = useSelector((state) => state.buyPetBox.boxCount);
    const dispatch = useDispatch();
    const petAwards = useSelector((state) => state.addAward.petAwards);
    const awardsCount = petAwards.length;
    const currentCount = useSelector((state) => state.buyPetBox.count);
    // 算目前中獎率
    let awardPercent = (awardsCount / currentCount) * 100;
    const roundedAwardPercent = awardPercent.toFixed(2);
    // 決定小視窗要不要開啟
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showContent, setshowContent] = useState();
    const [showLinkText, setShowLinkText] = useState();

    // 雙擊開啟小視窗
    const doubleClickPetBoxIcon = () => {
        if (boxCount > 0) {
            const htmlContent = `擁有<img src='http://www.gametsg.com/maplestory/icon_item/f566c35a6becd0be73183abad8b91c77.png'
            ></img><span className='text-danger'>寵物隨機箱</span>的話我就可以換一種最新的造型寵物給你喔！如何，要立即使用嗎？ 
            <br/>`;
            const reactElement = parse(htmlContent);
            setshowContent(reactElement);
            setShowLinkText('現在立即使用寵物隨機箱');
            handleShow();
        } else {
            console.log('cant draw!');
        }
    }

    // 抽抽
    const [itemUrlData, setItemUrl] = useState();
    // 渲染後取得一般獎項圖片的 url
    useEffect(() => {
        axios.get(PETBOX_IMG_API_URL)
            .then((response) => {
                // url list 存在 itemUrlData
                setItemUrl(response.data.item_info);
            })
    }, []);

    // 儲存 api 抽出來的物品
    const [item, setItem] = useState(null);

    // 渲染後先執行抽獎動作一次 => 避免第一次抽獎拿不到資料顯示 Null
    useEffect(() => {
        axios.get(PETBOX_DRAW_API_URL)
            .then((response) => {
                // 不是 json 直接拿 response.data 
                setItem(response.data);
            })
    }, []);
    // 小視窗彈出來後按抽獎
    const handleDrawPetBoxClick = () => {
        axios.get(PETBOX_DRAW_API_URL)
            .then((response) => {
                // 不是 json 直接拿可以 response.data 
                // 從 api 取得抽出的物品存在 item
                setItem(response.data);
            })

        if (boxCount > 0) {
            dispatch(drawBox());
            dispatch(addCurrentUseBox());

            let notAwardData = itemUrlData.find(img => img.item_name === item);
            // 新的時裝查不到圖片網址
            if (!notAwardData) { 
                notAwardData = `[new]`; 
                dispatch(addAward('寵物隨機箱', item));
                dispatch(addPetAward(item));
            }
            const htmlContent = `如何？<img src='${notAwardData.item_url}'
        ></img><span className='text-danger'>${item}</span>拿到道具了嗎？不覺得很神奇嗎？下次再有
        <span className='text-primary'>寵物隨機箱卷</span>的時候找我吧！<br/>`;
            const reactElement = parse(htmlContent);
            setshowContent(reactElement);
            setShowLinkText('再抽一次');

        } else {
            console.log('cant draw!');
            handleClose();
        }
    }

    return (
        <>
            <OverlayTrigger
                placement='bottom'
                overlay={
                    <Tooltip>
                        目前中獎率: {roundedAwardPercent}%
                    </Tooltip>
                }
            >
                <div className="icon-img">
                    <img src={pet_box}
                        alt="寵物隨機箱"
                        onDoubleClick={() => {
                            doubleClickPetBoxIcon();
                        }}
                        style={{
                            cursor: 'pointer',
                            maxWidth: '100%',
                            verticalAlign: 'bottom'
                        }}
                        width="40px"
                        height="40px"
                    />
                    <span className='box-count-text'>
                        <b>{boxCount}</b>
                    </span>
                </div>
            </OverlayTrigger>


            <DrawModal
                show={show}
                onHide={handleClose}
                showContent={showContent}
                showLinkText={showLinkText}
                onLinkClick={handleDrawPetBoxClick}
            />
        </>
    )
}

// 多個就不用 export default
export { PetBox, HandleClickPetBox };

import React, { useRef } from "react";
import { Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import './chat-box.css'

export default function ChatBox() {
    const awardList = useSelector((state) => state.addAward.chatAwards);
    // 聊天室滾動到最下面
    const awardListEl = useRef(null);
    React.useLayoutEffect(() => {
        if (awardListEl.current) {
            awardListEl.current.scrollTop = awardListEl.current.scrollHeight;
            // console.log(awardListEl.current.scrollHeight);
        }
    });

    return (
        <>
            <Card style={{ width: '500px', height: '200px' }}>
                <Card.Body ref={awardListEl} className='chat-body'>
                    <div style={{ padding: '2px' }}>
                        {awardList.map(item => 
                            <li className='bg-warning'>
                                恭喜你從{item.type}獲得<span className='award-item'>{item.award}</span>
                            </li>
                        )}
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}
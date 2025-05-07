import './detailPage.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ReviewModal from '../components/ReviewModal';

function DetailPage(){
    const navigate = useNavigate();
    const[isOpen,setIsOpen]=useState(false);

    return (
        <div className="container">
            {/* 상단 헤더 */}
            <div className="header_wrap">
                <div className="school">인공지능융합대학</div>
                <button className='back-button' onClick={()=>navigate('/')}>←</button>
            </div>
  
            {/* 제목 */}
            <h2 className="detail_title">가게 이름 어쩌구</h2>
            
            <div className="review_header">
                <div className="stars">⭐⭐⭐⭐☆</div>
                <button className="add_review_btn" onClick={()=>setIsOpen(true)}>리뷰 추가</button>
                {isOpen&& (
                    <>
                        <div className="overlay" onClick={() => setIsOpen(false)}></div>
                        <ReviewModal onClose={() => setIsOpen(false)} />
                    </>
                )}
            </div>
            <div className='box_wrap'>
                <div className='detail_box'>
                    {/* 제휴정보, 주소, 시간 박스 */}
                    <div className="infoBox"></div>
                    <div className="normalBox"></div>
                </div>

                <div className='review_box'>
                    <div className='review_item'></div>
                    <div className='review_item'></div>
                    <div className='review_item'></div>
                </div> 
            </div>
        </div>
    );
}

export default DetailPage
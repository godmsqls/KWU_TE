import './detailPage.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReviewModal from '../components/ReviewModal';

function DetailPage() {
  const navigate = useNavigate();
  const { storeName } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [store, setStore] = useState(null);

  useEffect(() => {
    fetch("http://192.168.0.36:5000/partners")
      .then(res => res.json())
      .then(data => {
        const found = data.find(item => item.store_name === storeName);
        setStore(found);
      });
  }, [storeName]);

  if (!store) return <div>로딩 중...</div>;

  return (
    <div className="container">
      <div className="header_wrap">
        <div className="school">인공지능융합대학</div>
        <button className='back-button' onClick={() => navigate('/Ai_listpage')}>←</button>
      </div>

      <h2 className="detail_title">{store.store_name}</h2>

      <div className="review_header">
        <div className="stars">⭐⭐⭐⭐☆</div>
        <button className="add_review_btn" onClick={() => setIsOpen(true)}>리뷰 추가</button>
        {isOpen && (
          <>
            <div className="overlay" onClick={() => setIsOpen(false)}></div>
            <ReviewModal onClose={() => setIsOpen(false)} />
          </>
        )}
      </div>

      <div className='box_wrap'>
        <div className='detail_box'>
          <div className="infoBox">
            <p>{store.benefit}</p>
          </div>
          <div className="normalBox">
            <p>{store.location}</p>
          </div>
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

export default DetailPage;


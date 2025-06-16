import './Ai_detailPage.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReviewModal from '../components/ReviewModal';

function Ai_detailPage() {
  const navigate = useNavigate();
  const { storeName } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [store, setStore] = useState(null);
  const [reviewData, setReviewData] = useState({ reviews: [], average_rating: 0 });

  const fetchStoreData = async () => {
    try {
      const response = await fetch("http://192.168.35.201:5000/ai_partners");
      const data = await response.json();
      const found = data.find(item => item.store_name === storeName);
      setStore(found);
    } catch (error) {
      console.error("가게 정보를 불러오는 중 오류:", error);
    }
  };

  const fetchReviewData = async () => {
    try {
      const response = await fetch(`http://192.168.35.201:5000/ai_reviews/${encodeURIComponent(storeName)}`);
      const data = await response.json();
      setReviewData(data);
    } catch (error) {
      console.error("리뷰 데이터를 불러오는 중 오류:", error);
    }
  };

  useEffect(() => {
    fetchStoreData();
    fetchReviewData();
  }, [storeName]);

  const handleReviewAdded = () => {
    fetchReviewData(); // 리뷰 추가 후 데이터 새로고침
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            stars.push(<span key={i} style={{ color: "#FFD700", fontSize: '35px' }}>★</span>);
        } else if (i === fullStars + 1 && hasHalfStar) {
            stars.push(<span key={i} style={{ color: "#FFD700", fontSize: '35px' }}>★</span>); // 반별 없음 → 전별로 통일
        } else {
            stars.push(<span key={i} style={{ color: "#E0E0E0", fontSize: '35px' }}>★</span>);
        }
      }
    return stars;
  };


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR');
  };

  if (!store) return <div>로딩 중...</div>;

  return (
    <div className="container">
      <div className="header_wrap">
        <div className="school">인공지능융합대학</div>
        <button className='back-button' onClick={() => navigate('/Ai_listpage')}>←</button>
      </div>

      <h2 className="detail_title">{store.store_name}</h2>

      <div className="review_header">
        <div className="stars">
          {renderStars(reviewData.average_rating)}
          <span style={{ marginLeft: '10px', fontSize: '25px' }}>
            ({reviewData.average_rating.toFixed(1)})
          </span>
        </div>
        <button className="add_review_btn" onClick={() => setIsOpen(true)}>리뷰 추가</button>
        {isOpen && (
          <>
            <div className="overlay" onClick={() => setIsOpen(false)}></div>
            <ReviewModal 
              onClose={() => setIsOpen(false)} 
              storeName={storeName}
              category={store.category}
              onReviewAdded={handleReviewAdded}
              isChong={false}
            />
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
          {reviewData.reviews.length > 0 ? (
            reviewData.reviews.map((review, index) => (
              <div key={index} className='review_item'>
                <div className="review_rating">
                  {renderStars(review.rating)}
                  <span style={{ marginLeft: '10px', fontSize: '14px', color: '#666' }}>
                    {formatDate(review.created_at)}
                  </span>
                </div>
                <div className="review_content_text">
                  {review.content}
                </div>
              </div>
            ))
          ) : (
            <div className="no_reviews">
              <p>아직 리뷰가 없습니다. 첫 번째 리뷰를 작성해보세요!</p>
            </div>
          )}
        </div> 
      </div>
    </div>
  );
}

export default Ai_detailPage;
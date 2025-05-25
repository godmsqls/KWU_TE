import { useState } from "react";
import './Recommended_listpage.css'

function RecommendedListPage({onClose }) {
  const [recommendList, setRecommendList] = useState([]);

  /*fetch('GET')으로 직접 불러오기 */
  useEffect(() => {
    fetch('http://localhost:3001/api/recommend')
      .then(res => res.json())
      .then(data => {
        console.log("백엔드 응답 확인 :", data);
        setRecommendList(data);
      })
      .catch(err => console.error("API 오류:", err));
  }, []);


  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <span>추천 제휴사 목록</span>
          <button onClick={onClose}>X</button>
        </div>

        /*목록 보여주기*/
        <div className="recommend-scroll-area">
          {recommendList.map((item, idx) => (
            <div className="recommend-card" key={idx}>
              <strong>{item.storeName}</strong>
              <p>{item.reason}</p>
              <div className="nickname">- {item.nickname}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecommendedListPage;
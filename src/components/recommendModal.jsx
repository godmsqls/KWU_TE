import { useState } from "react";
import RecommendField from "./recommendField";
import './recommendModal.css'

function RecommendModal({ onClose }) {
  const [storeName, setStoreName] = useState('');
  const [reason, setReason] = useState('');
  const [nickname, setNickName] = useState('');

  /*fetch('POST')로 수정*/
  const handleSubmit = async() => {
      await fetch('http://localhost:3001/api/recommend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ storeName, reason, nickname })
    });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-close">
          <button className="close-btn" onClick={onClose}>X</button>
        </div>
        <div className="modal-header">
          <span className="modal-title">제휴했으면 하는 가게를 추천해주세요!</span>
        </div>

        <RecommendField label="가게 이름">
          <input value={storeName} onChange={(e) => setStoreName(e.target.value)} />
        </RecommendField>

        <RecommendField label="추천 사유">
          <textarea value={reason} onChange={(e) => setReason(e.target.value)} />
        </RecommendField>

        <RecommendField label="닉네임">
          <input value={nickname} onChange={(e) => setNickName(e.target.value)} />
        </RecommendField>

        <div className="button-container">
          <button className="submit-btn" onClick={handleSubmit}>추천하기</button>
        </div>
        
      </div>
    </div>
  );
}

export default RecommendModal;

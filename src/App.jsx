//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css';
import { FaSearch } from 'react-icons/fa'; // 검색 아이콘
import { useNavigate } from 'react-router-dom';  
//import Addpage from '../src/pages/addPage';
import LoginModal from './components/LoginModal';
import RecommendModal from './components/recommendModal';
import Recommended_ListPage from './components/Recommended_listpage';
import { useState } from 'react';

function App() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); /*로그인 모달*/
  const [showModal,setShowModal]=useState(false); /*추천 입력 모달*/
  const [showListModal, setShowListModal] = useState(false); /*추천 목록 모달*/
  const [recommendList, setRecommendList] = useState([]); /*map으로 돌린 추천목록 렌더링*/

 const handleAddRecommendation = ({ storeName, reason, nickname }) => {
  setRecommendList(prev => [...prev, { storeName, reason, nickname }]); /*배열 복사*/
};

  return (
    <div>
      <div className="container app_background">

        {/* 관리자 로그인 버튼 */}
        <div className="loginWrap">
          <button className="login" onClick={() => setIsOpen(true)}>관리자 로그인</button>
          {isOpen && (
            <>
              <div className="overlay" onClick={() => setIsOpen(false)}></div>
              <LoginModal onClose={() => setIsOpen(false)} />
            </>
          )}
        </div>

        {/* 검색창 */}
        <div className="searchWrap">
          <FaSearch className="searchIcon" />
          <input type="text" placeholder="검색어를 입력하세요" className="searchInput" />
        </div>

        {/* 버튼 섹션 */}
        <div className="btWrap">
          <button className="button" onClick={() => navigate('/Ai_listpage')}>인공지능융합대학</button>
          <button className="button" onClick={() => navigate('/Chong_listpage')}>총학생회</button>
          <button className="button" onClick={() => setShowModal(true)}>제휴사 추천</button>
          <button className="button" onClick={() => setShowListModal(true)}>추천 업체 확인</button>

          {showModal&&<RecommendModal onClose={()=>setShowModal(false)} onSubmit={handleAddRecommendation}/>}
          {showListModal&&<Recommended_ListPage recommendList={recommendList} onClose={()=>setShowListModal(false)}/>}
        </div>


      </div>
    </div>
  );
}

export default App;

//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css';
import { FaSearch } from 'react-icons/fa'; // 검색 아이콘
import { useNavigate } from 'react-router-dom';  
//import Addpage from '../src/pages/addPage';
import LoginModal from './components/LoginModal';
import { useState } from 'react';

function App() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

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
          <button className="button" onClick={() => navigate('/')}>제휴사 추천</button>
          <button className="button" onClick={() => navigate('/')}>추천 업체 확인</button>
        </div>


      </div>
    </div>
  );
}

export default App;

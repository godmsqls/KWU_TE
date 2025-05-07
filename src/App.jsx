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
  const[isOpen,setIsOpen]=useState(false);
  
  return (
    <div>
      <div className="container">
      {/* 관리자 로그인 버튼 */}
      <div className="loginWrap">
        <button className="login" onClick={()=>setIsOpen(true)}>관리자 로그인</button>
        {isOpen&& (
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
        <button className="button" onClick={()=>navigate('/addPage')}>인공지능융합대학</button>
        <button className="button" onClick={()=>navigate('/detailPage')}>총학생회</button>
      </div>

      </div>
    </div>
  );
}

export default App;


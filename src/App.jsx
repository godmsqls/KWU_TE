//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css';
import { FaSearch } from 'react-icons/fa'; // 검색 아이콘

function App() {
  return (
    <div className="container">
      {/* 관리자 로그인 버튼 */}
      <div className="loginWrap">
        <button className="login">관리자 로그인</button>
      </div>

      {/* 검색창 */}
      <div className="searchWrap">
        <FaSearch className="searchIcon" />  
        <input type="text" placeholder="검색어를 입력하세요" className="searchInput" />
      </div>

      {/* 버튼 섹션 */}
      <div className="btWrap">
        <button className="button">인공지능융합대학</button>
        <button className="button">총학생회</button>
      </div>
    </div>
  );
}

export default App;


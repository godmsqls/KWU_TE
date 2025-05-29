import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

import App from './App.jsx';                         
import AddPage from './pages/addPage.jsx';
import Ai_detailPage from './pages/Ai_detailPage.jsx';
import Chong_detailPage from './pages/Chong_detailPage.jsx';
import Ai_listpage from './pages/Ai_listpage.jsx'; 
import Chong_listpage from './pages/Chong_listpage.jsx' 

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/addPage" element={<AddPage />} />
        <Route path="/Ai_listpage" element={<Ai_listpage />} />
        <Route path="/Chong_listpage" element={<Chong_listpage />} />
        <Route path="/Ai_store/:storeName" element={<Ai_detailPage />} />  
        <Route path="/Chong_store/:storeName" element={<Chong_detailPage />} /> 
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

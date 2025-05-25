import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

import App from './App.jsx';                         
import AddPage from './pages/addPage.jsx';
import DetailPage from './pages/detailPage.jsx';
import Ai_listpage from './pages/Ai_listpage.jsx';  

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/addPage" element={<AddPage />} />
        <Route path="/detailPage" element={<DetailPage />} />
        <Route path="/Ai_listpage" element={<Ai_listpage />} />
        <Route path="/store/:storeName" element={<DetailPage />} />  
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

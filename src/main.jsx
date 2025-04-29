import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import AddPage from '../src/pages/addPage.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/addPage" element={<AddPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

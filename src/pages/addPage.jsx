//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './addPage.css'
import { useNavigate } from 'react-router-dom';
import Input from '../components/addPage_input'

function Addpage() {
  const navigate = useNavigate();
  return (
    <>
    <div className='container'>
      <div className='back'>
        <button className='back-button' onClick={()=>navigate('/')}>←</button>
      </div>
      <h2 className='add_title'>제휴 업체 추가 등록</h2>
      <Input label='카테고리' placeholder=''></Input>
      <Input label='제휴사 명' placeholder=''></Input>
      <Input label='제휴 내용' placeholder=''></Input>
      <Input label='위치' placeholder=''></Input>
      <Input label='영업 시간' placeholder=''></Input>
      <div className='blank'></div>
      <div className='add'>
        <button className='add-button'>추가</button>
      </div>
    </div>
    
    </>
  )
}

export default Addpage

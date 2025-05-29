//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './addPage.css'
import { useNavigate } from 'react-router-dom';
import Input from '../components/addPage_input'

function Addpage() {
  const navigate = useNavigate();

  function handleChangeSelect(e){
    console.log(e.target.value)
  }

  return (
    <>
    <div className='container'>
      <div className='back'>
        <button className='back-button' onClick={()=>navigate('/')}>←</button>
      </div>
      <h2 className='add_title'>제휴 업체 추가 등록</h2>
      <div className='input-row'>
        <div className='label-name'>
          <label>소속</label>
        </div>
        <select className="select_addpage" title="소속을 선택하세요" onChange={handleChangeSelect}>
          <option value="">소속을 선택하세요</option>
          <option value="1">인공지능융합대학</option>
          <option value="2">총학생회</option>
        </select>
      </div>
      <Input label='카테고리'></Input>
      <Input label='제휴사 명'></Input>
      <Input label='제휴 내용'></Input>
      <Input label='위치'></Input>
      <div className='blank'></div>

      <div className='add'>
        <button className='add-button'>추가</button>
      </div>
    </div>
    
    </>
  )
}

export default Addpage

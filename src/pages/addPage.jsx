import './addPage.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Input from '../components/addPage_input';

function Addpage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    affiliation: '', // 1 or 2
    category: '',
    store_name: '',
    benefit: '',
    location: ''
  });

  const handleChangeSelect = (e) => {
    setForm({ ...form, affiliation: e.target.value });
  };

  const handleInputChange = (label, value) => {
    const keyMap = {
      '카테고리': 'category',
      '제휴사 명': 'store_name',
      '제휴 내용': 'benefit',
      '위치': 'location'
    };
    setForm({ ...form, [keyMap[label]]: value });
  };

  const handleSubmit = async () => {
    if (!form.affiliation || !form.category || !form.store_name || !form.benefit || !form.location) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    const endpoint = form.affiliation === '1' ? '/add_ai_partners' : '/add_chong_partners';
    const baseUrl = 'http://192.168.35.201:5000';

    try {
      const res = await fetch(`${baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });
      const result = await res.json();
      if (result.success) {
        alert('제휴 등록 성공!');
        navigate('/');
      } else {
        alert('등록 실패: ' + result.message);
      }
    } catch (err) {
      alert('에러 발생: ' + err);
    }
  };

  return (
    <div className='container'>
      <div className='back'>
        <button className='back-button' onClick={() => navigate('/')}>←</button>
      </div>
      <h2 className='add_title'>제휴 업체 추가 등록</h2>
      <div className='input-row'>
        <div className='label-name'><label>소속</label></div>
        <select className="select_addpage" title="소속을 선택하세요" onChange={handleChangeSelect}>
          <option value="">소속을 선택하세요</option>
          <option value="1">인공지능융합대학</option>
          <option value="2">총학생회</option>
        </select>
      </div>
      <Input label='카테고리' onChange={handleInputChange} />
      <Input label='제휴사 명' onChange={handleInputChange} />
      <Input label='제휴 내용' onChange={handleInputChange} />
      <Input label='위치' onChange={handleInputChange} />
      <div className='blank'></div>
      <div className='add'>
        <button className='add-button' onClick={handleSubmit}>추가</button>
      </div>
    </div>
  );
}

export default Addpage;

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
    console.log('소속 선택:', e.target.value); // 디버깅용
  };

  const handleInputChange = (label, value) => {
    const keyMap = {
      '카테고리': 'category',
      '제휴사 명': 'store_name',
      '제휴 내용': 'benefit',
      '위치': 'location'
    };
    
    console.log(`${label} 입력:`, value); // 디버깅용
    setForm({ ...form, [keyMap[label]]: value });
  };

  const handleSubmit = async () => {
    // 디버깅을 위해 현재 form 상태 확인
    console.log('현재 form 상태:', form);
    
    // 각 필드 개별 검증
    if (!form.affiliation) {
      alert('소속을 선택해주세요.');
      return;
    }
    if (!form.category || !form.category.trim()) {
      alert('카테고리를 입력해주세요.');
      return;
    }
    if (!form.store_name || !form.store_name.trim()) {
      alert('제휴사 명을 입력해주세요.');
      return;
    }
    if (!form.benefit || !form.benefit.trim()) {
      alert('제휴 내용을 입력해주세요.');
      return;
    }
    if (!form.location || !form.location.trim()) {
      alert('위치를 입력해주세요.');
      return;
    }

    const endpoint = form.affiliation === '1' ? '/add_ai_partners' : '/add_chong_partners';
    // URL 수정 (콜론이 빠져있었음)
    const baseUrl = 'http://172.20.10.12:5050';
    
    // 전송할 데이터 준비 (affiliation 제외)
    const submitData = {
      category: form.category.trim(),
      store_name: form.store_name.trim(),
      benefit: form.benefit.trim(),
      location: form.location.trim()
    };

    console.log('전송할 데이터:', submitData);
    console.log('요청 URL:', `${baseUrl}${endpoint}`);

    try {
      const res = await fetch(`${baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submitData)
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const result = await res.json();
      console.log('서버 응답:', result);

      if (result.success) {
        alert('제휴 등록 성공!');
        // 폼 초기화
        setForm({
          affiliation: '',
          category: '',
          store_name: '',
          benefit: '',
          location: ''
        });
        navigate('/');
      } else {
        alert('등록 실패: ' + (result.message || '알 수 없는 오류'));
      }
    } catch (err) {
      console.error('요청 오류:', err);
      alert('에러 발생: ' + err.message);
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
        <select 
          className="select_addpage" 
          title="소속을 선택하세요" 
          onChange={handleChangeSelect} 
          value={form.affiliation}
        >
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
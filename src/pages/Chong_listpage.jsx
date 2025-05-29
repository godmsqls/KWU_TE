import './Chong_listpage.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Chong_listpage() {
  const [partners, setPartners] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://172.100.2.135:5000/chong_partners")
      .then(res => res.json())
      .then(data => setPartners(data));
  }, []);

  const categories = ["총학생회 음식점", "총학생회 주점", "총학생회 기타 제휴"];

  return (
    <div className="page-container">
      <button className='back-button' onClick={() => navigate('/')}>←</button>

      {categories.map(category => {
        const filtered = partners.filter(p => p.category === category);

        return (
          <div key={category} className="category-block">
            <h2 className="category-title">
              {category.replace("총학생회 ", "")}
            </h2>
            <ul className="store-list">
              {filtered.map(p => (
                <li
                  key={p.store_name}
                  onClick={() => navigate(`/Chong_store/${encodeURIComponent(p.store_name)}`)}
                >
                  {p.store_name}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export default Chong_listpage;

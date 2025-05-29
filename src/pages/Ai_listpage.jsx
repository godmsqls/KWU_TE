import './Ai_listpage.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Ai_listpage() {
  const [partners, setPartners] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://172.100.6.88:5000/partners")
      .then(res => res.json())
      .then(data => setPartners(data));
  }, []);

  const categories = ["인융대 음식점", "인융대 주점", "인융대 기타 제휴"];

  return (
    <div className="page-container">
      <button className='back-button' onClick={() => navigate('/')}>←</button>

      {categories.map(category => {
        const filtered = partners.filter(p => p.category === category);

        return (
          <div key={category} className="category-block">
            <h2 className="category-title">
              {category.replace("인융대 ", "")}
            </h2>
            <ul className="store-list">
              {filtered.map(p => (
                <li
                  key={p.store_name}
                  onClick={() => navigate(`/Ai_store/${encodeURIComponent(p.store_name)}`)}
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

export default Ai_listpage;

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PartnersList.css';

function PartnersList() {
  const [partners, setPartners] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/partners")
      .then(res => res.json())
      .then(data => setPartners(data));
  }, []);

  return (
    <div className="partnerList">
      {partners.map((p, idx) => (
        <div
          key={idx}
          className="partnerItem"
          onClick={() => navigate(`/store/${encodeURIComponent(p.store_name)}`)}
        >
          <h3>{p.store_name} <span className="category">({p.category})</span></h3>
        </div>
      ))}
    </div>
  );
}

export default PartnersList;

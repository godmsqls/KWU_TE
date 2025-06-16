import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './SearchComponent.css';

export default function SearchComponent() {
  const [query, setQuery] = useState('');
  const [allStores, setAllStores] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 두 API에서 전체 가게 불러오기
    Promise.all([
      fetch('http://192.168.35.201:5000/ai_partners').then(res => res.json()),
      fetch('http://192.168.35.201:5000/chong_partners').then(res => res.json())
    ]).then(([aiData, chongData]) => {
      const aiFormatted = aiData.map(store => ({ ...store, group: '인공지능융합대학' }));
      const chongFormatted = chongData.map(store => ({ ...store, group: '총학생회' }));
      setAllStores([...aiFormatted, ...chongFormatted]);
    });
  }, []);

  useEffect(() => {
    if (query.trim() === '') {
      setFilteredStores([]);
      return;
    }
    const result = allStores.filter(store =>
      store.store_name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredStores(result);
  }, [query, allStores]);

  const handleSelect = (store) => {
    const path = store.group === '총학생회' ? `/Chong_store/${store.store_name}` : `/Ai_store/${store.store_name}`;
    navigate(path);
  };

  return (
    <div className="searchWrap">
      <div className="searchBar">
        <FaSearch className="searchIcon" />
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          className="searchInput"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      {filteredStores.length > 0 && (
        <ul className="searchResults">
          {filteredStores.map((store, index) => (
            <li key={index} className="searchItem" onClick={() => handleSelect(store)}>
              <span className="storeName">{store.store_name}</span>
              <span className="groupTag">[{store.group}]</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

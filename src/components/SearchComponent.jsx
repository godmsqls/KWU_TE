// SearchComponent.jsx
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchComponent.css";
import { useNavigate } from "react-router-dom";

export default function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      if (!searchTerm) {
        setResults([]);
        return;
      }
      try {
        const aiRes = await fetch("http://192.168.35.201:5000/ai_partners");
        const chongRes = await fetch("http://192.168.35.201:5000/chong_partners");

        const aiData = await aiRes.json();
        const chongData = await chongRes.json();

        const merged = [
          ...aiData.map(item => ({ ...item, categoryGroup: "인공지능융합대학" })),
          ...chongData.map(item => ({ ...item, categoryGroup: "총학생회" })),
        ];

        const filtered = merged.filter(item =>
          item.store_name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setResults(filtered);
      } catch (err) {
        console.error("검색 오류:", err);
        setResults([]);
      }
    };

    const delay = setTimeout(fetchResults, 200);
    return () => clearTimeout(delay);
  }, [searchTerm]);

  const handleSelect = (item) => {
    const path = item.categoryGroup === "총학생회"
      ? `/Chong_store/${encodeURIComponent(item.store_name)}`
      : `/Ai_store/${encodeURIComponent(item.store_name)}`;
    navigate(path);
  };

  return (
    <div className="search-container">
      <div className="searchWrap">
        <FaSearch className="searchIcon" />
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          className="searchInput"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {searchTerm && results.length > 0 && (
        <ul className="searchResults">
          {results.map((item, idx) => (
            <li key={idx} onClick={() => handleSelect(item)}>
              <span className="resultName">{item.store_name}</span>
              <span className="resultGroup">({item.categoryGroup})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

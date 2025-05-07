import './detailPage.css'
import { useNavigate } from 'react-router-dom';

function DetailPage(){
    const navigate = useNavigate();
    return (
        <div className="container">
            {/* 상단 헤더 */}
            <div className="header">
                <div className="school">인공지능융합대학</div>
                <button className='back-button' onClick={()=>navigate('/')}>←</button>
            </div>
  
            {/* 제목 */}
            <h2 className="detail_title"></h2>
  
            {/* 제휴정보, 주소, 시간 박스 */}
            <div className="infoBox"></div>
            <div className="normalBox"></div>
            <div className="normalBox"></div>
        </div>
    );
}

export default DetailPage
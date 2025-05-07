import './detailPage.css'

function DetailPage(){
    return (
        <div className="container">
            {/* 상단 헤더 */}
            <div className="header">
                <div className="school">인공지능융합대학</div>
                <div className="back">&larr;</div>
            </div>
  
            {/* 제목 */}
            <h2 className="title"></h2>
  
            {/* 제휴정보, 주소, 시간 박스 */}
            <div className="infoBox"></div>
            <div className="normalBox"></div>
            <div className="normalBox"></div>
        </div>
    );
}

export default DetailPage
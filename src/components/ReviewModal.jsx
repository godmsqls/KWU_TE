import { VscChromeClose } from "react-icons/vsc";

export default function ReviewModal({onClose}){
    return(
        <div className="ReviewModal" onClick={onClose}>
            <div onClick={(e)=>e.stopPropagation()}>
                <div className="X_container">
                    <button className="X_inmodal" onClick={onClose}>
                        <VscChromeClose/>
                    </button>
                </div>
            

                <div className="review_text">제휴 업체 리뷰</div>
                <div className="rating_wrap_inmodal">
                    <div className="rating_label">별점</div>
                </div>
                <div className="rating_content_wrap_inmodal">
                    <div className="review_content_label">리뷰 내용</div>
                    <input className="review_content" type="text"/>
                </div>
                <button className="add_review_btn_inmodal">리뷰 등록</button>
            </div>
        </div>
    );
}
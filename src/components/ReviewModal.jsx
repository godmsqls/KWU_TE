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
            </div>

            <div className="review_text">제휴 업체 리뷰</div>
        </div>
    );
}
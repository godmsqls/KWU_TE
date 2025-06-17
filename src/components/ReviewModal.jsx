import { useState } from "react";
import { VscChromeClose } from "react-icons/vsc";

export default function ReviewModal({ onClose, storeName, category, onReviewAdded, isChong = false }) {
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [content, setContent] = useState("");

    const handleStarClick = (starIndex) => {
        setRating(starIndex);
    };

    const handleStarHover = (starIndex) => {
        setHoveredRating(starIndex);
    };

    const handleStarLeave = () => {
        setHoveredRating(0);
    };

    const handleSubmit = async () => {
        if (rating === 0) {
            alert("별점을 선택해주세요.");
            return;
        }
        if (content.trim() === "") {
            alert("리뷰 내용을 입력해주세요.");
            return;
        }

        try {
            const baseUrl = "http://172.29.24.221:5050"; 
            const endpoint = isChong ? "/chong_reviews" : "/ai_reviews";

            
            const response = await fetch(`${baseUrl}${endpoint}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    category: category,
                    store_name: storeName,
                    rating: rating,
                    content: content,
                }),
            });

            const result = await response.json();

            if (result.success) {
                alert("리뷰가 성공적으로 등록되었습니다!");
                onReviewAdded(); // 리뷰 목록 새로고침
                onClose();
            } else {
                alert("리뷰 등록에 실패했습니다: " + result.message);
            }
        } catch (error) {
            console.error("리뷰 등록 중 오류:", error);
            alert("리뷰 등록 중 오류가 발생했습니다.");
        }
    };

    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            const isFilled = i <= (hoveredRating || rating);
            stars.push(
                <span
                    key={i}
                    onClick={() => handleStarClick(i)}
                    onMouseEnter={() => handleStarHover(i)}
                    onMouseLeave={handleStarLeave}
                    style={{
                        fontSize: "2rem",
                        color: isFilled ? "#FFD700" : "#E0E0E0", // 노란색 또는 회색
                        cursor: "pointer",
                        marginRight: "4px",
                        transition: "color 0.2s"
                    }}
                >
                    ★
                </span>
            );
        }
        return stars;
    };

    return (
        <div className="ReviewModal" onClick={onClose}>
            <div onClick={(e) => e.stopPropagation()}>
                <div className="X_container">
                    <button className="X_inmodal" onClick={onClose}>
                        <VscChromeClose />
                    </button>
                </div>

                <div className="review_text">제휴 업체 리뷰</div>
                
                <div className="rating_wrap_inmodal">
                    <div className="rating_label">별점</div>
                    <div style={{ marginLeft: "30px", display: "flex", alignItems: "center" }}>
                        {renderStars()}
                        <span style={{ marginLeft: "10px", fontSize: "18px" }}>
                            {rating > 0 ? `${rating}점` : "별점을 선택해주세요"}
                        </span>
                    </div>
                </div>
                
                <div className="rating_content_wrap_inmodal">
                    <div className="review_content_label">리뷰 내용</div>
                    <textarea
                        className="review_content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="리뷰 내용을 입력해주세요..."
                        rows={6}
                    />
                </div>
                
                <button className="add_review_btn_inmodal" onClick={handleSubmit}>
                    리뷰 등록
                </button>
            </div>
        </div>
    );
}
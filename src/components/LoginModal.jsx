import { VscChromeClose } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LoginModal({onClose}){
    const [password,setPassword] = useState('');
    const navigate = useNavigate();

    function handleChangeSelect(e){
        console.log(e.target.value)
    }

    function handleLogin(e){
        e.preventDefault();
        if (password ==="ilovekwu") {
            navigate('/addPage');
        } else {
            alert("비밀번호가 틀렸습니다.");
        }
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            handleLogin();
        }
    }

    return(
        <div className="LoginModal" onClick={onClose}>
            <div onClick={(e)=>e.stopPropagation()}>
                <div className="X_container">
                    <button  className="X_inmodal" onClick={onClose}>
                        <VscChromeClose />
                    </button>
                </div>
            
                <div className="login_text">로그인</div>

                <form onSubmit={handleLogin}>
                    <div className="login_option_inmodal">
                        <select className="login_select_inmodal" title="소속을 선택하세요" onChange={handleChangeSelect}>
                            <option value="">소속을 선택하세요</option>
                            <option value="1">인공지능융합대학</option>
                            <option value="2">총학생회</option>
                        </select><br></br>

                        <input className="login_pw_inmodal" type="password" placeholder="비밀번호를 입력하세요" value={password} onChange={(e)=>setPassword(e.target.value)} onKeyDown={handleKeyDown}/>
                    </div>

                    <div className="login_button_wrapper">
                        <button className="login_button_inmodal" type="submit" onClick={handleLogin}>로그인</button>
                    </div>
                </form>
                
                
            </div>
        </div>
    );
}
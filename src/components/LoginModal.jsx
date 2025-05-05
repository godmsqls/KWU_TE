export default function LoginModal({onClose}){

    function handleChangeSelect(e){
        console.log(e.target.value)
    }

    return(
        <div className="LoginModal" onClick={onClose}>
            <div onClick={(e)=>e.stopPropagation()}>
                <div className="X_container">
                    <button  className="X_inmodal" onClick={onClose}>X</button>
                </div>
            
                <h2>로그인</h2>
                <div className="login_option_inmodal">
                    <select className="login_select_inmodal" title="소속을 선택하세요" >
                        <option value="1">인공지능융합대학</option>
                        <option value="2">총학생회</option>
                    </select><br></br>
                    <input className="login_pw_inmodal" type="password" placeholder="비밀번호를 입력하세요"/>
                </div>
                <div className="login_button_wrapper">
                    <button className="login_button_inmodal" type="submit">로그인</button>
                </div>
                
            </div>
        </div>
    );
}
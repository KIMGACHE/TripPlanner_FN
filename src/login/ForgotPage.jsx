import { useNavigate } from "react-router-dom"


const ForgotPage = ()=>{
    const navigate = useNavigate();


    return (
        <div className="forgot-page">
            <h2>아이디 및 비밀번호 찾기</h2>
            <button onClick={()=> navigate("/find-id")}>아이디 찾기</button>
            <button onClick={()=> navigate("/find-password")}>비밀번호 찾기</button>
            </div>
    );
};

export default ForgotPage;
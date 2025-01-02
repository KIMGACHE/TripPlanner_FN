import axios from "axios";
import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom";


const EmailAuthPage = ()=>{
    const [email,setEmail] = useState("");
    const [error,setErorr] = useState("");
    const [message,setMessage] = useState("");
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const userid = searchParams.get("userid"); //URL 에서 사용자 ID 추출

    const handleSubmit = async (e)=>{
        e.preventDefault();
        setErorr("");
        setMessage("");

        try{
            await axios.post("http://localhost:9000/user/send-verify-code",{userid,email});
            setMessage("인증 코드가 이메일로 발송되었습니다. 메일을 확인하세요.");
            navigate(`/verify-code?userid=${userid}&email=${email}`); //인증 코드 입력페이지로 이동
        }catch(err){
            setErorr("인증 코드 발송에 실패했습니다. 이메일을 확인해주세요.");
        }
    };


return (
    <div>
        <h2>이메일 인증</h2>
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">이메일</label>
            <input 
            type="email"
            id="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
            />
            <button type="submit">인증 코드 받기</button>
        </form>
        {message && <p style={{color:"green"}}> {message} </p>}
        {error && <p style={{color:"red"}}> {error} </p> }
    </div>
);

};

export default EmailAuthPage;

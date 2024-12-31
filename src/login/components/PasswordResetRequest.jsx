import { useState } from "react";
import axios from "axios";

const PasswordResetRequest = ()=>{
    const [userid,setUserid] = useState("");
    const [email,setEmail] = useState("");
    const [message,setMessage] = useState("");
    const [error,setError] = useState("");


    const handleSubmit = async (e) =>{
        e.preventDefault();
        setMessage("");
        setError("");
        try{
            await axios.post("http://localhost:9000/user/password-reset",{email});
            setMessage("이메일이 발송되었습니다. 메일을 확인해주세요");
        }catch(err){
            setError("이메일을 찾을 수 없습니다. 다시 시도해 주세요");
        }
    };

    return (
        <div>
            <h2>비밀번호 찾기</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">이메일</label>
                <input 
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
                <button type="submit">재설정 메일 보내기</button>
            </form>
            {message && <p style={{color:"green"}}>{message} </p>}
            {error && <p style={{color:"red"}}>{error} </p>}
        </div>
    );
};


export default PasswordResetRequest;
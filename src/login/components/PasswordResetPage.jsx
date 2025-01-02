import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const PasswordResetPage = ()=>{
    const [newPassword,setNewPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error,setError] = useState("");

    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(newPassword !== confirmPassword){
            setError("비밀번호가 일치하지 않습니다");
            return ;
        }
        setMessage("");
        setError("");
        try{
            const token = localStorage.getItem("resetToken");
            await axios.post("http://localhost:9000/user/reset-password",
            { newPassword }, {
                headers : {Authorization : `Bearer ${token}`},
            });
            setMessage("비밀번호가 성공적으로 변경되었습니다");
        }catch(err){
            setError("비밀번호 변경에 실패했습니다. 링크가 유효하지 않거나 문제가 발생했습니다");
        }
    };

    return (
        <div>
            <h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="newPassword">새 비밀번호</label>
                    <input 
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e)=>setNewPassword(e.target.value)}
                    required
                    />
                    <label htmlFor="confirmPassword">비밀번호 확인</label>
                    <input 
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e)=>setConfirmPassword(e.target.value)}
                    required />
                    <button type="submit">비밀번호 변경</button>
                </form>
                {message && <p style={{ color: "green" }}>{message}</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}
            </h2>
        </div>
    )

}

export default PasswordResetPage;
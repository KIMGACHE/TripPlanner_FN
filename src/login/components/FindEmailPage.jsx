import { useState } from "react"
import axios from "axios";

const FindEmailPage = ()=>{
    const [userid, setUserid] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        try{
            const response = await axios.post("http://localhost:9000/user/find-email",{userid});
            setEmail(response.data.email);
            setMessage("이메일을 확인했습니다. 다음 단계로 진행하세요");
        }catch(err){
            setError("사용자 ID를 찾을 수 없습니다");
        }
    };

    return (
        <div>
            <h2>아이디로 이메일 찾기</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="userid">사용자 ID</label>
                <input 
                type="text"
                id="userid" 
                value={userid}
                onChange={(e)=> setUserid(e.target.value)}
                required
                />
                <button type="submit">이메일 찾기</button>
            </form>
            {email && <p>이메일: {email}</p>}
            {message && <p style={{ color: "green" }}>{message}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default FindEmailPage;
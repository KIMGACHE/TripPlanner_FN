import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";


const UseridInputPage = ()=>{
    const [userid,setUserid] = useState("");
    const [error,setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setError("");

        try{
            await axios.post("http://localhost:9000/user/check-userid", {userid});
            navigate(`/email-auth?userid=${userid}`); //이메일 인증 페이지로 이동
        }catch(err){
            setError("해당 사용자 ID가 존재하지 않습니다.");
        }
    };

    return (
        <div>
            <h2>사용자 ID 확인</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="userid">사용자 ID</label>
                <input 
                type="text"
                id="userid"
                value={userid}
                onChange={(e)=>setUserid(e.target.value)}
                required
                />
                <button type="submit">다음</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};


export default UseridInputPage;
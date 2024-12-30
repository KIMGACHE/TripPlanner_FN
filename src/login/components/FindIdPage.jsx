import axios from "axios";
import { useState } from "react"

const FindIdPage = ()=>{

    const [email , setEmail] = useState("");
    const [message , setMessage] = useState("");

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setMessage("");
        try{
            const response = await axios.post("http://localhost:9000/user/findId",{email} );
            setMessage(`아이디 ${response.data.userid}`);
        }catch(error){
            setMessage("이메일에 해당하는 아이디를 찾을 수 없습니다");
        }
    };

    return (
        <div className="find-id-page">
            <h2>아이디 찾기</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">이메일</label>
                <input 
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e)=> setEmail(e.target.value) }
                required
                />
                <button type="submit">아이디 찾기</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};


export default FindIdPage;
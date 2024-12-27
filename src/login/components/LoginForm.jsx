import { useState } from "react";
import axios from "axios";


const LoginForm = () =>{
    const [formData , setFormData] = useState({userid:'',password:''});
    const [error,setError] = useState(null);

    //입력 값 변경 처리
    const handleChange = (e)=>{
        const {name,value} = e.target;
        setFormData((prev)=>({...prev,[name]: value,}));
    };

    //로그인 요청
    const handleSubmit = async (e) =>{
        e.preventDefault();
        setError(null); //이전 에러 초기화
        try{
            const response = await axios.post('http://localhost:9000/login',formData,{
                headers : {
                    'Content-Type': 'application/json',
                },
            });
            console.log('로그인 성공:' , response.data);
            //로그인 성공 시 처리
            alert('로그인 성공 !');
        }catch(err){
            console.log("로그인 실패,",err);
            setError('로그인에 실패했습니다. 다시 시도해주세요');
        }
    };

    return (
        
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="userid">유저 ID:</label>
                <input 
                type="text" 
                id="userid" 
                name="userid" 
                value={formData.userid} 
                onChange={handleChange} 
                required/>
            </div>
            <div>
                <label htmlFor="password">PASSWORD :</label>
                <input 
                type="text" 
                id="password" 
                name="password" 
                value={formData.password}
                onChange={handleChange}
                required/>
            </div>
            {error && <p style={{ color: 'red'}}>{error}</p>}
            <button type="submit">로그인</button>
        </form>
    );
};

export default LoginForm;
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"


const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {

<<<<<<< HEAD
        axios.post('http://localhost:9000/user/logout',{},{withCredentials:true})
        .then((response)=>{
            console.log("로그아웃 성공",response.data);
            localStorage.removeItem("userid");
            window.location.href="/";
        })      
        .catch((error) =>{
            console.log("로그아웃 실패.",error);
        });
    },[navigate]);
=======
        axios.post('http://localhost:9000/user/logout', {}, { withCredentials: true })
            .then((response) => {
                console.log("로그아웃 성공", response.data);

                window.location.href = "/";

            })
            .catch((error) => {
                console.log("로그아웃 실패.", error);
            });
    }, [navigate]);
>>>>>>> imsi4

    return (
        <div>
            <h1>로그아웃 중...</h1>
        </div>
    );
};

export default Logout;
import { useState, useEffect } from "react";
import axios from "axios";

const useMyPlanner = () => {
  const [planners, setPlanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 쿠키에서 AccessToken 읽기
  const getAccessTokenFromCookies = () => {
    const cookies = document.cookie.split("; ");
    console.log("현재 쿠키:", cookies); // 디버깅 추가
    const accessTokenCookie = cookies.find((row) => row.startsWith("accessToken="));
    if (accessTokenCookie) {
      console.log("AccessToken 발견:", accessTokenCookie); // 디버깅 추가
      return accessTokenCookie.split("=")[1];
    }
    console.warn("AccessToken이 쿠키에 없습니다."); // 디버깅 추가
    return null;
  };

  const fetchPlanners = async () => {
    try {
      setLoading(true);
      console.log("플래너 요청 시작");
  
      const response = await axios.get(
        "http://localhost:9000/user/mypage/my-planners",
        {
          withCredentials: true,
        }
      );
  
      console.log("플래너 데이터 가져오기 성공:", response.data);
      setPlanners(response.data);
    } catch (err) {
      console.error("플래너 데이터를 가져오는 중 오류:", err.response || err);
      setError("플래너 데이터를 가져오는 중 오류가 발생했습니다.");
    } finally {
      console.log("플래너 요청 종료");
    }
  };
  

  useEffect(() => {
    fetchPlanners();
  }, []);

  return { planners, loading, error };
};

export default useMyPlanner;

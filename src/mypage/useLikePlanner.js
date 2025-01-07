import { useState, useEffect } from "react";
import axios from "axios";

const useLikePlanner = (userid) => {
  const [likedPlanners, setLikedPlanners] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // userid 유효성 검사
    if (!userid || userid.trim() === "") {
      console.error("유효하지 않은 userid:", userid);
      return; // userid가 비어 있다면 API 호출하지 않음
    }

    console.log("useLikePlanner에서 요청할 userid:", userid);

    const fetchLikedPlanners = async () => {
      setLoading(true);
      try {
        // 백엔드 API 호출
        const response = await axios.get(`http://localhost:9000/user/mypage/${userid}/liked-planners`);
        console.log("좋아요한 플래너 데이터:", response.data);
        setLikedPlanners(response.data); // API 응답 데이터 저장
      } catch (error) {
        console.error("좋아요한 플래너 데이터를 가져오는 데 실패했습니다:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLikedPlanners();
  }, [userid]);

  return { likedPlanners, loading };
};

export default useLikePlanner;

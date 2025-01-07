import React from "react";
import useLikePlanner from "./useLikePlanner";

const LikePlanner = ({ userId }) => {
  const { likePlanner, loading, error } = useLikePlanner(userId);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error}</div>;

  return (
    <div className="liked-planners">
      <h3>내가 좋아요한 플래너</h3>
      {likePlanner.length === 0 ? (
        <p>좋아요한 플래너가 없습니다.</p>
      ) : (
        <ul>
          {likePlanner.map((planner) => (
            <li key={planner.plannerID} className="planner-item">
              <h4>{planner.plannerTitle}</h4>
              <p>지역: {planner.area}</p>
              <p>여행 일수: {planner.day}일</p>
              <p>설명: {planner.description}</p>
              <p>생성 날짜: {planner.createAt}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LikePlanner;

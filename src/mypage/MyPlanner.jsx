// import React from "react";
// import useMyPlanner from "./useMyPlanner";

// const MyPlanner = () => {
//   const { planners, loading, error } = useMyPlanner();

//   console.log("플래너 렌더링 상태:", { planners, loading, error }); // 디버깅 추가

//   if (loading) return <div>로딩 중...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div className="my-planner-container">
//       <h3>내가 만든 Planner 목록</h3>
//       {planners.length === 0 ? (
//         <p>작성된 플래너가 없습니다.</p>
//       ) : (
//         <ul>
//           {planners.map((planner) => (
//             <li key={planner.plannerID} className="planner-item">
//               <h4>{planner.plannerTitle}</h4>
//               <p>지역: {planner.area}</p>
//               <p>여행 일수: {planner.day}일</p>
//               <p>설명: {planner.description}</p>
//               <p>생성 날짜: {planner.createAt}</p> {/* 디버깅 추가 */}
//               <p>수정 날짜: {planner.updateAt}</p> {/* 디버깅 추가 */}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default MyPlanner;

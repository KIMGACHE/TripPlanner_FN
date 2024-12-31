
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import TravelCourse from './tourist/TravelCourse.jsx';
import TravelCourseInfo from './tourist/TravelCourseInfo.jsx';
import Tourist from './tourist/Tourist.jsx';
import TouristInfo from './tourist/TouristInfo.jsx';
import Board from './planner/Board.jsx';
import DestinationInfo from './planner/DestinationInfo.jsx';
import Destination from './planner/Destination.jsx';
import MakePlanner from './planner/makePlanner/MakePlanner.jsx';
import LoginForm from './login/LoginForm.jsx';
import Join from './join/Join.jsx';
import ForgotPage from './login/ForgotPage.jsx';
import FindIdPage from './login/components/FindIdPage.jsx';
import PasswordResetRequest from './login/components/PasswordResetRequest.jsx';
import PasswordResetPage from './login/components/PasswordResetPage.jsx';

const App = () => {
  return (

    <Router>
      <Link to="/tourist">
        <button>관광지</button>
      </Link>
      <Link to="/travelcourse">
        <button>추천코스</button>
      </Link>

      <Link to="/planner/board">
        <button>게시판</button>
      </Link>

      <Link to="/user/join">
        <button>회원가입</button>
      </Link>

      <Link to="/user/login">
        <button>로그인</button>
      </Link>

      <Link to="/makePlanner">
        <button>플래너 만들기</button>
      </Link>

      <Routes>

        {/* 회원가입 페이지 */}
        <Route path="/user/join" element={<Join />}> </Route>

        {/* 로그인 */}
        <Route path="/user/login" element={<LoginForm />}> </Route>
        <Route path="/forgot" element={<ForgotPage />}> </Route>
        <Route path="/find-id" element={<FindIdPage />}> </Route>
        <Route path="/find-password" element={<PasswordResetRequest />}> </Route>
        <Route path="/reset-password" element={<PasswordResetPage />}> </Route>



        
        {/* 플래너 생성 */}
        <Route path="/makePlanner" element={< MakePlanner />}></Route>

        {/* 관광지 코스 */}
        <Route path="/travelcourse" element={< TravelCourse />}></Route>

        {/* 관광지 코스 자세히 보기 */}
        <Route path="/travelcourse-info" element={< TravelCourseInfo />}></Route>

        {/* 관광지 리스트 */}
        <Route path="/tourist" element={<Tourist />}></Route>

        {/* 관광지 자세히 보기 */}
        <Route path="/tourist-info" element={<TouristInfo />}></Route>

        {/* 게시판 */}
        <Route path="/planner/board" element={<Board />}></Route>

        {/* 게시판 중간 페이지 */}
        <Route path="/planner/board/destination" element={<Destination />}></Route>

        {/* 게시판 자세히 보기 */}
        <Route path="/planner/board/destination/info" element={<DestinationInfo />}></Route>
      </Routes>

    </Router>


  );
}

export default App;

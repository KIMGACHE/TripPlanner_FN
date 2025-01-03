
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import TravelCourse from '../tourist/TravelCourse.jsx';
import TravelCourseInfo from '../tourist/TravelCourseInfo.jsx';
import Tourist from '../tourist/Tourist.jsx';
import TouristInfo from '../tourist/TouristInfo.jsx';
import Board from '../board/Board.jsx';
import MakePlanner from '../planner/makePlanner/MakePlanner.jsx';
import LoginForm from '../login/LoginForm.jsx';
import Join from '../join/Join.jsx';
import Main from './Main.jsx';
import BoardInfo from '../board/BoardInfo.jsx';

const Body = () => {
    return (

        <Routes>

            {/* 메인 페이지 */}
            <Route path="/" element={<Main />}></Route>

            {/* 회원가입 페이지 */}
            <Route path="/user/join" element={<Join />}> </Route>

            {/* 로그인 */}
            <Route path="/user/login" element={<LoginForm />}></Route>

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

            {/* 게시판 자세히 보기 */}
            <Route path="/planner/board/destination" element={<BoardInfo />}></Route>

        </Routes>

    );
};

export default Body;

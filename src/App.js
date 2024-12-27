import logo from './logo.svg';
import './App.css';
import MakePlanner from './planner/makePlanner/MakePlanner';
import {useState, useEffect} from 'react';
import React from 'react';
import StartPage from './planner/StartPage/StartPage';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'; // BrowserRouter를 올바르게 임포트

function App() {

  return (
    <BrowserRouter> {/* Router -> BrowserRouter로 수정 */}
      <Link to="/planner/makePlanner">플래너 만들기</Link>

      <Routes>
        <Route path="/planner/makePlanner" element={<MakePlanner />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Join from "./Join"; // 올바른 경로
import CalendarComponent from "./CalendarComponent";
import ATest from "./ATest";
import Mypage from "./Mypage";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <Link to="/user/join">JOIN</Link> <br />
        <Link to="/CalendarComponent">CalendarComponent</Link><br/>
        <Link to="/ATest">ATest</Link><br/>
        <Link to="/user/mypage">Mypage</Link> <br />
      </div>

      <Routes>
        <Route path="/user/join" element={<Join />} />
        <Route path="/ATest" element={<ATest />} />
        <Route path="/CalendarComponent" element={<CalendarComponent />} />
        <Route path="/user/mypage" element={<Mypage />} />
      </Routes>
    </Router>
  );
}

export default App;

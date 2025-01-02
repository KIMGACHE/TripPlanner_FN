import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.scss";
import LogoImage from "../images/logoImage.png";
import LogoTitle from "../images/logotitle.png";
import { useState,useEffect } from "react";
import axios from "axios";

const Header = () => {
  const location = useLocation();


  const [isLogin, setIsLogin] = useState(false);

  // 쿠키를 통한 로그인 상태 확인
  useEffect(() => {
    // 쿠키를 포함한 요청을 통해 로그인 상태 확인
    axios
      .post(
        "http://localhost:9000/api/cookie/validate",
        {},
        { withCredentials: true }
      )
      .then((response) => {
        console.log("쿠키 확인:", response.data);
        // 쿠키가 유효하면 로그인 상태로 설정
        setIsLogin(true);
      })
      .catch((error) => {
        console.error("쿠키 오류:", error);
        setIsLogin(false); // 인증 실패 시 로그인 상태 false로 설정
      });
  }, []);


  // 특정 경로에서는 Header를 표시하지 않음
  if (location.pathname === "/planner/board/destination") {
    return null;
  }

  return (
    <header className="header-wrapper">
      <Link className="header-logo" to="/">
        <img className="logoImage" src={LogoImage} alt="logo"></img>
        <img className="logoTitle" src={LogoTitle} alt="logo"></img>
      </Link>

      <div className="header-btns">
        {!isLogin ? (
          <>
            <Link to="/user/login">
              <button className="login-btn">로그인</button>
            </Link>
            <Link to="/user/join">
              <button className="join-btn">회원가입</button>
            </Link>
          </>
        ) : (
          <Link to="/user/logout">
            <button className="logout-btn">로그아웃</button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;

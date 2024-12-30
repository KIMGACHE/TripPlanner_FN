
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import LogoImage from '../images/logoImage.png';
import LogoTitle from '../images/logotitle.png';

const Header = () => {
    return (
        <header className="header-wrapper">


            {/* <Link to="/">
                    <button>메인페이지</button>
                </Link>

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
                </Link> */}
            {/* <Link to="/">
                <img className="logoImage" src={LogoImage} alt="logo"></img>
            </Link> */}
            <Link className="header-logo" to="/">
                <img className="logoImage" src={LogoImage} alt="logo"></img>
                <img className="logoTitle" src={LogoTitle} alt="logo"></img>
            </Link>



            <div className="header-btns">
                <Link to="/user/login">
                    <button className="login-btn">로그인</button>
                </Link>
                <Link to="/user/join">
                    <button className="join-btn">회원가입</button>
                </Link>
            </div>

        </header>
    );
};

export default Header;

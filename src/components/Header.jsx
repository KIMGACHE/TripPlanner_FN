
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.scss';
import LogoImage from '../images/logoImage.png';
import LogoTitle from '../images/logotitle.png';

const Header = () => {

    const location = useLocation();

    // 특정 경로에서는 Header를 표시하지 않음
    if (location.pathname === '/planner/board/destination') {
        return null;
    }
    if (location.pathname === '/makePlanner') {
        return null;
    }

    return (
        <header className="header-wrapper">

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

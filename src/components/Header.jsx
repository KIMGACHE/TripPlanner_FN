
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import LogoImage from '../images/logoImage.png';
import LogoTitle from '../images/logotitle.png';

const Header = () => {
    return (
        <header className="header-wrapper">

            <Link className="header-logo" to="/">
                <img className="logoImage" src={LogoImage} alt="logo"></img>
                <img className="logoTitle" src={LogoTitle} alt="logo"></img>
                <img className="logoTitle" src={LogoTitle} alt="logo"></img>
            </Link>



            <div className="header-btns">
                <Link to="/user/login">
                    <button className="login-btn">로그인</button>
                </Link>
                <Link to="/user/join">
                    <button className="join-btn">회원가입</button>
                </Link>
                <Link to="/user/mypage">
                    <button className="join-btn">마이페이지지</button>
                </Link>
            </div>

        </header>
    );
};

export default Header;

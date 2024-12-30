import { useState } from "react";
import axios from "axios";
<<<<<<< HEAD
import "./LoginForm.scss";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    userid: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = useState(null);

  //입력 값 변경 처리
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: fieldValue }));
  };

  const handleSocialLogin = (provider) => {
    window.location.href = `/oauth2/authorization/${provider}`;
  };

  const handleLogin = () => {
    console.log("네이버 로그인 클릭");
    window.location.href = "http://localhost:9000/oauth2/authorization/naver";
  };
  

  //로그인 요청
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    setError(null); //이전 에러 초기화
    try {
      const response = await axios.post(
        "http://localhost:9000/user/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, //쿠키 저장
        }
      );
      console.log("로그인 성공:", response.data);
      //로그인 성공 시 처리
      alert("로그인 성공 !");
    } catch (err) {
      console.log("로그인 실패,", err);
      setError("로그인에 실패했습니다. 다시 시도해주세요");
    }
  };

  return (
    <div className="wrapper">
      <div className="logo">로고 들어갈 부분</div>
      <div className="login">
        <form onSubmit={handleSubmit}>
          <label htmlFor="userid">유저 ID:</label>
          <input
            type="text"
            id="userid"
            name="userid"
            value={formData.userid}
            onChange={handleChange}
            required
          />
          <label htmlFor="password">PASSWORD:</label>
          <input
            type="text"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <div className="checkbox">
            <label>ID 저장</label>
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button className="loginButton" type="submit">
            로그인
          </button>
        </form>
      </div>
      <div className="join">
        아직 회원이 아니세요? <a href="/user/join">회원가입</a>
      </div>
      <hr />
      <div className="oauth2">
        <div style={{ textAlign: "center" }}>SNS 간편 로그인</div>
        <div className="oauth2-buttons">
          <ul>
            <li>
              <a href="/oauth2/authorization/kakao" title="카카오로그인">
                <img src="/images/kakaobutton.png" alt="카카오로그인" />
              </a>
            </li>
            <li>
              <button
                className="oauth2-button"
                onClick={handleLogin}
              >
                <img src="/images/naverbutton.png" alt="네이버 로그인" />
              </button>
            </li>
            <li>
              <a href="/oauth2/authorization/google" title="구글 로그인">
                <img src="/images/googlebutton.png" alt="구글 로그인" />
              </a>
            </li>
            <li>
              <a href="/oauth2/authorization/instagram" title="인스타로그인">
                <img src="/images/instabutton.png" alt="인스타 로그인" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

import axios from "axios";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const VerifyCodePage = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      await axios.post("http://localhost:9000/user/verify-code", { email, code });
      setMessage("인증 성공!");
      navigate(`/reset-password?email=${email}`); //비밀번호 재설정 페이지로 이동
    } catch (err) {
      setError("인증 코드가 유효하지 않습니다. 다시 시도해 주세요");
    }
  };

  return (
    <div>
      <h2>인증 코드 입력</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="code">인증 코드</label>
        <input
          type="text"
          id="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <button type="submit">확인</button>
      </form>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default VerifyCodePage;
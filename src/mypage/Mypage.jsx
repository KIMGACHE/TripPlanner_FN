import React, { useState, useEffect } from "react";
import axios from "axios";
import useMyPage from "./useMyPage"; // import your custom hook

const Mypage = () => {
  const {
    formData,
    setFormData,
    imagePreview,
    setImagePreview,
    validationMessages,
    setValidationMessages,
    authCodeSent,
    setAuthCodeSent,
    timer,
    isAuthCodeVerified,
    setIsAuthCodeVerified,
    fileInputRef,
    handleDrop,
    handleDragOver,
    handleFileInputClick,
    handleImageUpload,
    handleCancelImage,
    handleChange,
    checkEmail,
    sendAuthCode,
    verifyAuthCode,
    isAuthCodeLocked,
    resetAuthState,
    setIsAuthCodeLocked, // 인증 코드 버튼 잠금 상태 업데이트 함수
    handleFileChange,
  } = useMyPage(); // Using the custom hook

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [isPasswordEditing, setIsPasswordEditing] = useState(false); // 비밀번호 편집 상태
  const [isEmailEditing, setIsEmailEditing] = useState(false); // 이메일 편집 상태

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const validateResponse = await axios.post(
          "http://localhost:9000/api/cookie/validate",
          {},
          { withCredentials: true }
        );

        if (!validateResponse.data.success) {
          setError("Authentication failed: " + validateResponse.data.message);
          setLoading(false);
          return;
        }

        const response = await axios.get("http://localhost:9000/user/mypage", {
          headers: {
            Authorization: `Bearer ${validateResponse.data.accessToken}`,
          },
          withCredentials: true,
        });

        setUserData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load user data.");
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (userData) {
      setFormData({
        profileImage: userData.img || "/ProfileImg/anonymous.jpg",
        userid: userData.userid,
        username: userData.username,
        email: userData.email,
        password: "",
        repassword: "",
      });
    }
  }, [userData, setFormData]);

  const handleSaveChanges = async () => {
    try {
      await axios.put(
        "http://localhost:9000/user/mypage",
        {
          profileImg: formData.profileImage,
          userid: formData.userid,
          useremail: formData.email,
          password: formData.password,
        },
        { withCredentials: true }
      );
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to save changes:", err);
    }
  };

  const handleCancelChanges = () => {
    setFormData({
      profileImage: userData?.img || "/ProfileImg/anonymous.jpg",
      userid: userData?.userid || "",
      username: userData?.username || "",
      email: userData?.email || "",
      password: "",
      repassword: "",
    });
    setIsEditing(false);
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>오류 발생: {error}</div>;
  }

  const handlePasswordChange = () => {
    setIsPasswordEditing(true);
  };

  const handleEmailChange = () => {
    setIsEmailEditing(true); // 이메일 편집 활성화
  };

  return (
    <div className="mypage-container">
      <h2>마이페이지</h2>

      <div className="user-info">
        {isEditing ? (
          <>
            <div
              className="image-preview-container"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <img
                src={imagePreview}
                alt="미리보기"
                className="circle-preview"
              />
            </div>
            <div id="imgbutton">
              <button id="imgupload" type="button" onClick={handleFileInputClick}>
                이미지 업로드
              </button>
              {formData.profileImage && (
                <button
                  id="imgcancel"
                  type="button"
                  onClick={handleCancelImage}
                  style={{ marginLeft: "10px", color: "red" }}
                >
                  이미지 취소
                </button>
              )}
              <input
                ref={fileInputRef}
                id="fileInput"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>

            <div>{userData.userid}</div>
            <input
              type="text"
              name="username"
              placeholder="이름"
              onChange={handleChange}
            />
            {validationMessages.username && (
              <div
                className={`validation-message ${validationMessages.usernameColor}`}
              >
                {validationMessages.username}
              </div>
            )}

            <div className={`emailbox ${validationMessages.email ? "has-message" : ""}`}>
              <div className="email-wrapper">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="이메일 입력"
                  onChange={handleChange}
                  disabled={!isEmailEditing}
                />
                {isEmailEditing ? (
                  <>
                    <button
                      className="emailbutton"
                      type="button"
                      onClick={sendAuthCode}
                      disabled={isAuthCodeLocked}
                    >
                      인증 코드 받기
                    </button>
                    <button
                      className="cancel-email-editing"
                      type="button"
                      onClick={() => {
                        setIsEmailEditing(false);
                        setFormData((prev) => ({
                          ...prev,
                          email: userData.email,
                        }));
                        resetAuthState();
                      }}
                    >
                      취소
                    </button>
                  </>
                ) : (
                  <button
                    className="edit-email"
                    type="button"
                    onClick={() => setIsEmailEditing(true)}
                  >
                    이메일 수정
                  </button>
                )}
              </div>
              {validationMessages.email && (
                <div
                  className={`validation-message ${validationMessages.emailColor}`}
                >
                  {validationMessages.email}
                </div>
              )}
            </div>

            <div className="password-box">
              <input
                type="password"
                name="password"
                value={formData.password}
                placeholder="새 비밀번호"
                onChange={handleChange}
                disabled={!isPasswordEditing}
              />

              {isPasswordEditing && (
                <input
                  type="password"
                  name="repassword"
                  value={formData.repassword}
                  placeholder="비밀번호 확인"
                  onChange={handleChange}
                />
              )}

              <div className="password-buttons">
                {!isPasswordEditing ? (
                  <button
                    className="passwordbutton"
                    type="button"
                    onClick={handlePasswordChange}
                  >
                    비밀번호 변경
                  </button>
                ) : (
                  <>
                    <button
                      className="password-save-button"
                      type="button"
                      onClick={() => setIsPasswordEditing(false)}
                    >
                      저장
                    </button>
                    <button
                      className="password-cancel-button"
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          password: "",
                          repassword: "",
                        }));
                        setIsPasswordEditing(false);
                      }}
                    >
                      취소
                    </button>
                  </>
                )}
              </div>

              {validationMessages.password && (
                <div
                  className={`validation-message ${validationMessages.passwordColor}`}
                >
                  {validationMessages.password}
                </div>
              )}
              {validationMessages.repassword && (
                <div
                  className={`validation-message ${validationMessages.repasswordColor}`}
                >
                  {validationMessages.repassword}
                </div>
              )}
            </div>

            <button onClick={handleSaveChanges}>저장</button>
            <button onClick={handleCancelChanges}>취소</button>
          </>
        ) : (
          <>
            <img
              src={
                userData.img
                  ? `http://localhost:9000${userData.img}`
                  : "/ProfileImg/anonymous.jpg"
              }
              alt="프로필 사진"
              className="profile-img"
            />

            <div>{`http://localhost:9000${userData.img}`}</div>

            <p>아이디: {userData.userid}</p>
            <p>이름: {userData.username}</p>
            <p>이메일: {userData.email}</p>
            <p>성별: {userData.gender}</p>

            <button onClick={() => setIsEditing(true)}>수정</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Mypage;

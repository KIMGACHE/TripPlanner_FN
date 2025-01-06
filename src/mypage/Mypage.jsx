import React, { useState, useEffect } from "react";
import axios from "axios";
import useFileAndImageHandler from "./useFileAndImageHandler";
import useFormDataHandler from "./useFormDataHandler";
import useValidationHandler from "./useValidationHandler";
import useAuthHandler from "./useAuthHandler";
import "./Mypage.scss";
import MyPlanner from "./MyPlanner";

const Mypage = () => {
  const {
    imagePreview,
    fileInputRef,
    handleFileInputClick,
    handleDrop,
    handleDragOver,
    handleCancelImage,
    handleResetToDefaultImage,
    handleImageUpload,
    handleCancelChanges,
    handleFileChange,
  } = useFileAndImageHandler();

  const { setFormData, 
    updateFormData,
    handleCancelEmailEditing,
    handleEmailChange,
    handleUsernameChange,
    handleChange,
  } = useFormDataHandler();


  const {
    validationMessages,
    setValidationMessages,
    validatePassword,
    validateEmail,
    validateUsername,
    handlePasswordChange,
    handlePasswordEditClick,
    handleCancelPasswordEditing,
  } = useValidationHandler();

  const {
    authCodeSent,
    isAuthCodeLocked,
    timer,
    sendAuthCode,
    verifyAuthCode,
    handleSaveChanges,
  } = useAuthHandler();

  const { formData } = useFormDataHandler(); // 추가
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [isEmailEditing, setIsEmailEditing] = useState(false);
  const [isPasswordEditing, setIsPasswordEditing] = useState(false);


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        await axios.post("http://localhost:9000/api/cookie/validate", {}, { withCredentials: true });

        const userResponse = await axios.get("http://localhost:9000/user/mypage", { withCredentials: true });
        setUserData(userResponse.data);
        setFormData({
          profileImage: userResponse.data.img || "/ProfileImg/anonymous.jpg",
          userid: userResponse.data.userid || "",
          username: userResponse.data.username || "",
          email: userResponse.data.email || "",
          gender: userResponse.data.gender || "",
        });
        setLoading(false);
      } catch (err) {
        console.error("오류:", err);
        setError("사용자 데이터를 가져오는 중 오류가 발생했습니다.");
        setLoading(false);
      }
    };

    fetchUserData();
  }, [setFormData]);


  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;
  if (!userData) return <div>데이터를 불러오지 못했습니다.</div>;
  


  // const handleSaveChanges = async () => {
  //   const noChanges =
  //     formData.profileImage === (userData.img || "/ProfileImg/anonymous.jpg") &&
  //     formData.username === userData.username &&
  //     formData.email === userData.email &&
  //     formData.password === "" &&
  //     formData.repassword === "" &&
  //     !isPasswordEditing;
  
  //   if (noChanges) {
  //     alert("변경된 사항이 없습니다.");
  //     return;
  //   }
  
  //   if (isPasswordEditing && !isPasswordValid) {
  //     alert("비밀번호 확인을 다시 확인해주세요.");
  //     return;
  //   }
  
  //   if (isEmailEditing && !isAuthCodeLocked) {
  //     alert("이메일 인증을 완료해주세요.");
  //     return;
  //   }
  
  //   try {
  //     const response = await axios.put(
  //       "http://localhost:9000/user/mypage/userupdate",
  //       {
  //         username: formData.username,
  //         email: formData.email,
  //         password: formData.password,
  //         profileImg: formData.profileImage,
  //       },
  //       { withCredentials: true }
  //     );
  
  //     const userResponse = await axios.get("http://localhost:9000/user/mypage", {
  //       withCredentials: true,
  //     });
  
  //     setUserData(userResponse.data);
  //     setFormData({
  //       profileImage: userResponse.data.img || "/ProfileImg/anonymous.jpg",
  //       userid: userResponse.data.userid,
  //       username: userResponse.data.username,
  //       email: userResponse.data.email,
  //       gender: userResponse.data.gender,
  //     });
  //     setImagePreview(userResponse.data.img || "/ProfileImg/anonymous.jpg");
  
  //     alert("유저 정보가 성공적으로 변경되었습니다.");
  //     setIsEditing(false);
  //   } catch (err) {
  //     console.error("유저 정보 변경 중 오류:", err);
  //     setValidationMessages((prev) => ({
  //       ...prev,
  //       username: "서버 오류로 유저 정보를 변경할 수 없습니다.",
  //       usernameColor: "validation-error",
  //     }));
  //   }
  // };
  

  return (
    <div className="mypage-container">
      <h2>{userData.username}님의 마이페이지</h2>
      <div className="user-info">
        {isEditing ? (
          <>
          <div className="image-preview-container" onDrop={handleDrop} onDragOver={handleDragOver}>
        <img
          src={imagePreview}
          alt="미리보기"
          className="circle-preview"
          style={{ width: "150px", height: "150px", borderRadius: "50%" }}
        />
      </div>
      <div id="imgbutton">
        <button type="button" onClick={handleFileInputClick}>
          이미지 업로드
        </button>
        <button type="button" onClick={handleCancelImage}>
          이미지 취소
        </button>
        <button type="button" onClick={handleResetToDefaultImage}>
          기본 이미지로 변경
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>

            {/* Username */}
            <input
              type="text"
              name="username"
              placeholder="이름"
              value={formData.username}
              onChange={handleUsernameChange}
            />
            {validationMessages.username && (
              <div className={`validation-message ${validationMessages.usernameColor}`}>
                {validationMessages.username}
              </div>
            )}

            {/* Email */}
            <div
              className={`emailbox ${
                validationMessages.email ? "has-message" : ""
              }`}
            >
              <div className="email-wrapper">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="이메일 입력"
                  onChange={handleEmailChange}
                  disabled={!isEmailEditing}
                />
                {isEmailEditing ? (
                  <>
                    <button
                      type="button"
                      onClick={sendAuthCode}
                    >
                      인증 코드 받기
                    </button>
                    <button type="button" onClick={handleCancelEmailEditing}>
                      취소
                    </button>
                  </>
                ) : (
                  <button type="button" onClick={() => setIsEmailEditing(true)}>
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

            {/* Auth Code */}
            {authCodeSent && validationMessages.emailColor === "validation-success" && (
              <div className="auth-codebox">
                <div className="auth-code-wrapper">
                  <input
                    type="text"
                    name="authCode"
                    placeholder="인증 코드 입력"
                    value={formData.authCode}
                    onChange={handleChange}
                    disabled={isAuthCodeLocked}
                  />
                  <div id="timer">
                    {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, "0")}
                  </div>
                  <button
                    type="button"
                    onClick={verifyAuthCode}
                    disabled={isAuthCodeLocked}
                  >
                    인증 코드 확인
                  </button>
                </div>
                {validationMessages.authCode && (
                  <div
                    className={`validation-message ${validationMessages.authCodeColor}`}
                  >
                    {validationMessages.authCode}
                  </div>
                )}
              </div>
            )}

              
            
          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={formData.password}
            onChange={handlePasswordChange}
             disabled={!isPasswordEditing} // 잠금 상태 제어
          />

          {isPasswordEditing && validationMessages.password && (
            <div className={`validation-message ${validationMessages.passwordColor}`}>
              {validationMessages.password}
            </div>
          )}

          {/* Confirm Password */}
          {isPasswordEditing && (
            <input
              type="password"
              name="repassword"
              value={formData.repassword}
              placeholder="비밀번호 확인"
              onChange={handlePasswordChange}
            />
          )}
          {isPasswordEditing && validationMessages.repassword && (
            <div className={`validation-message ${validationMessages.repasswordColor}`}>
              {validationMessages.repassword}
            </div>
          )}

          {/* Buttons */}
          <div>
            {!isPasswordEditing ? (
              <button type="button" onClick={handlePasswordEditClick}>
                비밀번호 변경
              </button>
            ) : (
              <button type="button" onClick={handleCancelPasswordEditing}>
                변경 취소
              </button>
            )}
            </div> 

            <div>
              <button type="button" onClick={handleSaveChanges}>유저 정보 변경</button>
              <button type="button" onClick={handleCancelChanges}>취소</button>
            </div>
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
            <p>아이디: {userData.userid}</p>
            <p>이메일: {userData.email}</p>
            <p>성별 : {userData.gender}</p>
            {/* <p>생년월일{userData.birth}</p> */}
            <button onClick={() => setIsEditing(true)}>수정</button>
          </>
          
        )}
      </div>
         {/* MyPlanner 컴포넌트 추가 */}
        <MyPlanner />

    </div>
  );
};

export default Mypage;
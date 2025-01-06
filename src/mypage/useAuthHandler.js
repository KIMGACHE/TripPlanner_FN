// import { useState, useCallback, useEffect } from "react";
// import axios from "axios";

// const useAuthHandler = () => {
//   const [authCodeSent, setAuthCodeSent] = useState(false);
//   const [isAuthCodeLocked, setIsAuthCodeLocked] = useState(false);
//   const [timer, setTimer] = useState(180);
//   const [intervalId, setIntervalId] = useState(null);

//   const startTimer = useCallback(() => {
//     setTimer(180);
//     if (intervalId) clearInterval(intervalId);
//     const newIntervalId = setInterval(() => {
//       setTimer((prev) => {
//         if (prev <= 1) {
//           clearInterval(newIntervalId);
//           setAuthCodeSent(false);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//     setIntervalId(newIntervalId);
//   }, [intervalId]);

//   const sendAuthCode = useCallback(async (email) => {
//     if (!email) return "이메일을 입력해주세요.";

//     try {
//       const response = await axios.post("http://localhost:9000/user/send-auth-code", { email }, {
//         headers: { "Content-Type": "application/json" },
//       });

//       if (response.data.status === "success") {
//         setAuthCodeSent(true);
//         startTimer();
//         return "인증 코드가 발송되었습니다.";
//       } else {
//         return response.data.message || "인증 코드 발송 실패.";
//       }
//     } catch (error) {
//       console.error(error);
//       return "서버 오류로 인증 코드를 발송할 수 없습니다.";
//     }
//   }, [startTimer]);

//   const verifyAuthCode = useCallback(async (email, code) => {
//     try {
//       const response = await axios.post("http://localhost:9000/user/verify-auth-code", { email, code });
//       if (response.data.message.includes("완료")) {
//         clearInterval(intervalId);
//         setIsAuthCodeLocked(true);
//         return "인증이 완료되었습니다.";
//       }
//       return "인증번호가 올바르지 않습니다.";
//     } catch (error) {
//       console.error(error);
//       return "서버 오류로 인증을 완료할 수 없습니다.";
//     }
//   }, [intervalId]);

//   const handleSaveChanges = useCallback(async (formData, userData, setFormData, setUserData, setValidationMessages, setImagePreview, setIsEditing) => {
//     const noChanges =
//       formData.profileImage === (userData.img || "/ProfileImg/anonymous.jpg") &&
//       formData.username === userData.username &&
//       formData.email === userData.email &&
//       formData.password === "" &&
//       formData.repassword === "";

//     if (noChanges) {
//       alert("변경된 사항이 없습니다.");
//       return;
//     }

//     try {
//       const response = await axios.put(
//         "http://localhost:9000/user/mypage/userupdate",
//         {
//           username: formData.username,
//           email: formData.email,
//           password: formData.password,
//           profileImg: formData.profileImage,
//         },
//         { withCredentials: true }
//       );

//       const userResponse = await axios.get("http://localhost:9000/user/mypage", {
//         withCredentials: true,
//       });

//       setUserData(userResponse.data);
//       setFormData({
//         profileImage: userResponse.data.img || "/ProfileImg/anonymous.jpg",
//         userid: userResponse.data.userid,
//         username: userResponse.data.username,
//         email: userResponse.data.email,
//         gender: userResponse.data.gender,
//       });
//       setImagePreview(userResponse.data.img || "/ProfileImg/anonymous.jpg");

//       alert("유저 정보가 성공적으로 변경되었습니다.");
//       setIsEditing(false);
//     } catch (err) {
//       console.error("유저 정보 변경 중 오류:", err);
//       setValidationMessages((prev) => ({
//         ...prev,
//         username: "서버 오류로 유저 정보를 변경할 수 없습니다.",
//         usernameColor: "validation-error",
//       }));
//     }
//   }, []);

//   return {
//     authCodeSent,
//     isAuthCodeLocked,
//     timer,
//     sendAuthCode,
//     verifyAuthCode,
//     handleSaveChanges,
//   };
// };

// export default useAuthHandler;

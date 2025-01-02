import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";

const useMyPage = () => {
  const [formData, setFormData] = useState({
    userid: "",
    username: "",
    password: "",
    repassword: "",
    email: "",
    profileImage: "/ProfileImg/anonymous.jpg",
    authCode: "",
  });

  const [imagePreview, setImagePreview] = useState("/ProfileImg/anonymous.jpg"); // 기본 이미지
  const [validationMessages, setValidationMessages] = useState({});
  const [authCodeSent, setAuthCodeSent] = useState(false);
  const [timeSee, setTimeSee] = useState(false);
  const [timer, setTimer] = useState(180);
  const [isAuthCodeVerified, setIsAuthCodeVerified] = useState(false);
  const [isFirstSend, setIsFirstSend] = useState(true); // 초기 상태는 true
  const [isEmailEditing, setIsEmailEditing] = useState(false); // 이메일 편집 상태
  const [isAuthCodeLocked, setIsAuthCodeLocked] = useState(false); // 인증 코드 확인 버튼 잠금 상태

  const fileInputRef = useRef(null); // 파일 입력 요소를 참조

  const [formImgeData, setFormImgeData] = useState({
    profileImage: "/ProfileImg/anonymous.jpg", // 기본 이미지로 초기화
  });

  // 타이머
  useEffect(() => {
    let countdown;
    if (authCodeSent && timer > 0 && !isAuthCodeVerified) {
      countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(countdown);
  }, [authCodeSent, timer, isAuthCodeVerified]);

  // 이메일 변경 시 인증 상태 초기화
  const resetAuthState = () => {
    setAuthCodeSent(false);
    setIsAuthCodeVerified(false);
    setIsAuthCodeLocked(false); // 인증 코드 버튼 잠금 해제
  };

  const validatePasswords = useCallback(() => {
    if (formData.password && formData.repassword) {
      const isValid = formData.password === formData.repassword;
      const message = isValid ? "비밀번호가 일치합니다." : "비밀번호가 일치하지 않습니다.";
      const color = isValid ? "validation-success" : "validation-error";

      setValidationMessages((prevMessages) => ({
        ...prevMessages,
        repassword: message,
        repasswordColor: color, // 스타일 클래스 반영
      }));
    } else {
      setValidationMessages((prevMessages) => ({
        ...prevMessages,
        repassword: "",
        repasswordColor: "",
      }));
    }
  }, [formData.password, formData.repassword]);

  // 비밀번호 일치 검사를 useEffect로 실행
  useEffect(() => {
    validatePasswords();
  }, [validatePasswords]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    console.log(`Field Name: ${name}, Field Value: ${value}`);

    if (name === "email") {
      const { message, color } = checkEmail(value);
      setValidationMessages((prevMessages) => ({
        ...prevMessages,
        email: message,
        emailColor: color,
      }));
    }

    if (name === "email") {
      resetAuthState(); // 인증 상태 초기화
      setValidationMessages((prev) => ({
        ...prev,
        email: "",
        authCode: "",
      }));
      setIsAuthCodeLocked(false); // 인증 버튼 잠금 해제
    }

    if (name === "password") {
      const { message, color } = validatePassword(value);
      setValidationMessages((prevMessages) => ({
        ...prevMessages,
        password: message,
        passwordColor: color,
      }));

      // 비밀번호가 변경될 때, 비밀번호 확인 유효성도 같이 체크
      validatePasswords();
    }

    if (name === "repassword") {
      validatePasswords(); // 비밀번호 확인 입력 시 즉시 유효성 검사 실행
    }

    if (name === "username") {
      const usernameRegex = /^[a-zA-Z가-힣]+$/; // 영어, 한글만 허용
      if (!usernameRegex.test(value)) {
        setValidationMessages((prevMessages) => ({
          ...prevMessages,
          username: "이름은 공백이나 숫자를 포함할 수 없습니다.",
          usernameColor: "validation-error",
        }));
        setFormData((prevData) => ({
          ...prevData,
          username: "",
        }));
        return;
      } else {
        setValidationMessages((prevMessages) => ({
          ...prevMessages,
          username: "",
          usernameColor: "",
        }));
      }
    }
  };

  const handleImageUpload = (file) => {
    if (file) {
      setFormData((prev) => ({ ...prev, profileImage: file })); // 이미지 파일 업데이트
      const reader = new FileReader();
      reader.onload = (event) => setImagePreview(event.target.result); // 이미지 미리보기 설정
      reader.readAsDataURL(file);
    }
  };

  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // 숨겨진 파일 입력 클릭
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      handleImageUpload(e.dataTransfer.files[0]); // 드래그 앤 드롭된 파일 처리
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleCancelImage = () => {
    setFormImgeData({ profileImage: null }); // 이미지 상태 초기화
    setImagePreview("/ProfileImg/anonymous.jpg"); // 기본 이미지로 재설정
    setFormData((prev) => ({ ...prev, profileImage: "/ProfileImg/anonymous.jpg" }));
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      // 이미지 미리보기 설정
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl); // 이미지 미리보기 상태 업데이트
  
      // 파일을 서버로 업로드
      const formData = new FormData();
      formData.append('file', file);
  
      try {
        const response = await axios.post('http://localhost:9000/user/mypage/uploadProfile', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        if (response.data.success) {
          // 서버에서 업로드된 이미지 경로를 받아와서 상태에 저장
          setFormData((prevData) => ({
            ...prevData,
            profileImage: response.data.imageUrl, // 서버에서 반환된 이미지 URL을 저장
          }));
        }
      } catch (err) {
        console.error('이미지 업로드 실패:', err);
      }
    }
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,15}$/;
    if (!password) {
      return { message: "비밀번호를 입력해주세요.", color: "validation-error" };
    }

    if (/\s/.test(password)) {
      return { message: "비밀번호에 공백은 사용할 수 없습니다.", color: "validation-error" };
    }

    if (!passwordRegex.test(password)) {
      return { message: "비밀번호는 영문+숫자 조합, 8~15자리여야 합니다.", color: "validation-error" };
    }

    return { message: "사용가능한 비밀번호입니다.", color: "validation-success" };
  };

  const checkEmail = async (email) => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setValidationMessages((prev) => ({
        ...prev,
        email: "유효한 이메일 형식을 입력하세요.",
        emailColor: "validation-error",
      }));
      return false;
    }

    try {
      const response = await axios.post("http://localhost:9000/user/check-email", { email });
      setValidationMessages((prev) => ({
        ...prev,
        email: response.data.available ? "사용 가능한 이메일입니다." : "이미 등록된 이메일입니다.",
        emailColor: response.data.available ? "validation-success" : "validation-error",
      }));
      return response.data.available;
    } catch (error) {
      console.error("이메일 확인 오류:", error);
      setValidationMessages((prev) => ({
        ...prev,
        email: "이메일 중복 확인 중 오류가 발생했습니다.",
        emailColor: "validation-error",
      }));
      return false;
    }
  };

  const sendAuthCode = async () => {
    const email = formData.email.trim();

    if (!email) {
      setValidationMessages((prev) => ({
        ...prev,
        email: "값을 입력하세요.",
        emailColor: "validation-error",
      }));
      setAuthCodeSent(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setValidationMessages((prev) => ({
        ...prev,
        email: "올바른 이메일 형식으로 작성해주세요.",
        emailColor: "validation-error",
      }));
      setAuthCodeSent(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:9000/user/send-auth-code", { email });
      if (response.data.status === "success") {
        setAuthCodeSent(true);
      } else {
        setValidationMessages((prev) => ({
          ...prev,
          email: response.data.message || "인증 코드 발송에 실패했습니다.",
          emailColor: "validation-error",
        }));
        setAuthCodeSent(false);
      }
    } catch (error) {
      setValidationMessages((prev) => ({
        ...prev,
        email: "서버 오류로 인증 코드를 발송할 수 없습니다.",
        emailColor: "validation-error",
      }));
      setAuthCodeSent(false);
    }
  };

  const verifyAuthCode = async () => {
    try {
      const response = await axios.post("http://localhost:9000/user/verify-auth-code", {
        email: formData.email,
        code: formData.authCode,
      });

      if (response.data.message.includes("완료")) {
        setIsAuthCodeVerified(true);
        setIsAuthCodeLocked(true); // 인증 성공 시 버튼 잠금
        setValidationMessages((prevMessages) => ({
          ...prevMessages,
          authCode: "인증이 완료되었습니다.",
          authCodeColor: "validation-success", // 성공 색상
        }));
      } else {
        setValidationMessages((prevMessages) => ({
          ...prevMessages,
          authCode: "인증번호가 올바르지 않습니다.",
          authCodeColor: "validation-error", // 오류 색상
        }));
      }
    } catch (error) {
      setValidationMessages((prevMessages) => ({
        ...prevMessages,
        authCode: "서버 오류로 인증을 완료할 수 없습니다.",
        authCodeColor: "validation-error", // 오류 색상
      }));
    }
  };

  return {
    formData,
    setFormData,
    imagePreview,
    setImagePreview,
    validationMessages,
    setValidationMessages,
    authCodeSent,
    setAuthCodeSent,
    timer,
    setTimer,
    isAuthCodeVerified,
    setIsAuthCodeVerified,
    isAuthCodeLocked,
    setIsAuthCodeLocked, // 인증 코드 버튼 잠금 상태 업데이트 함수
    isFirstSend,
    setIsFirstSend,
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
    resetAuthState,
    handleFileChange,
  };
};

export default useMyPage;

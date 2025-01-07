import { useState, useCallback } from "react";

const useValidationHandler = () => {
  const [validationMessages, setValidationMessages] = useState({});

  // 비밀번호 검증
  const validatePassword = useCallback((password) => {
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
  }, []);

  // 이메일 검증
  const validateEmail = useCallback((email) => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { message: "유효한 이메일 형식을 입력하세요.", color: "validation-error" };
    }
    return { message: "유효한 이메일입니다.", color: "validation-success" };
  }, []);

  // 이름 검증
  const validateUsername = useCallback((username) => {
    const usernameRegex = /^[a-zA-Z가-힣]+$/;
    if (!usernameRegex.test(username)) {
      return { message: "이름은 영어 및 한글만 사용할 수 있습니다.", color: "validation-error" };
    }
    return { message: "", color: "validation-success" };
  }, []);

 

  // // 비밀번호 변경 핸들러
  // const handlePasswordChange = useCallback(
  //   (e, formData, setFormData, setIsPasswordValid) => {
  //     const { name, value } = e.target;
  //     setFormData((prev) => ({
  //       ...prev,
  //       [name]: value,
  //     }));

  //     if (name === "password") {
  //       const validationResult = validatePassword(value);
  //       setValidationMessages((prev) => ({
  //         ...prev,
  //         password: validationResult.message,
  //         passwordColor: validationResult.color,
  //       }));
  //     }

  //     if (name === "repassword") {
  //       if (formData.password !== value) {
  //         setValidationMessages((prev) => ({
  //           ...prev,
  //           repassword: "비밀번호 확인이 일치하지 않습니다.",
  //           repasswordColor: "validation-error",
  //         }));
  //         setIsPasswordValid(false);
  //       } else {
  //         setValidationMessages((prev) => ({
  //           ...prev,
  //           repassword: "비밀번호가 일치합니다.",
  //           repasswordColor: "validation-success",
  //         }));
  //         setIsPasswordValid(true);
  //       }
  //     }
  //   },
  //   [validatePassword]
  // );

  return {
    validationMessages,
    setValidationMessages,
    validatePassword,
    validateEmail,
    validateUsername,
  };
};

export default useValidationHandler;

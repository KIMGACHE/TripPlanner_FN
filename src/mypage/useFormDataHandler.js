import { useState, useCallback } from "react";

const useFormDataHandler = () => {
  const [formData, setFormData] = useState({
    userid: "",
    username: "",
    password: "",
    repassword: "",
    email: "",
    profileImage: "/ProfileImg/anonymous.jpg",
    authCode: "",
  });

  const updateFormData = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleCancelEmailEditing = useCallback((userData, setIsEmailEditing, resetAuthState, setValidationMessages) => {
    setIsEmailEditing(false);
    resetAuthState();
    setFormData((prev) => ({
      ...prev,
      email: userData.email,
    }));
    setValidationMessages((prev) => ({
      ...prev,
      email: "",
      authCode: "",
    }));
  }, []);

  const handleEmailChange = useCallback((e, resetAuthState, setValidationMessages) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      email: value,
    }));
    resetAuthState();
    setValidationMessages((prev) => ({
      ...prev,
      email: "",
      authCode: "",
    }));
  }, []);

  const handleUsernameChange = useCallback((e, validateUsername, setValidationMessages) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, username: value }));
    validateUsername(value, setValidationMessages);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return {
    formData,
    setFormData,
    updateFormData,
    handleCancelEmailEditing,
    handleEmailChange,
    handleUsernameChange,
    handleChange,
  };
};

export default useFormDataHandler;

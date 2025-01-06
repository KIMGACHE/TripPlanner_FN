// import { useState, useRef, useCallback } from "react";
// import axios from "axios";

// const useFileAndImageHandler = (setFormData) => {
//   const [imagePreview, setImagePreview] = useState("/ProfileImg/anonymous.jpg");
//   const fileInputRef = useRef(null);

//   const handleImagePreview = useCallback((file) => {
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => setImagePreview(e.target.result);
//       reader.readAsDataURL(file);
//     }
//   }, []);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       handleImagePreview(file);
//       handleImageUpload(file);
//     }
//   };

//   const handleImageUpload = useCallback(async (file) => {
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const response = await axios.post("http://localhost:9000/user/mypage/upload", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//         withCredentials: true,
//       });

//       if (response.data === "파일 업로드 성공") {
//         setImagePreview(`/upload/profile/${file.name}`);
//       } else {
//         console.error("이미지 업로드 실패:", response.data);
//       }
//     } catch (error) {
//       console.error("이미지 업로드 중 오류 발생:", error);
//     }
//   }, []);

//   const handleFileInputClick = useCallback(() => {
//     fileInputRef.current?.click();
//   }, []);

//   const handleDrop = useCallback(
//     (e) => {
//       e.preventDefault();
//       if (e.dataTransfer.files.length > 0) {
//         const file = e.dataTransfer.files[0];
//         handleImagePreview(file);
//         handleImageUpload(file);
//       }
//     },
//     [handleImagePreview, handleImageUpload]
//   );

//   const handleDragOver = useCallback((e) => e.preventDefault(), []);

//   const handleCancelImage = () => {
//     setImagePreview("/ProfileImg/anonymous.jpg");
//   };

//   const handleResetToDefaultImage = () => {
//     const defaultImage = "/ProfileImg/anonymous.jpg";
//     setImagePreview(defaultImage);
//     setFormData((prev) => ({
//       ...prev,
//       profileImage: defaultImage,
//     }));
//   };

//   const handleCancelChanges = useCallback((userData) => {
//     setFormData({
//       profileImage: userData.img || "/ProfileImg/anonymous.jpg",
//       userid: userData.userid,
//       username: userData.username,
//       email: userData.email,
//       password: "",
//       repassword: "",
//     });
//     setImagePreview(userData.img || "/ProfileImg/anonymous.jpg");
//   }, []);

//   return {
//     imagePreview,
//     fileInputRef,
//     handleFileInputClick,
//     handleDrop,
//     handleFileChange,
//     handleDragOver,
//     handleCancelImage,
//     handleResetToDefaultImage,
//     handleImageUpload,
//     handleCancelChanges,
//   };
// };

// export default useFileAndImageHandler;

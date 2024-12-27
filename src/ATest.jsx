import React, { useState } from "react";
import { DateRangePicker} from "react-date-range";
import "react-date-range/dist/styles.css"; // 기본 스타일
import "react-date-range/dist/theme/default.css"; // 테마 스타일

const ATest = () => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [showCalendar, setShowCalendar] = useState(true); // 페이지 로드 시 달력이 자동으로 열림
  const [inputValue, setInputValue] = useState(""); // 입력 필드 값

  const today = new Date(); // 오늘 날짜 계산
  today.setHours(0, 0, 0, 0); // 시간 초기화

  const handleSelect = (ranges) => {
    const startDate = ranges.selection.startDate;
    const endDate = ranges.selection.endDate;
    const diffDays = Math.ceil(
      (endDate - startDate) / (1000 * 60 * 60 * 24)
    );

    if (startDate < today || endDate < today) {
      alert("오늘 이전의 날짜는 선택할 수 없습니다.");
      return;
    }

    if (diffDays > 10) {
      alert("날짜는 최대 10일까지 선택 가능합니다.");
      return;
    }

    setState([ranges.selection]);
  };

  const handleConfirm = () => {
    const startDate = state[0].startDate;
    const endDate = state[0].endDate;

    setInputValue(
      `${startDate.toLocaleDateString()} ~ ${endDate.toLocaleDateString()}`
    ); // 선택된 날짜를 입력 필드에 표시
    setShowCalendar(false); // 달력 닫기
  };

  return (
    <div>
      <h1>여행 날짜 선택</h1>
      <input
        type="text"
        value={inputValue}
        placeholder="날짜를 선택하세요"
        readOnly
        onClick={() => setShowCalendar(!showCalendar)} // 클릭 시 달력 표시
        style={{ cursor: "pointer" }}
      />
      {showCalendar && (
        <div style={{ position: "relative", display: "inline-block" }}>
          <DateRangePicker
            ranges={state}
            onChange={handleSelect}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            minDate={today} // 오늘 이전 날짜 비활성화
            months={2}
            direction="horizontal"
            rangeColors={["#3ecf8e"]}
            staticRanges={[]} // 모든 프리셋 버튼 제거
            inputRanges={[]} // 모든 입력 버튼 제거
          />
          <button
            onClick={handleConfirm}
            style={{
              position: "absolute",
              bottom: "10px",
              right: "10px",
              padding: "10px 20px",
              backgroundColor: "#3ecf8e",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            확인
          </button>
        </div>
      )}
    </div>
  );
};

export default ATest;

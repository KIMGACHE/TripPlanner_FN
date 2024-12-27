import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // 기본 스타일
import "react-date-range/dist/theme/default.css"; // 테마 스타일

const CalendarComponent = () => {
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);

    const handleSelect = (ranges) => {
        const startDate = ranges.selection.startDate;
        const endDate = ranges.selection.endDate;
        const diffDays = Math.ceil(
            (endDate - startDate) / (1000 * 60 * 60 * 24)
        );

        if (diffDays > 10) {
            alert("날짜는 최대 10일까지 선택 가능합니다.");
            return;
        }

        setState([ranges.selection]);
    };

    return (
        <div>
            <h1>여행 날짜 선택</h1>
            <DateRangePicker
                ranges={state}
                onChange={handleSelect}
                editableDateInputs={true}
                moveRangeOnFirstSelection={false}
                months={2}
                direction="horizontal"
                rangeColors={["#3ecf8e"]}
            />
            <p>
                선택된 날짜:{" "}
                {state[0].startDate.toLocaleDateString()} ~{" "}
                {state[0].endDate.toLocaleDateString()}
            </p>
        </div>
    );
};

export default CalendarComponent;

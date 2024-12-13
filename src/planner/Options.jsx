import {useState, useEffect} from 'react';

const Options = () => {

    return (
        <>
            <label for="all"></label>
            <input type="button" name="all" id="all" onclick="onClickAll()" value="전체" />

            <label for="food">식당</label>
            <input type="checkbox" name="food" id="food" onclick="onClickFood()" checked />

            <label for="accom">숙소</label>
            <input type="checkbox" name="accom" id="accom" onclick="onClickAccom()" checked />

            <label for="place">관광지</label>
            <input type="checkbox" name="place" id="place" onclick="onClickPlace()" checked />

            <select name="citycode" id="citycode">
                <option value="nocity">도시를 선택하세요.</option>
                <option value="서울특별시">서울특별시</option>
                <option value="부산광역시">부산광역시</option>
                <option value="인천광역시">인천광역시</option>
                <option value="대구광역시">대구광역시</option>
                <option value="대전광역시">대전광역시</option>
                <option value="광주광역시">광주광역시</option>
                <option value="울산광역시">울산광역시</option>
                <option value="경기도">경기도</option>
                <option value="충청북도">충청북도</option>
                <option value="충청남도">충청남도</option>
                <option value="전라남도">전라남도</option>
                <option value="전라북도">전라북도</option>
                <option value="경상북도">경상북도</option>
                <option value="경상남도">경상남도</option>
                <option value="강원도">강원도</option>
                <option value="제주도">제주도</option>
            </select>
        </>
    );
}

export default Options;

import { Link } from 'react-router-dom';
import './Main.scss';

const Main = () => {

    return (
        <div className="main-wrapper">

            <h2 className="main-title">
                여행계획 고민중이세요?  <br />
                <br />

                다른 사람에게 추천받아보세요!

            </h2>


            <Link to="/makePlanner">
                <button className="main-makeplanner-btn">여행 계획 만들기</button>
            </Link>
            <Link to="/planner/board">
                <button className="main-board-btn">다른 여행 계획 보러 가기</button>
            </Link>

            <Link to="/tourist">
                <button className="main-tourist-btn">관광지 리스트</button>
            </Link>

            <Link to="/travelcourse">
                <button className="main-travelcourse-btn">관광지 코스 정보</button>
            </Link>
        </div>
    )

}

export default Main
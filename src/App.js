
import TravelCourse from './tourist/TravelCourse.jsx';
import TravelCourseInfo from './tourist/TravelCourseInfo.jsx';
import Tourist from './tourist/Tourist.jsx';
import TouristInfo from './tourist/TouristInfo.jsx';
import Board from './planner/Board.jsx';
import DestinationInfo from './planner/DestinationInfo.jsx';
import Destination from './planner/Destination.jsx';
import MakePlanner from './planner/makePlanner/MakePlanner.jsx';
import LoginForm from './login/LoginForm.jsx';
import Mypage from './mypage/Mypage.jsx';
import Join from './join/Join.jsx';

const App = () => {
  return (
    <Router>
      <div>
        <Link to="/user/mypage">
          <button>마이페이지</button>
        </Link>
        <Link to="/tourist">
          <button>관광지</button>
        </Link>
        <Link to="/travelcourse">
          <button>추천코스</button>
        </Link>
        <Link to="/planner/board">
          <button>게시판</button>
        </Link>
        <Link to="/user/join">
          <button>회원가입</button>
        </Link>
        <Link to="/user/login">
          <button>로그인</button>
        </Link>
        <Link to="/makePlanner">
          <button>플래너 만들기</button>
        </Link>
      </div>
      

      {/* 여기서 Routes로 감싸줘야 합니다. */}
      <Routes>
        {/* 마이페이지 페이지 */}
        <Route path="/user/mypage" element={<Mypage />} />


        {/* 회원가입 페이지 */}
        <Route path="/user/join" element={<Join />} />

        {/* 로그인 */}
        <Route path="/user/login" element={<LoginForm />} />

        {/* 플래너 생성 */}
        <Route path="/makePlanner" element={<MakePlanner />} />

        {/* 관광지 코스 */}
        <Route path="/travelcourse" element={<TravelCourse />} />

        {/* 관광지 코스 자세히 보기 */}
        <Route path="/travelcourse-info" element={<TravelCourseInfo />} />

        {/* 관광지 리스트 */}
        <Route path="/tourist" element={<Tourist />} />

        {/* 관광지 자세히 보기 */}
        <Route path="/tourist-info" element={<TouristInfo />} />

        {/* 게시판 */}
        <Route path="/planner/board" element={<Board />} />

        {/* 게시판 중간 페이지 */}
        <Route path="/planner/board/destination" element={<Destination />} />

        {/* 게시판 자세히 보기 */}
        <Route path="/planner/board/destination/info" element={<DestinationInfo />} />
      </Routes>
    </Router>
  );
};

export default App;

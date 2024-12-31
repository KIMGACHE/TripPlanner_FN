import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import Summary from './Summary.jsx';
import Details from './Details';
import Comments from './Comments';
import '../css/Destination.scss';

const Destination1 = () => {
    const [plannerItem, setPlannerItem] = useState(null);
    const [destinations, setDestinations] = useState([]);
    const [username, setUsername] = useState('');
    const [loginStatus, setLoginStatus] = useState([]);
    const [activeTab, setActiveTab] = useState("summary");  // 현재 활성화된 탭을 관리

    useEffect(() => {
        // 데이터를 가져오는 로직
        axios.get('http://localhost:9000/planner/board/destination')
            .then((response) => {
                setPlannerItem(response.data.plannerItem);
                setDestinations(response.data.destinations);
                setUsername(response.data.username);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });

        // 로그인 상태 확인
        axios.post('http://localhost:9000/api/cookie/validate', {}, { withCredentials: true })
            .then(response => setLoginStatus(response.data))
            .catch(error => setLoginStatus(error));
    }, []);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="destination-wrapper">
            {/* 탭 버튼 */}

            <ul className="destinaion-depth">
                <li onClick={() => handleTabChange("summary")}>전체정보</li>
                <li onClick={() => handleTabChange("details")}>세부정보</li>
                <li onClick={() => handleTabChange("comments")}>댓글</li>
            </ul>



            {/* 탭에 따라 컴포넌트 렌더링 */}
            {activeTab === "summary" && <Summary plannerItem={plannerItem} />}
            {activeTab === "details" && <Details plannerItem={plannerItem} destinations={destinations} />}
            {activeTab === "comments" && <Comments plannerItem={plannerItem} />}
        </div>
    );

}

export default Destination1;

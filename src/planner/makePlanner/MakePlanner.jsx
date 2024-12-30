import {useState, useEffect, React} from 'react';
import '../../public/reset.css'
import {Link} from 'react-router-dom';
import Map from '../Map/Map';
import SideBar from '../SideBar/SideBar';
import './MakePlanner.scss'
import Option from '../Option/Options';
import axios from 'axios';

const MakePlanner = () => {
    const [optionState, setOptionState] = useState();
    const [areaState, setAreaState] = useState(null);
    const [plannerData, setPlannerData] = useState([]);
    const [selectedDay, setSelectedDay] = useState(1);

    const handleOption = (data) => {setOptionState(data);}

    const handleArea = (data) => {setAreaState(data)}

    const handleData = async (data) => {
        const response = await axios.post('http://localhost:9000/planner/getImages',
            {'latitude':data.data.yCoordinate,'longitude':data.data.xCoordinate},
        )
        
        setPlannerData((plannerData)=>[...plannerData,data]);
    }

    const [image, setImage] = useState('');

    const fetchImage = async () => {
        const response = await axios.post('/getImages', {
            latitude: 37.7749, // 예시: 위도
            longitude: -122.4194 // 예시: 경도
        });
        // 이미지 URL이 response.data.image에 포함되어 있습니다.
        setImage(response.data.image);
    };

    const handleDay = (data) => {setSelectedDay(data);}

    const handleDeleteDest = (day, index) => {
        setPlannerData(prevPlannerData => 
            prevPlannerData
                .filter(el => el.day !== day) // 해당 day와 일치하지 않는 항목만 남기기
                .concat(
                    prevPlannerData
                        .filter(el => el.day === day) // 해당 day와 일치하는 항목만 남기기
                        .filter((e, i) => i !== index) // 그 중 index에 해당하는 항목을 제외
                )
        );
    };

    const handleAllDelete = () => {
        setPlannerData([]);
    }
    
    // 홈페이지가 렌더링 되자마자 로그인여부 확인
    useEffect(()=>{
        console.log(plannerData);
    },[plannerData])

    return (
        <div className='planner' >
            <div className='plannerSide' >
                <SideBar
                    AreaCoordinate={handleArea}
                    DayState={handleDay}
                    DestinationData={plannerData}
                    DeleteDestination={handleDeleteDest}
                    DeleteAllDestination={handleAllDelete}
                    AddDestination={handleData}
                />
            </div>
            <div className='plannerBody' >
                { areaState && <>
                        <Option OptionData={handleOption}/>
                        <Map 
                            OptionData={optionState}
                            AreaData={areaState}
                            DayData={selectedDay}
                            AddDestination={handleData}
                        />
                    </>
                }
            </div>
            
        </div>
    )
}

export default MakePlanner;
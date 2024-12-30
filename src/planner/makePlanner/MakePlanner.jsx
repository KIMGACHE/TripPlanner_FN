import {useState, useEffect} from 'react';
import '../../public/reset.css'
import {Link} from 'react-router-dom';
import Map from '../Map/Map';
import SideBar from '../SideBar/SideBar';
import './MakePlanner.scss'
import Option from '../Option/Options';
import axios from 'axios';

const MakePlanner = () => {
    const [optionState, setOptionState] = useState();
    const [areaState, setAreaState] = useState();
    const [plannerData, setPlannerData] = useState([]);
    const [selectedDay, setSelectedDay] = useState(1);

    const handleOption = (data) => {setOptionState(data);}

    const handleArea = (data) => {setAreaState(data)}

    const handleData = (data) => {setPlannerData((plannerData)=>[...plannerData,data]);}

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
    
    useEffect(()=>{console.log(plannerData)},[plannerData])

    useEffect(() => {
        axios.post('http://localhost:9000/api/cookie/validate', {}, {
            withCredentials: true, // 쿠키 포함
        })
        .then(response => {
            console.log("쿠키 보내기:", response.data);
        })
        .catch(error => {
            console.error("쿠키 에러:", error);
        });
    }, []);
    

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
                <Option OptionData={handleOption}/>
                <Map 
                    OptionData={optionState}
                    AreaData={areaState}
                    DayData={selectedDay}
                    AddDestination={handleData}
                />
            </div>
            
        </div>
    )
}

export default MakePlanner;
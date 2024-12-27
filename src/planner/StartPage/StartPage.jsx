import {useState, useEffect} from 'react';
// import './StartPage.scss';
import { Link, Route, Router, Routes } from 'react-router-dom';

const StartPage = () => {

    const [date1, setDate1] = useState();
    const [date2, setDate2] = useState();
    const [people, setPeople] = useState(1);
    const [day, setDay] = useState(1);
    const [config, setConfig] = useState({"day":1, "people":1});

    useEffect(()=>{
        if(date1 && date2) {
            const start = new Date(date1);
            const end = new Date(date2);

            const time = end.getTime() - start.getTime();
            setDay(time / (1000 * 3600 * 24));
        }
        setConfig({"day":day, "people":people});
        console.log(config);
    },[date1, date2, people])

    return (
        <>
            <div className='modal'>
                <div className='modal-content' >
                    <h1>Modal</h1>
                    <div className='calendar-box' >
                        <input type="date" onChange={e=>setDate1(e.target.value)} value={date1} />
                        <input type="date" onChange={e=>setDate2(e.target.value)} value={date2} />
                    </div>
                    <div className='people' >
                        <label htmlFor="">인수 : </label>
                        <input type="number" onChange={e=>setPeople(e.target.value)} value={people} />
                    </div>
                    <div className='button-box'>
                        <Link to="/planner/makePlanner" state={{"config":config}}>다음</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StartPage;
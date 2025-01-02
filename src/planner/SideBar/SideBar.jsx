import { useState, useEffect, useRef } from 'react';
import PlannerDate from '../PlannerDate/PlannerDate';
import axios from 'axios';
import './SideBar.scss';
import {useNavigate} from 'react-router-dom';

const SideBar = (props) => {
  const navigate = useNavigate();
  const isMounted = useRef(false);
  const [titleState, setTitleState] = useState(true);
  const [dateState, setDateState] = useState(false);
  const [listState, setListState] = useState(false);

  const [day, setDay] = useState(0);
  const [area, setArea] = useState();
  const [selectedDay, setSelectedDay] = useState(1);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(true);

  const [word, setWord] = useState('');
  const [search, setSearch] = useState([]);
  const [typeState, setTypeState] = useState('식당');
  const [areaName, setAreaName] = useState(null);
  const [areaCode, setAreaCode] = useState();

  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [resultsPerPage] = useState(7); // 한 페이지에 표시할 결과 수
  const [pagesToShow] = useState(10); // 한 번에 표시할 페이지 번호 개수

  const [showQuestion, setShowQuestion] = useState(false);  // 새로 추가된 상태

  // 지역정보 저장
  const handleArea = (data) => {
    setArea(data);
  };

  // 몇박인지 저장
  const handleDate = (data) => {
    setDay(data);
  };

  // 제목 저장
  const handleTitle = (data) => {
    setTitle(data);
  };

  // 설명 저장
  const handleDescription = (data) => {
    setDescription(data);
  };

  // 공유 여부 저장
  const handlePublic = (data) => {
    setIsPublic(data);
  };

  const handleStateTitle = () => {
    setTitleState(true);
    setDateState(false);
    setListState(false);
  };

  // 달력 및 지역 선택 활성화
  const handleStateDate = () => {
    if (!title) {
      setTitle('My Planner');
    }
    if (!description) {
      setDescription("My Planner's Description");
    }
    setTitleState(false);
    setDateState(true);
    setListState(false);
  };

  // 플래너 리스트 활성화
  const handleStatePlanner = () => {
    setTitleState(false);
    setDateState(false);
    setListState(true);
  };

  // N일차를 눌렀을 때 부모 컴포넌트로 N을 전달, 본인 상태에도 저장
  const handleSelect = (data) => {
    setSelectedDay(data);
    props.DayState(data);
  };

  // 검색을 위한 지역명 받아오기
  const handleAreaName = (data) => {
    setAreaName(data);
  };

  // 검색
  const handleSearch = () => {
    if(typeState=='관광지') {
      axios
        .post(
          'http://localhost:9000/planner/searchDestination',
          { type: typeState, word: encodeURIComponent(word.trim()), areaname: areaName, areacode: areaCode, pageNo: 1, },
          { 'Content-Type': 'application/json' }
        )
        .then((resp) => {
          var placeArray = [];
          resp.data.data.items.item.map((el)=>{
            const data = {
              businessName:el.title,
              businessCategory:'관광지',
              streetFullAddress:el.addr1,
              description:'',
              image:el.firstimage,
            }
            placeArray = [...placeArray,data];
          })
          console.log(placeArray)
          setSearch(placeArray || []);
          setWord('');
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log('서치중');
      axios
        .post(
          'http://localhost:9000/planner/searchDestination',
          { type: typeState, word: word, areaname: areaName },
          { 'Content-Type': 'application/json' }
        )
        .then((resp) => {
          console.log(resp.data.data);
          setSearch(resp.data.data || []);
          setWord('');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // 검색한 장소 플래너에 추가
  const handleSearchAdd = (data) => {
    props.AddDestination({ day: selectedDay, data: data });
  };

  // Day버튼을 눌렀을 때 상황에 따른 이벤트
  const alertDay = () => {
    if (listState) {
      handleStateDate();
    } else if (!dateState) {
      alert('이전 단계를 완료하세요.');
    }
  };

  // Planner버튼을 눌렀을 때 상황에 따른 이벤트
  const alertList = () => {
    if (!listState) {
      alert('이전 단계를 완료하세요.');
    }
  };

  // DB에 플래너 추가
  const addPlanner = async () => {
    if (!listState) {
      alert('이전 단계를 완료하세요.');
    } else {
      if (props.DestinationData.length === 0) {
        alert('경로를 지정해주세요.');
      } else {
        await axios.post('http://localhost:9000/planner/addPlanner',
            {
              title: title,
              areaName: areaName,
              description: description,
              isPublic: isPublic,
              destination: props.DestinationData,
              day: day,
              userid: props.CookieData.userid,
            },
            { 'Content-Type': 'application/json' }
          )
          .then((resp) => {
            alert('플래너를 성공적으로 작성하였습니다!');
            navigate('/');
          })
          .catch((err) => {
            console.log(err);
            alert('플래너를 작성하지 못했습니다.');
          });
      }
    }
  };

  // 몇박인지 결정되면 리스트로 넘어가게끔 설정
  useEffect(() => {
    if (isMounted.current) {
      handleStatePlanner();
    } else {
      isMounted.current = true;
    }
  }, [day]);

  // 지역이 선택되면 지역정보를 부모 컴포넌트로 전달
  useEffect(() => {
    if (isMounted.current) {
      props.AreaCoordinate(area);
    } else {
      isMounted.current = true;
    }
  }, [area]);

  useEffect(() => {
    if (!listState) {
      props.DeleteAllDestination();
    }
  }, [listState]);

  useEffect(()=>{
    if(areaName) {
      if(areaName=='서울') {
        setAreaCode('1')
      } else if(areaName=='인천') {
        setAreaCode('2')
      } else if(areaName=='대전') {
        setAreaCode('3')
      } else if(areaName=='대구') {
        setAreaCode('4')
      } else if(areaName=='광주') {
        setAreaCode('5')
      } else if(areaName=='부산') {
        setAreaCode('6')
      } else if(areaName=='울산') {
        setAreaCode('7')
      } else if(areaName=='세종') {
        setAreaCode(areaName=='8')
      } else if(areaName=='경기') {
        setAreaCode('31')
      } else if(areaName=='강원도') {
        setAreaCode('32')
      } else if(areaName=='충청북도') {
        setAreaCode('33')
      } else if(areaName=='충청남도') {
        setAreaCode('34')
      } else if(areaName=='경상북도') {
        setAreaCode('35')
      } else if(areaName=='경상남도') {
        setAreaCode('36')
      } else if(areaName=='전라북도') {
        setAreaCode('37')
      } else if(areaName=='전라남도') {
        setAreaCode('38')
      } else if(areaName=='제주') {
        setAreaCode('39')
      } else {
        setAreaCode(null);
      }
    }
  },[areaName])

  // 페이징 로직 ---------------------------------------------------------------------------------------
  // 검색 결과를 현재 페이지에 맞게 잘라서 표시
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = search.slice(indexOfFirstResult, indexOfLastResult)
  

  // 총 페이지 수 계산
  const totalPages = Math.ceil(search.length / resultsPerPage);

  // 보여줄 페이지 범위 계산
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const startPage = Math.floor((currentPage - 1) / pagesToShow) * pagesToShow + 1;
  const endPage = Math.min(startPage + pagesToShow - 1, totalPages);

  // 페이지 변경 함수
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // "Previous" 버튼 클릭
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - pagesToShow);
    }
  };

  // "Next" 버튼 클릭
  const handleNext = () => {
    if (currentPage + pagesToShow <= totalPages) {
      setCurrentPage(currentPage + pagesToShow);
    }
  };

  // ----------------------------------------------------------------------------------------

  useEffect(()=>{
    console.log(typeState);
  },[typeState])

  return (
    <>
      <div className="sidebar">
        <div className="option">
          <div 
            className="optionButton"
            onClick={handleStateTitle}>
            <span>Title</span>
          </div>

          <div className="optionButton" onClick={alertDay}>
            <span>Day & Area</span>
          </div>

          <div className="optionButton" onClick={alertList}>
            <span>Planner</span>
          </div>

          <div className="optionButton" onClick={addPlanner}>
            <span>Complete!</span>
          </div>
        </div>

        <div className="content">
          {titleState && (
            <div className="title">
              <label htmlFor="">플래너 제목</label>
              <input type="text" onChange={(e) => handleTitle(e.target.value)} /> <br />
              <label htmlFor="">설명</label>
              <input type="text" onChange={(e) => handleDescription(e.target.value)} /> <br />
              <label htmlFor="">다른 사람에게 Planner를 공유하시겠습니까?</label>
              <input
                type="checkbox"
                onChange={(e) => handlePublic(e.target.checked)}
                checked={isPublic}
              />{' '}
              <br />
              <button onClick={handleStateDate}>다음</button>
            </div>
          )}
          {dateState && (
            <div className="date">
              <PlannerDate AreaData={handleArea} DayData={handleDate} AreaNameData={handleAreaName} />
            </div>
          )}
          {listState && (
            <>
              <p> Planner </p>
              <div className="plannerList">
                <div className="content-side">
                  {(() => {
                    const nthDay = [];
                    for (let i = 1; i <= day; i++) {
                      nthDay.push(
                        <div key={i} className="optionButton" onClick={() => { handleSelect(i) }}>
                          <span>{`${i}일차`}</span>
                        </div>
                      );
                    }
                    return nthDay;
                  })()}
                </div>
                <div className="content-body">
                  {selectedDay && (
                    <ul>
                      {props.DestinationData.filter((el) => el.day === selectedDay).map((destination, index) => {
                        return (
                          <li key={index} className="content-card">
                            <div className="card-image">
                              {destination && <img src={destination.image} alt="" />}
                            </div>
                            <div className="card-content">
                              <div className="card-header">
                                <div className="card-name">{destination && destination.data.businessName}</div>
                                <div className="card-category">{destination && destination.data.businessCategory}</div>
                                <div className="card-addr">{destination && destination.data.streetFullAddress}</div>
                                <button onClick={() => props.DeleteDestination(selectedDay, index)}>제거</button>
                              </div>
                              <div className="card-desc">{destination && destination.data.description}</div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
        {listState && (
          <div className="question">
            <p>SEARCH</p>
            <label htmlFor="">검색어 </label>
            <input type="text" onChange={(e) => { setWord(e.target.value); }} />
            <button onClick={handleSearch}>검색</button>
            { totalPages>0 && 
                <span>{currentPage}/{totalPages}</span>
            }
            <div className='search-btns'>
              <button className="search-btn" onClick={(e) => { setTypeState(e.target.innerText); setWord(""); handleSearch(); }}>식당</button>
              <button className="search-btn" onClick={(e) => { setTypeState(e.target.innerText); setWord(""); handleSearch(); }}>숙소</button>
              <button className="search-btn" onClick={(e) => { setTypeState(e.target.innerText); setWord(""); handleSearch(); }}>관광지</button>
            </div>
            <div className="search-body">
              <ul>
                {search && search.length > 0 && currentResults.map((el, index) => {
                  return (
                    <li key={index} className="search-card">
                      <div className="card-image">
                              {el && <img src={el.image} alt="" />}
                      </div>
                      <div className="card-name">{el && el.businessName}</div>
                      <div className="card-category">{el && el.businessCategory}</div>
                      <div className="card-addr">{el && el.streetFullAddress}</div>
                      <div className="card-desc">{el && el.description}</div>
                      <button onClick={() => { handleSearchAdd(el); }}>추가</button>
                    </li>
                  );
                })}
              </ul>
            </div>
            { search.length !=0 &&
              <div className="pagination">
                <button onClick={handlePrevious} disabled={currentPage === 1}>Previous</button>
                <span>
                  {pageNumbers.slice(startPage - 1, endPage).map((pageNumber) => (
                    <button
                      key={pageNumber}
                      onClick={() => paginate(pageNumber)}
                      className={pageNumber === currentPage ? 'active' : ''}
                    >
                      {pageNumber}
                    </button>
                  ))}
                </span>
                <button
                  onClick={handleNext}
                  disabled={currentPage + pagesToShow > totalPages}
                >
                  Next
                </button>
              </div>
            }
          </div>
        )}
      </div>
    </>
  );
};

export default SideBar;
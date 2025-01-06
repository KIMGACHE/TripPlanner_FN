import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './TravelCourseInfo.scss';

// Swiper 관련 CSS 및 컴포넌트 불러오기
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

const TravelCourseInfo = () => {
    const location = useLocation();
    const contentId = new URLSearchParams(location.search).get('contentId');
    const [courseDetail, setCourseDetail] = useState({});
    const [detailCommon, setDetailCommon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [googleResult, setGoogleResult] = useState([]); // 구글 검색 결과 상태

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (contentId) {
                    const response = await axios.get(`http://localhost:9000/travelcourse-info?contentId=${contentId}`);
                    setCourseDetail(response.data);

                    const response2 = await axios.post(`http://localhost:9000/travelcourse-info-detailCommon`, { contentId: contentId });
                    setDetailCommon(response2.data.items.item[0]);
                }
                setLoading(false);
            } catch (error) {
                console.log('에러', error);
                setError('데이터를 불러오는 데 실패했습니다.');
                setLoading(false);
            }
        };

        fetchData();
    }, [contentId]);

    // 구글 API 검색 및 결과 처리 함수
    const fetchGoogleResults = async (items) => {
        const googleKeywordSearch = items.map((el, index) => {
            const currentEncodedData = encodeURIComponent(el.subname); // 관광지 이름 인코딩
            return axios.post("http://localhost:9000/google-search-places", { keyword: currentEncodedData })
                .then((response) => {
                    const { photoUrls, latitude, longitude } = response.data;
                    return { index, photoUrls, latitude, longitude };
                })
                .catch(() => ({ index, photoUrls: null, latitude: null, longitude: null }));
        });

        try {
            const results = await Promise.all(googleKeywordSearch);
            const sortedResults = results.sort((a, b) => a.index - b.index);
            setGoogleResult(sortedResults);
        } catch (error) {
            console.error('요청 중 오류 발생: ', error);
        }
    };

    useEffect(() => {
        if (courseDetail.items && courseDetail.items.item) {
            fetchGoogleResults(courseDetail.items.item); // 구글 결과 가져오기
        }
    }, [courseDetail]);

    if (loading) return <p>로딩 중...</p>;
    if (error) return <p>{error}</p>;
    if (!detailCommon) return <p>여행 코스 정보가 없습니다.</p>;

    const sanitizedOverview = detailCommon.overview.replace(/<br\s*\/?>/g, ' '); // 개행 문자 처리

    return (
        <div className="TravelCourseInfo-wrapper">
            <h3>{detailCommon.title} 코스 설명 - <br />{sanitizedOverview}</h3>
            <MyComponent
                courseDetail={courseDetail}
                googleResult={googleResult}
                detailCommon={detailCommon}
            />
        </div>
    );
};

// 하위 컴포넌트
const MyComponent = ({ courseDetail, googleResult, detailCommon }) => {
    const swiperRef = useRef(null);
    const [totalDistance, setTotalDistance] = useState(0);
    const [address, setAddress] = useState([]);
    // sanitizeText 함수 정의 (HTML 태그를 텍스트만 추출하는 함수)
    const sanitizeText = (text) => {
        const doc = new DOMParser().parseFromString(text, 'text/html');
        return doc.body.textContent || "";
    };
    const goToSlide = (index) => {
        if (swiperRef.current) swiperRef.current.slideTo(index);
    };

    useEffect(() => {
        const getGoogleAddress = async (latitude, longitude) => {
            const apiKey = 'AIzaSyAEae5uopEekuKilPCwWMsQS-M5JG8tTIk'; // 구글 API 키
            try {
                const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
                    params: { latlng: `${latitude},${longitude}`, key: apiKey },
                });
                const results = response.data.results;
                return results.length > 0 ? results[0].formatted_address : '주소를 찾을 수 없습니다';
            } catch (error) {
                console.error('주소 가져오기 실패:', error);
                return null;
            }
        };

        const fetchAddresses = async () => {
            const addresses = [];
            for (const result of googleResult) {
                if (result.latitude && result.longitude) {
                    const address = await getGoogleAddress(result.latitude, result.longitude);
                    addresses.push(address);
                } else {
                    addresses.push(null);
                }
            }
            setAddress(addresses);
        };

        if (googleResult.length > 0) fetchAddresses();

        if (window.kakao && window.kakao.maps) {
            const container = document.getElementById('main-map');
            const bounds = new window.kakao.maps.LatLngBounds();
            const options = { center: new window.kakao.maps.LatLng(googleResult[0]?.latitude, googleResult[0]?.longitude), level: 5 };
            const map = new window.kakao.maps.Map(container, options);
            const positions = [];
            let calculatedDistance = 0;

            const getDistance = (lat1, lon1, lat2, lon2) => {
                const R = 6371e3;
                const toRad = (value) => (value * Math.PI) / 180;

                const φ1 = toRad(lat1);
                const φ2 = toRad(lat2);
                const Δφ = toRad(lat2 - lat1);
                const Δλ = toRad(lon2 - lon1);

                const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
                const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

                return R * c;
            };

            googleResult.forEach((result, index) => {
                if (result.latitude && result.longitude) {
                    const position = new window.kakao.maps.LatLng(result.latitude, result.longitude);
                    bounds.extend(position);
                    positions.push(position);

                    const marker = new window.kakao.maps.Marker({ position, map });
                    const customOverlayContent = `
                        <div style="position: absolute; left: -15px; top: -40px;
                            padding: 5px; font-size: 16px; font-weight: bold;
                            background-color: white; border-radius: 50%;
                            width: 30px; height: 30px; display: flex;
                            justify-content: center; align-items: center;
                            border: 2px solid blue; cursor: pointer; z-index: 100;">
                            ${index + 1}
                        </div>
                    `;
                    const customOverlay = new window.kakao.maps.CustomOverlay({
                        position, content: customOverlayContent, clickable: true
                    });
                    customOverlay.setMap(map);

                    const infowindow = new window.kakao.maps.InfoWindow({
                        content: `<div style="padding:5px; font-size:12px;">${courseDetail.items.item[index].subname}</div>`
                    });
                    infowindow.open(map, marker);
                }
            });

            const polyline = new window.kakao.maps.Polyline({
                path: positions, strokeWeight: 5, strokeColor: '#FF0000', strokeOpacity: 0.7, strokeStyle: 'solid',
            });
            polyline.setMap(map);

            for (let i = 0; i < positions.length - 1; i++) {
                const lat1 = positions[i].getLat();
                const lon1 = positions[i].getLng();
                const lat2 = positions[i + 1].getLat();
                const lon2 = positions[i + 1].getLng();
                calculatedDistance += getDistance(lat1, lon1, lat2, lon2);
            }

            setTotalDistance(calculatedDistance);
            map.setBounds(bounds);
        }
    }, [googleResult]);

    return (
        <>
            <div>
                <strong>코스 총 거리:</strong> {(totalDistance / 1000).toFixed(2)} km
            </div>
            {detailCommon.homepage && (
                <div>
                    <a href={detailCommon.homepage.match(/href="(.*?)"/)?.[1]}
                        target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'blue' }}>
                        홈페이지 바로가기
                    </a>
                </div>
            )}
            <div>
                <div id="main-map" style={{ width: '1200px', height: '400px' }}></div>
            </div>

            <ul className="Course-list-Numbox">
                {courseDetail.items.item.map((subItem, index) => (
                    <li key={index} onClick={() => goToSlide(index)}>
                        <em>{index + 1}</em>
                        <div>
                            {googleResult[index]?.photoUrls ? (
                                <div>
                                    <img src={googleResult[index].photoUrls[0]} alt={`Google Image ${index}`} style={{ width: '100px', height: '100px' }} />
                                    <span>{subItem.subname}</span>
                                </div>
                            ) : (
                                <span>{subItem.subname}</span>
                            )}
                        </div>
                    </li>
                ))}
            </ul>

            <Swiper pagination={{ type: 'progressbar' }} navigation={true} onSwiper={(swiper) => (swiperRef.current = swiper)} modules={[Pagination, Navigation]}>
                {courseDetail.items.item.map((subItem, index) => (
                    <SwiperSlide key={index}>
                        <div>
                            <h2>{subItem.subname}</h2>
                            {googleResult[index]?.photoUrls && googleResult[index]?.photoUrls.length > 0 ? (
                                <div className="photo-container">
                                    {googleResult[index].photoUrls.map((photo, i) => (
                                        <img key={i} src={photo} alt={`Google Image ${index}-${i}`} style={{ width: '100px', height: '100px', marginRight: '5px' }} />
                                    ))}
                                </div>
                            ) : (
                                <span>{subItem.subname}</span>
                            )}
                            <div>주소 : {address[index]}</div>
                            <span>{sanitizeText(courseDetail.items.item[index]?.subdetailoverview)}</span>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
};

export default TravelCourseInfo;

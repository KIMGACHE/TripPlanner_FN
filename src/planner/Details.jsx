// import { useEffect, useState, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import findwayIcon from '../images/findway.png';

// const Details = ({ plannerItem, destinations }) => {
//     const navigate = useNavigate(); // useNavigate 훅을 정의
//     const [shownDays, setShownDays] = useState([]);
//     const mapRef = useRef(null); // 지도 상태를 관리할 ref
//     const dayColors = [
//         "#FF5733", "#33FF57", "#3357FF", "#F0E68C", "#FF1493", "#8A2BE2", "#FFD700", "#FF6347", "#00FA9A", "#ADFF2F"
//     ];

//     // 로딩 중 화면
//     if (!plannerItem || destinations.length === 0) return <div>로딩중...</div>;

//     useEffect(() => {
//         // destinations가 비어 있지 않은 경우에만 실행되도록
//         if (destinations.length > 0) {
//             const container = document.getElementById('main-map');
//             const options = {
//                 center: new window.kakao.maps.LatLng(destinations[0].y, destinations[0].x),
//                 level: 5
//             };
//             const map = new window.kakao.maps.Map(container, options);
//             const bounds = new window.kakao.maps.LatLngBounds();
//             let dayMarkers = {}; // Day별로 마커 그룹화
//             let dayPolylines = {}; // Day별 Polyline 그룹화
//             let dayCounters = {}; // 각 Day별로 커스텀 오버레이 번호 초기화

//             destinations.forEach((destination, index) => {
//                 const position = new window.kakao.maps.LatLng(destination.y, destination.x);
//                 bounds.extend(position);

//                 const currentDay = destination.day;
//                 const color = dayColors[(currentDay - 1) % dayColors.length];

//                 if (!dayCounters[currentDay]) {
//                     dayCounters[currentDay] = 1;
//                 } else {
//                     dayCounters[currentDay] += 1;
//                 }

//                 const customOverlayContent = `
//                     <div style="font-size: 16px; font-weight: bold; background-color: ${color}; border-radius: 50%; width: 30px; height: 30px; display: flex; justify-content: center; align-items: center; cursor: pointer; z-index: 100; color: white;">
//                         ${dayCounters[currentDay]}
//                     </div>
//                 `;
//                 const customOverlay = new window.kakao.maps.CustomOverlay({
//                     position, content: customOverlayContent, clickable: true
//                 });
//                 customOverlay.setMap(map);

//                 if (!dayMarkers[currentDay]) {
//                     dayMarkers[currentDay] = [];
//                 }
//                 dayMarkers[currentDay].push(position);

//                 if (dayMarkers[currentDay].length > 1) {
//                     if (!dayPolylines[currentDay]) {
//                         dayPolylines[currentDay] = new window.kakao.maps.Polyline({
//                             path: dayMarkers[currentDay],
//                             strokeWeight: 5,
//                             strokeColor: color, 
//                             strokeOpacity: 0.7,
//                             strokeStyle: 'solid',
//                         });
//                         dayPolylines[currentDay].setMap(map);
//                     } else {
//                         dayPolylines[currentDay].setPath(dayMarkers[currentDay]);
//                     }
//                 }
//             });

//             map.setBounds(bounds); // 경계에 맞게 지도 중심 및 확대 조정
//             mapRef.current = map; // 맵을 ref로 저장

//             return () => {
//                 map.setMap(null); // 맵 초기화
//             };
//         }
//     }, [destinations]);

//     useEffect(() => {
//         const uniqueDays = destinations.reduce((acc, destination) => {
//             if (!acc.includes(destination.day)) acc.push(destination.day);
//             return acc;
//         }, []);
//         setShownDays(uniqueDays);
//     }, [destinations]);

//     // 거리 계산 함수
//     const calculateDistance = (lat1, lon1, lat2, lon2) => {
//         const R = 6371;
//         const dLat = (lat2 - lat1) * Math.PI / 180;
//         const dLon = (lon2 - lon1) * Math.PI / 180;
//         const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//                   Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
//                   Math.sin(dLon / 2) * Math.sin(dLon / 2);
//         const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//         return R * c;
//     };

//     const getDirections = (start, end) => {
//         const url = `https://map.kakao.com/?sName=${start.address}&eName=${end.address}`;
//         return url;
//     };

//     return (
//         <div>
//             {destinations.length > 0 ? (
//                 destinations.map((destination, index) => {
//                     const isNewDay = index === 0 || destination.day !== destinations[index - 1].day;
//                     const prevDestination = destinations[index - 1];
//                     const distance = prevDestination ? calculateDistance(prevDestination.y, prevDestination.x, destination.y, destination.x) : 0;

//                     return (
//                         <div key={index} className="destination-card">
//                             <ul className="destination-card-ul">
//                                 {isNewDay && (
//                                     <div>
//                                         <p className="destination-day" style={{ color: dayColors[(destination.day - 1) % dayColors.length] }}>
//                                             Day {destination.day}
//                                         </p>
//                                     </div>
//                                 )}
//                                 {!isNewDay && (
//                                     <div className="destination-distance">
//                                         <span className="destination-distance-span">총 {distance.toFixed(2)} km</span>
//                                         <button className="destination-distance-button" onClick={() => window.open(getDirections(prevDestination, destination), '_blank')}>
//                                             <img className="icon" src={findwayIcon} alt="findway" />
//                                         </button>
//                                     </div>
//                                 )}
//                                 <li className="destination-info">
//                                     <p className="destination-dayOrder">{destination.dayOrder}</p>
//                                     {!isNewDay && <div className="line"></div>}
//                                     <span className="destination-image">
//                                         <img src={destination.image} alt="destination" />
//                                     </span>
//                                     <div className="destination-desc">
//                                         <p className="destination-category">{destination.category}</p>
//                                         <p className="destination-title">{destination.name}</p>
//                                         <p className="destination-address">{destination.address}</p>
//                                     </div>
//                                 </li>
//                             </ul>
//                         </div>
//                     );
//                 })
//             ) : (
//                 <p>등록된 여행지가 없습니다.</p>
//             )}
//             <div id="main-map" className="destination-map"></div>
//         </div>
//     );
// };

// export default Details;

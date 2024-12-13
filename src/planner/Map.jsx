import React, { useState, useEffect } from 'react';
import { Marker, Popup,useMapEvents } from 'react-leaflet';
import "proj4"
import "proj4leaflet"
import L, { marker } from 'leaflet';
import axios from 'axios';
import { MapMarker } from 'react-kakao-maps-sdk';

const Map = () => {

    // map을 상태로 설정
    const [map, setMap] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [center , setCenter] = useState()
    const [layerGroup, setLayerGroup] = useState(L.layerGroup());

    // 최초 좌표
    const initialPosition = { lat: 35.1795543, lng: 129.0756416 };

    // map 최초 로딩시
    useEffect(() => {
        // 좌표계 정의
        const EPSG5181 = new L.Proj.CRS(
            'EPSG:5181',
            // 'EPSG:4326',
            // '+proj=longlat +datum=WGS84 +no_defs',
            '+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
            {
            resolutions: [2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, 0.5, 0.25],
            origin: [-30000, -60000],
            bounds: L.bounds([-30000-Math.pow(2,19)*4, -60000], [-30000+Math.pow(2,19)*5, -60000+Math.pow(2,19)*5])
            }          
        );
        
        // map 설정
        const mapInstance = L.map('map', {
            center: [initialPosition.lat, initialPosition.lng],
            crs: EPSG5181,
            zoom:9,
        });

        // map의 베이스
        const tileLayer =L.tileLayer('http://map{s}.daumcdn.net/map_2d/1807hsm/L{z}/{y}/{x}.png', {
            minZoom:4,
            maxZoom:13,
            zoomReverse:true,
            zoomOffset:1,
            subdomains:'0123',
            continuousWorld:true,
            tms:true,
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(mapInstance);

        // Map 객체를 상태로 저장
        setMap(mapInstance);

        // 지도 이동 시 이벤트
        mapInstance.on('moveend', () => {
            const center = mapInstance.getCenter();
            setCenter({ lat: center.lat, lng: center.lng });
        });

        return () => {
            mapInstance.remove(); // 컴포넌트 언마운트 시 지도 제거
        };
    }, []);

    // map의 center가 변경되었을 때
    useEffect(()=>{

        if(map != null){
            const req = async ()=>{
                console.log(map._zoom);
                const center = map.getCenter();
            
                await axios.post('http://localhost:9000/planner/makePlanner',
                    {"action":"mapRender","latitude":center.lat, "longitude":center.lng,"zoomlevel":map._zoom},
                    {"Content-Type" : "application/json"},
                )
                .then(resp=>{
                    setLayerGroup(layerGroup=L.layerGroup());
                    const foodList = JSON.parse(resp.data.foodList);
                    foodList.forEach(el => {
                        const lat = el.xCoordinate;
                        const lng = el.yCoordinate;
                        const marker = L.marker([lng,lat]).addTo(layerGroup);
                    });
                    layerGroup.addTo(map);
                })
                .catch(err=>{console.log(err)});
            }
            req();
        }
    }, [center] );

    return (
        <>
            <div id="map" style={{ width: '100%', height: '80vh' }}></div>
        </>
    );
}

export default Map;
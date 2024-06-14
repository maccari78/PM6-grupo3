import { useEffect } from "react";
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

interface MapLocationProps{
    lat: number | null;
    lon: number | null;
}
const MapLocation: React.FC<MapLocationProps>  = ({lat, lon}) => {
    useEffect(() => {

        if(lat === null || lon == null) return 
        const map = L.map('map', {
            center: [lat, lon],
            zoom: 13
        })
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        }).addTo(map);

        L.marker([lat, lon]).addTo(map)
        // .bindPopup('Tu vehículo')
        // .openPopup()

        return () => {
            map.remove()
        }

    }, [lat, lon])


    return (
        <div id='map' style={{ height: '200px', width: '400px' }}>
            {lat === null ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', backgroundColor: '#f0f0f0', color: 'black', fontWeight: 'bold'}}>
                    <p>Ubicación no disponible</p>
                </div>
            ) : null}
        </div>
    );
}

export default MapLocation;
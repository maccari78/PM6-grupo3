import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

export interface MapLocationProps {
  lat: number | null | undefined;
  lon: number | null | undefined;
}
const MapLocation: React.FC<MapLocationProps> = ({ lat, lon }) => {
  useEffect(() => {
    if (lat === null || lon == null) return;
    const map = L.map("map", {
      center: [lat!, lon!],
      zoom: 13,
    });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {}).addTo(
      map
    );

    L.marker([lat!, lon!]).addTo(map);
    // .bindPopup('Tu vehículo')
    // .openPopup()

    return () => {
      map.remove();
    };
  }, [lat, lon]);

  return (
    <div id="map" className="h-[200px] w-[200px]">
      {lat === undefined ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            backgroundColor: "#f0f0f0",
            color: "black",
            fontWeight: "bold",
          }}
        >
          <p>Ubicación no disponible</p>
        </div>
      ) : null}
    </div>
  );
};

export default MapLocation;

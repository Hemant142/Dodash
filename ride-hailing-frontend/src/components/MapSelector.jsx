import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMapEvents,
} from "react-leaflet";
import { useEffect } from "react";

const MapSelector = ({ pickup, drop, setDrop }) => {
  const center = pickup ? [pickup.lat, pickup.lng] : [12.9716, 77.5946];

  const positions = [];
  if (pickup) positions.push([pickup.lat, pickup.lng]);
  if (drop) positions.push([drop.lat, drop.lng]);

  const DropSelector = () => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        setDrop({
          lat,
          lng,
          display_name: `Custom Point (${lat.toFixed(5)}, ${lng.toFixed(5)})`,
        });
      },
    });
    return null;
  };

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {pickup && <Marker position={[pickup.lat, pickup.lng]} />}
      {drop && <Marker position={[drop.lat, drop.lng]} />}
      {pickup && drop && <Polyline positions={positions} color="blue" />}
      <DropSelector />
    </MapContainer>
  );
};

export default MapSelector;

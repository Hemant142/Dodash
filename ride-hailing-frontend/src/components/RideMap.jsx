// src/components/RideMap.jsx
import React, { useState, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const DraggableMarker = ({ position, setPosition, label }) => {
  const markerRef = useRef(null);

  const eventHandlers = {
    dragend() {
      const marker = markerRef.current;
      if (marker != null) {
        setPosition(marker.getLatLng());
      }
    },
  };

  return (
    <Marker
      draggable
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
      icon={L.icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
        iconSize: [35, 35],
      })}
    >
      <Popup>{label}</Popup>
    </Marker>
  );
};

const RideMap = () => {
  const [pickupPosition, setPickupPosition] = useState({
    lat: 28.6139,
    lng: 77.209,
  });
  const [dropPosition, setDropPosition] = useState({
    lat: 28.5355,
    lng: 77.391,
  });

  const handleConfirmRide = () => {
    alert(
      `Ride Confirmed!\nPickup: ${pickupPosition.lat}, ${pickupPosition.lng}\nDrop: ${dropPosition.lat}, ${dropPosition.lng}`
    );
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer
        center={pickupPosition}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <DraggableMarker
          position={pickupPosition}
          setPosition={setPickupPosition}
          label="Pickup Location"
        />
        <DraggableMarker
          position={dropPosition}
          setPosition={setDropPosition}
          label="Drop-off Location"
        />

        {pickupPosition && dropPosition && (
          <Polyline positions={[pickupPosition, dropPosition]} color="blue" />
        )}
      </MapContainer>

      <div
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          backgroundColor: "white",
          padding: 15,
          borderRadius: 8,
          boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
        }}
      >
        <div style={{ marginBottom: 10 }}>
          <strong>Pickup:</strong> {pickupPosition.lat.toFixed(4)},{" "}
          {pickupPosition.lng.toFixed(4)}
        </div>
        <div style={{ marginBottom: 10 }}>
          <strong>Drop-off:</strong> {dropPosition.lat.toFixed(4)},{" "}
          {dropPosition.lng.toFixed(4)}
        </div>
        <button
          onClick={handleConfirmRide}
          style={{
            backgroundColor: "#2196f3",
            color: "white",
            padding: "8px 16px",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Confirm Ride
        </button>
      </div>
    </div>
  );
};

export default RideMap;

import { useEffect, useState } from "react";
import axios from "axios";
import {
  TextField,
  List,
  ListItem,
  ListItemButton,
  Button,
} from "@mui/material";

const LocationSearchInput = ({ label, onSelectLocation, isPickup }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (query.length < 3 || selected) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const res = await axios.get(
          "https://nominatim.openstreetmap.org/search",
          {
            params: { q: query, format: "json", addressdetails: 1, limit: 5 },
          }
        );
        setSuggestions(res.data);
      } catch (err) {
        console.error(err);
        setSuggestions([]);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 400);
    return () => clearTimeout(debounce);
  }, [query, selected]);

  const handleSelect = (place) => {
    const location = {
      lat: parseFloat(place.lat),
      lng: parseFloat(place.lon),
      display_name: place.display_name,
    };
    setQuery(place.display_name);
    setSuggestions([]);
    setSelected(true);
    onSelectLocation(location);
  };

  const handleUseCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await axios.get(
            "https://nominatim.openstreetmap.org/reverse",
            {
              params: { lat: latitude, lon: longitude, format: "json" },
            }
          );
          const location = {
            lat: latitude,
            lng: longitude,
            display_name: res.data.display_name,
          };
          setQuery(location.display_name);
          setSelected(true);
          onSelectLocation(location);
        } catch (err) {
          console.error("Reverse geocoding failed", err);
        }
      },
      (err) => console.error("Geolocation error", err)
    );
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <TextField
        fullWidth
        label={label}
        variant="outlined"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setSelected(false);
        }}
        autoComplete="off"
      />

      {isPickup && !selected && (
        <Button
          variant="outlined"
          sx={{ mt: 1 }}
          onClick={handleUseCurrentLocation}
        >
          📍 Use Current Location
        </Button>
      )}

      {suggestions.length > 0 && !selected && (
        <List
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            zIndex: 999,
            background: "white",
            width: "100%",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            borderRadius: "4px",
          }}
        >
          {suggestions.map((place, i) => (
            <ListItem disablePadding key={i}>
              <ListItemButton onClick={() => handleSelect(place)}>
                {place.display_name}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default LocationSearchInput;

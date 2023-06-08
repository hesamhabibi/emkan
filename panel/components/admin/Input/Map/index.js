import { useEffect, useState } from "react";
import ReactMapGL, {
  NavigationControl,
  GeolocateControl,
  setRTLTextPlugin,
} from "react-map-gl";
import Marker from "./marker";
import "mapbox-gl/dist/mapbox-gl.css";

const navControlStyle = {
  right: 10,
  top: 10,
};

export default function App({
  field: { onChange, value, onBlur },
  fieldState: { invalid, error, ...props },
  label,
}) {
  const [viewport, setViewport] = useState({
    longitude: 52.51332758061692,
    latitude: 29.597757654905827,
    zoom: 14,
  });

  const [pin, setPin] = useState({});
  // const [visible, setVisible] = useState(false);

  const addMarker = (e) => {
    const marker = { longitude: e.lngLat[0], latitude: e.lngLat[1] };
    onChange({ ...marker, zoom: viewport.zoom });
    setPin(marker);
  };

  useEffect(() => {
    if (value) {
      setViewport({ ...value });
      setPin(value);
    }
  }, []);

  const loadRTL = (map) => {
    // if (map.target.getRTLTextPluginStatus() === "loaded") return;
    map.target._localIdeographFontFamily = "vazir";
    try {
      map.target.addControl(
        new setRTLTextPlugin(
          "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js",
          // () => setVisible(true),
          false
        )
      );
    } catch (e) {
      // setVisible(true);
    }
  };

  const onMapLoad = (map) => {
    loadRTL(map);
  };

  return (
    <>
      {Boolean(label) && <label>{label}</label>}
      <div>
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken="pk.eyJ1IjoiZDJtYXJrIiwiYSI6ImNrcG1sdTVoejAzbTEydm51bjVpdnlicW8ifQ.hsUNrMF5eTZ0cyTC6nH1xw"
          width="100%"
          height="65vh"
          mapStyle="mapbox://styles/mapbox/streets-v8"
          onViewportChange={setViewport}
          onClick={addMarker}
          onLoad={onMapLoad}
        >
          <GeolocateControl
            positionOptions={{ enableHighAccuracy: true }}
            style={{ bottom: 15, right: 15 }}
            trackUserLocation={true}
          />
          <NavigationControl style={navControlStyle} />
          <Marker {...pin} />
        </ReactMapGL>
      </div>
    </>
  );
}

import { Marker } from "react-map-gl";

export default function Mark({ ...props }) {
  if (!Object.keys(props).length) return null;

  return (
    <Marker {...props} offsetTop={-30} offsetLeft={-15}>
      <i className="fas fa-map-marker-alt fa-2x" style={{ color: "red" }} />
    </Marker>
  );
}

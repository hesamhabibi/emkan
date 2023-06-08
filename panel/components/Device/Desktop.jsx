import dynamic from "next/dynamic";

const isBrowser = dynamic(
  () => import("react-device-detect").then(({ isBrowser }) => isBrowser),
  { ssr: true }
);

const Desktop = ({ children }) => (isBrowser ? children : null);

export default Desktop;

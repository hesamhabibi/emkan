import dynamic from "next/dynamic";

const isMobile = dynamic(
  () => import("react-device-detect").then(({ isMobile }) => isMobile),
  { ssr: false }
);

const Mobile = ({ children }) => (isMobile ? children : null);

export default Mobile;

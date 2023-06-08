import Image from "next/image";
import React from "react";
import Styles from "./loadings.module.scss";

export const LoadingContext = React.createContext((arg) => {});

export default function Loadings({ children }) {
  const [loading, setLoading] = React.useState(false);

  return (
    <>
      {loading && (
        <div className={Styles.dataLoading}>
          <div>
            <Image
              width={100}
              height={100}
              src="/panel-img/Ripple-1s-200px.svg"
              alt="Loading image"
            />
          </div>
        </div>
      )}
      <LoadingContext.Provider value={setLoading}>
        {children}
      </LoadingContext.Provider>
    </>
  );
}

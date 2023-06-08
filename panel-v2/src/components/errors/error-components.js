import React from "react";
import Error500 from "./error-500";
import Error401 from "./error-401";
import Error403 from "./error-403";
import Error426 from "./error-426";
import Error429 from "./error-429";
import Error405 from "./error-405";
import FrontError from "./front-error";
import useCheckError from "../../hooks/CheckError";

const Index = () => {
  const {error} = useCheckError();

  if (error) {
    if (error?.endpoint === 'server' && error?.provider === 'axios') {
      const error_details = error?.details;
      if (error_details?.status === 500 || error_details?.response?.status === 500) {
        return <Error500 error={error}/>
      } else if (error_details?.status === 401|| error_details?.response?.status === 401) {
        return <Error401 error={error}/>
      } else if (error_details?.status === 403|| error_details?.response?.status === 403) {
        return <Error403 error={error}/>
      } else if (error_details?.status === 405 || error_details?.response?.status === 405) {
        return <Error405 error={error}/>
      } else if (error_details?.status === 426|| error_details?.response?.status === 426) {
        return <Error426 error={error}/>
      } else if (error_details?.status === 429|| error_details?.response?.status === 429) {
        return <Error429 error={error}/>
      } else {
        return <Error500 error={error}/>
      }
    } else {
      return <FrontError/>
    }
  }
  return null;
}

export default Index;
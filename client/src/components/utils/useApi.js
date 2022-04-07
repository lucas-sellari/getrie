import { useState } from "react";
import axios from "axios";

const initialRequestInfo = {
  error: null,
  data: null,
  loading: false,
};

const useApi = (config) => {
  const [requestInfo, setRequestInfo] = useState(initialRequestInfo);

  const call = async (localConfig) => {
    setRequestInfo({ ...initialRequestInfo, loading: true });

    let response = null;

    try {
      response = await axios({
        baseURL: "http://localhost:3333",
        ...config,
        ...localConfig,
      });
      setRequestInfo({ ...initialRequestInfo, data: response.data });
    } catch (error) {
      setRequestInfo({ ...initialRequestInfo, error: error });
      console.log(error.toJSON());
    }

    if (config.onCompleted) {
      config.onCompleted(response);
    }
  };

  return [call, requestInfo];
};

export default useApi;

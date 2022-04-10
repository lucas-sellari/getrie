import { useState } from "react";
import useDebouncedPromise from "./useDebouncedPromise.js";
import axios from "axios";

const initialRequestInfo = {
  error: null,
  data: null,
  loading: false,
};

const useApi = (config) => {
  const [requestInfo, setRequestInfo] = useState(initialRequestInfo);
  const debouncedAxios = useDebouncedPromise(axios, config.debounceDelay);

  const call = async (localConfig) => {
    let response = null;

    const finalConfig = {
      baseURL: "http://localhost:3333",
      ...config,
      ...localConfig,
    };

    if (!finalConfig.quietly) {
      setRequestInfo({
        ...initialRequestInfo,
        loading: true,
      });
    }

    const fn = finalConfig.debounced ? debouncedAxios : axios;

    try {
      response = await fn(finalConfig);
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

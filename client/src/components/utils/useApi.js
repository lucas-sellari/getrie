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
      updateRequestInfo: (newInfo) => newInfo,
      ...config,
      ...localConfig,
    };

    if (finalConfig.isFetchMore) {
      setRequestInfo({
        ...initialRequestInfo,
        data: requestInfo.data,
        loading: true,
      });
    } else if (!finalConfig.quietly) {
      setRequestInfo({
        ...initialRequestInfo,
        loading: true,
      });
    }

    const fn = finalConfig.debounced ? debouncedAxios : axios;

    try {
      response = await fn(finalConfig);

      const newRequestInfo = {
        ...initialRequestInfo,
        data: response.data,
      };

      if (response.headers["x-total-count"] !== undefined) {
        newRequestInfo.total = Number.parseInt(
          response.headers["x-total-count"],
          10
        );
      }

      setRequestInfo(
        finalConfig.updateRequestInfo(newRequestInfo, requestInfo)
      );
    } catch (error) {
      setRequestInfo(
        finalConfig.updateRequestInfo(
          {
            ...initialRequestInfo,
            error,
          },
          requestInfo
        )
      );
      console.log(error.toJSON());
    }

    if (config.onCompleted) {
      config.onCompleted(response);
    }
  };

  return [call, requestInfo];
};

export default useApi;

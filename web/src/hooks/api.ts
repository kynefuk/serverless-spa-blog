import { useMemo } from "react";
import { DefaultApi } from "../api/api";

export const useApi = () => {
  return useMemo(() => {
    const options = {
      baseOptions: {
        timeout: 600000,
      },
    };
    return new DefaultApi(options);
  }, []);
};

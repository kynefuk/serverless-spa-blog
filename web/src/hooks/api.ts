import { useMemo } from "react";
import { DefaultApi } from "../api/api";

export const useApi = () => {
  return useMemo(() => {
    const options = {
      baseOptions: {
        timeout: 450000,
      },
    };
    return new DefaultApi(options);
  }, []);
};

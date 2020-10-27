import { useMemo } from "react";
import { DefaultApi } from "../api/api";

export const useApi = () => {
  return useMemo(() => {
    return new DefaultApi();
  }, []);
};

import { useContext } from "react";
import Context from "../context/context";

export default function useCustomContext() {
  return useContext(Context)
}

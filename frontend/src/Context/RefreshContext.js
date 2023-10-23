import { createContext } from "react";

const RefreshContext = createContext({
  updateData: () => {},
});

export default RefreshContext;

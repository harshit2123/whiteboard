import { createContext } from "react";

const toolboxContext = createContext({
  toolboxState: {},
  chnageStroke: () => {},
  changeFill: () => {},
});

export default toolboxContext;

import { createContext } from "react";

const boardContext = createContext({
  activeToolItem: "",
  TOOL_ACTION_TYPES:"",
  elements: [],
  boardMouseDownHandler: () => {},
  handleToolItemClick: () => {},
  boardMouseMoveHandler: () => {},
  boardMouseUpHandler: () => {},
});

export default boardContext;

import React, { useContext } from "react";
import { LuRectangleHorizontal } from "react-icons/lu"; // Lucide icon
import {
  FaSlash,
  FaRegCircle,
  FaEraser,
  FaArrowRight,
  FaDownload,
  FaFont,
  FaPaintBrush,
  FaUndoAlt,
  FaRedoAlt,
} from "react-icons/fa";
import classes from "./index.module.css";
import cx from "classnames";
import boardContext from "../../store/board-context";
import { TOOL_ITEMS } from "../../constants";

const Toolbar = () => {
  const { activeToolItem, handleToolItemClick, undo, redo } =
    useContext(boardContext);
  // const [activeToolItem, setActiveToolItem] = useState("LINETOOL");

  return (
    <div className={classes.container}>
      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeToolItem === TOOL_ITEMS.BRUSHTOOL,
        })}
        onClick={() => handleToolItemClick(TOOL_ITEMS.BRUSHTOOL)}
      >
        <FaPaintBrush />
      </div>
      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeToolItem === TOOL_ITEMS.LINETOOL,
        })}
        onClick={() => handleToolItemClick(TOOL_ITEMS.LINETOOL)}
      >
        <FaSlash />
      </div>
      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeToolItem === TOOL_ITEMS.RECTANGLETOOL,
        })}
        onClick={() => handleToolItemClick(TOOL_ITEMS.RECTANGLETOOL)}
      >
        <LuRectangleHorizontal />
      </div>

      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeToolItem === TOOL_ITEMS.CIRCLETOOL,
        })}
        onClick={() => handleToolItemClick(TOOL_ITEMS.CIRCLETOOL)}
      >
        <FaRegCircle />
      </div>
      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeToolItem === "ARROWTOOL",
        })}
        onClick={() => handleToolItemClick("ARROWTOOL")}
      >
        <FaArrowRight />
      </div>
      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeToolItem === "FONTTOOL",
        })}
        onClick={() => handleToolItemClick(TOOL_ITEMS.TEXT)}
      >
        <FaFont />
      </div>
      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeToolItem === TOOL_ITEMS.ERASER,
        })}
        onClick={() => handleToolItemClick(TOOL_ITEMS.ERASER)}
      >
        <FaEraser />
      </div>
      <div className={classes.toolItem} onClick={undo}>
        <FaUndoAlt />
      </div>
      <div className={classes.toolItem} onClick={redo}>
        <FaRedoAlt />
      </div>
      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeToolItem === "DOWNLOAD",
        })}
        onClick={() => handleToolItemClick("DOWNLOAD")}
      >
        <FaDownload />
      </div>
    </div>
  );
};

export default Toolbar;

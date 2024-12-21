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

const Toolbar = () => {
  const { activeToolItem, handleToolItemClick } = useContext(boardContext);
  // const [activeToolItem, setActiveToolItem] = useState("LINETOOL");

  return (
    <div className={classes.container}>
      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeToolItem === "PAINTBRUSHTOOL",
        })}
        onClick={() => handleToolItemClick("PAINTBRUSHTOOL")}
      >
        <FaPaintBrush />
      </div>
      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeToolItem === "LINETOOL",
        })}
        onClick={() => handleToolItemClick("LINETOOL")}
      >
        <FaSlash />
      </div>
      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeToolItem === "RECTANGLETOOL",
        })}
        onClick={() => handleToolItemClick("RECTANGLETOOL")}
      >
        <LuRectangleHorizontal />
      </div>

      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeToolItem === "CIRCLETOOL",
        })}
        onClick={() => handleToolItemClick("CIRCLETOOL")}
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
        onClick={() => handleToolItemClick("FONTTOOL")}
      >
        <FaFont />
      </div>
      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeToolItem === "ERASERTOOL",
        })}
        onClick={() => handleToolItemClick("ERASERTOOL")}
      >
        <FaEraser />
      </div>
      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeToolItem === "UNDOTOOL",
        })}
        onClick={() => handleToolItemClick("UNDOTOOL")}
      >
        <FaUndoAlt />
      </div>
      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeToolItem === "REDOTOOL",
        })}
        onClick={() => handleToolItemClick("REDOTOOL")}
      >
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

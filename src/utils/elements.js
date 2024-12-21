import { TOOL_ITEMS } from "../constants";
import rough from "roughjs/bin/rough";
import { getArrowHeadCoordinates } from "./math";
import { ARROW_LENGTH } from "../constants";
const gen = rough.generator();

export const createRoughElement = (id, x1, y1, x2, y2, { type }) => {
  const element = {
    id,
    x1,
    y1,
    x2,
    y2,
  };
  let options = {
    seed: id + 1, //id cant be zero
  };
  switch (type) {
    case TOOL_ITEMS.LINETOOL:
      element.roughEle = gen.line(x1, y1, x2, y2, options);
      return element;
    case TOOL_ITEMS.RECTANGLETOOL:
      element.roughEle = gen.rectangle(x1, y1, x2 - x1, y2 - y1, options);
      return element;
    case TOOL_ITEMS.CIRCLETOOL:
      const cx = (x1 + x2) / 2,
        cy = (y1 + y2) / 2;
      const width = x2 - x1,
        height = y2 - y1;
      element.roughEle = gen.ellipse(cx, cy, width, height, options);
      return element;

    case TOOL_ITEMS.ARROWTOOL:
      const { x3, y3, x4, y4 } = getArrowHeadCoordinates(
        x1,
        y1,
        x2,
        y2,
        ARROW_LENGTH
      );
      const points = [
        [x1, y1],
        [x2, y2],
        [x3, y3],
        [x2, y2],
        [x4, y4],
      ];
      element.roughEle = gen.linearPath(points, options);
      return element;
    default:
      throw new Error("Type not Recognised");
  }
};

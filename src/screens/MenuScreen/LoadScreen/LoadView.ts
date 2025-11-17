import Konva from "konva";
import type { View } from "../../../types.ts";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../../constants.ts";


export class LoadView implements View {
  private group: Konva.Group;

  constructor() {
    this.group = new Konva.Group({ visible: false });

    // Background
    const bg = new Konva.Rect({
      x: 0,
      y: 0,
      width: STAGE_WIDTH,
      height: STAGE_HEIGHT,
      fill: "#E6CEB1",
    });
    this.group.add(bg);
  }

  show(): void {
    this.group.visible(true);
    this.group.getLayer()?.draw();
  }

  hide(): void {
    this.group.visible(false);
    this.group.getLayer()?.draw();
  }

  getGroup(): Konva.Group {
    return this.group;
  }
}

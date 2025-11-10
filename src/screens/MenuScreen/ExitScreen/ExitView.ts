import Konva from "konva";
import type { View } from "../../../types.ts";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../../constants.ts";


export class ExitView implements View {
  private group: Konva.Group;

  constructor(onYesClick: () => void, 
                onNoClick: () => void) {
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

    const message = new Konva.Text({
      text: "Are your sure you want to exit?",
      x: 0,
      y: STAGE_HEIGHT / 2 - 150,
      width: STAGE_WIDTH,
      align: "center",
      fontSize: 40,
      fill: "black",
    });

    Konva.Image.fromURL("/res/no.png", (image) => {
        image.x(STAGE_WIDTH / 2 - image.width() / 2);
        image.y(STAGE_HEIGHT / 2 + 75);	
        image.on("click", onNoClick);
        this.group.add(image);
    });

    Konva.Image.fromURL("/res/yes.png", (image) => {
        image.x(STAGE_WIDTH / 2 - image.width() / 2);
        image.y(STAGE_HEIGHT / 2 - 75);	
        image.on("click", onYesClick);
        this.group.add(image);
    });

    this.group.add(message);

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

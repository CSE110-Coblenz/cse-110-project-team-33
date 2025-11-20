import Konva from "konva";
import type { View } from "../../../types.ts";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../../constants.ts";

export class LoadView implements View {
  private group: Konva.Group;
  private level: string;
  private yesButton: Konva.Image;
  private noButton: Konva.Image;
  private imagesLoaded: Promise<void>;
  private text2: Konva.Text;

  constructor() {
    this.group = new Konva.Group({ visible: false });
    this.level = "";
    this.yesButton = new Konva.Image();
    this.noButton = new Konva.Image();
    
    // Background
    const bg = new Konva.Rect({
      x: 0,
      y: 0,
      width: STAGE_WIDTH,
      height: STAGE_HEIGHT,
      fill: "#E6CEB1",
    });
    this.group.add(bg);

    const text1 = new Konva.Text({
      x: 0,
      y: STAGE_HEIGHT / 2 - 140,
      text: "Welcome back!",
      fontSize: 20,
      width: STAGE_WIDTH,
      align: "center",
      fontFamily: "Press Start 2P",
    });

    // Store text2 as instance variable instead of const
    this.text2 = new Konva.Text({
      x: 0,
      y: STAGE_HEIGHT / 2 + 30 - 140,
      text: "It looks like you're on level " + this.level + ".",
      fontSize: 20,
      width: STAGE_WIDTH,
      align: "center",
      fontFamily: "Press Start 2P",
    });

    const text3 = new Konva.Text({
      x: 0,
      y: STAGE_HEIGHT / 2 + 60 - 140,
      text: "Are you ready to continue exploring",
      fontSize: 20,
      width: STAGE_WIDTH,
      align: "center",
      fontFamily: "Press Start 2P",
    });

    const text4 = new Konva.Text({
      x: 0,
      y: STAGE_HEIGHT / 2 + 90 - 140,
      text: "exploring the PI-yrimid?",
      fontSize: 20,
      width: STAGE_WIDTH,
      align: "center",
      fontFamily: "Press Start 2P",
    });

    this.group.add(text1);
    this.group.add(this.text2); // Add the instance variable
    this.group.add(text3);
    this.group.add(text4);

    // Create a promise that resolves when both images are loaded
    this.imagesLoaded = Promise.all([
      this.loadYesButton(),
      this.loadNoButton()
    ]).then(() => {});
  }

  private loadYesButton(): Promise<void> {
    return new Promise((resolve) => {
      Konva.Image.fromURL("/res/yes.png", (image) => {
        image.width(150);
        image.height(75);
        image.x(STAGE_WIDTH / 2 - 200);
        image.y(STAGE_HEIGHT / 2 + 20);
        this.yesButton = image;
        this.group.add(image);
        resolve();
      });
    });
  }

  private loadNoButton(): Promise<void> {
    return new Promise((resolve) => {
      Konva.Image.fromURL("/res/no.png", (image) => {
        image.width(150);
        image.height(75);
        image.x(STAGE_WIDTH / 2 + 50);
        image.y(STAGE_HEIGHT / 2 + 20);
        this.noButton = image;
        this.group.add(image);
        resolve();
      });
    });
  }

  // Add this method to wait for images to load
  async whenReady(): Promise<void> {
    await this.imagesLoaded;
  }

  setLevel(level: string): void {
    this.level = level;
    this.text2.text("It looks like you're on level " + level + ".");
    // Redraw the layer if it's visible
    if (this.group.visible()) {
      this.group.getLayer()?.draw();
    }
  }

  getNoButton(): Konva.Image {
    return this.noButton;
  }

  getYesButton(): Konva.Image {
    return this.yesButton;
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
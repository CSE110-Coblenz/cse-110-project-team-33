import Konva from "konva";
import type { View } from "../../../types.ts";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../../constants.ts";

export class Level1View implements View {
    private group: Konva.Group;
    private backgroundGroup: Konva.Group;
    private textInputGroup: Konva.Group;
    private problemText: Konva.Text;
    private option1Text: Konva.Text;
    private option2Text: Konva.Text;
    private option3Text: Konva.Text;
    
    // Add these image properties
    private pyramidImage: Konva.Image;
    private doorImage: Konva.Image;
    private pillar1Image: Konva.Image;
    private pillar2Image: Konva.Image;
    private groundImage: Konva.Image;
    private backpack: Konva.Image;

    constructor() {
        this.group = new Konva.Group({ visible: false });
        this.backgroundGroup = new Konva.Group();
        this.textInputGroup = new Konva.Group();
        
        // Initialize images
        this.pyramidImage = new Konva.Image();
        this.doorImage = new Konva.Image();
        this.pillar1Image = new Konva.Image();
        this.pillar2Image = new Konva.Image();
        this.groundImage = new Konva.Image();
        this.backpack = new Konva.Image();

        const background = new Konva.Rect({
            x: 0,
            y: 0,
            width: STAGE_WIDTH,
            height: STAGE_HEIGHT,
            fill: "#D6E8FF",
        });
        this.backgroundGroup.add(background);

        this.loadBackground();

        // Text
        this.problemText = new Konva.Text({
            x: 25,
            y: STAGE_HEIGHT - 200,
            text: "",
            fontSize: 24,
            fontFamily: "Arial",
            fill: "black",
        });
        this.textInputGroup.add(this.problemText);

        this.option1Text = new Konva.Text({
            x: STAGE_WIDTH / 2 - 200,
            y: STAGE_HEIGHT - 100,
            text: "1",
            fontSize: 24,
            fontFamily: "Arial",
            fill: "black",
        });
        this.textInputGroup.add(this.option1Text);

        this.option2Text = new Konva.Text({
            x: STAGE_WIDTH / 2,
            y: STAGE_HEIGHT - 100,
            text: "2",
            fontSize: 24,
            fontFamily: "Arial",
            fill: "black",
        });
        this.textInputGroup.add(this.option2Text);

        this.option3Text = new Konva.Text({
            x: STAGE_WIDTH / 2 + 200,
            y: STAGE_HEIGHT - 100,
            text: "3",
            fontSize: 24,
            fontFamily: "Arial",
            fill: "black",
        });
        this.textInputGroup.add(this.option3Text);

        this.group.add(this.backgroundGroup);
        this.group.add(this.textInputGroup);
    }

    private async loadBackground(): Promise<void> {
        try {
            // Load all images in parallel since they don't need specific ordering
            await this.loadImage("/res/pyramid.png", this.pyramidImage, STAGE_WIDTH, STAGE_HEIGHT / 2, 0, 0);
            await this.loadImage("/res/door.png", this.doorImage, 85, 150, STAGE_WIDTH / 2 - 30, STAGE_HEIGHT / 2 - 125);
            Promise.all([
                this.loadImage("/res/pillar_1.png", this.pillar1Image, 75, 150, STAGE_WIDTH / 2 - 105, STAGE_HEIGHT / 2 - 150),
                this.loadImage("/res/pillar_2.png", this.pillar2Image, 150, 175, STAGE_WIDTH / 2 - 30, STAGE_HEIGHT / 2 - 175),
                this.loadImage("/res/ground.png", this.groundImage, STAGE_WIDTH, STAGE_HEIGHT / 2, 0, STAGE_HEIGHT / 2),
                this.loadImage("/res/backpack.png", this.backpack, 50, 50, 0, 0)
            ]);
            
            this.group.getLayer()?.batchDraw();
        } catch (error) {
            console.error("Error loading background images:", error);
        }
    }

    private loadImage(src: string, imageProperty: Konva.Image, width: number, height: number, x: number, y: number): Promise<void> {
        return new Promise((resolve, reject) => {
            Konva.Image.fromURL(src, (image) => {
                image.width(width);
                image.height(height);
                image.x(x);
                image.y(y);
                    
                Object.assign(imageProperty, image);
                this.backgroundGroup.add(image);
                
                resolve();
            }, reject)
        });
    }

    setProblemText(problemText: string) : void {
        this.problemText.text(problemText);
        this.group.getLayer()?.draw();
    }

    setOption1Text(option1Text: string) : void {
        this.option1Text.text(option1Text);
        this.group.getLayer()?.draw();
    }

    setOption2Text(option2Text: string) : void {
        this.option2Text.text(option2Text);
        this.group.getLayer()?.draw();
    }

    setOption3Text(option3Text: string) : void {
        this.option3Text.text(option3Text);
        this.group.getLayer()?.draw();
    }

    getOption1TextNode(): Konva.Text {
        return this.option1Text;
    }

    getOption2TextNode(): Konva.Text {
        return this.option2Text;
    }

    getOption3TextNode(): Konva.Text {
        return this.option3Text;
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
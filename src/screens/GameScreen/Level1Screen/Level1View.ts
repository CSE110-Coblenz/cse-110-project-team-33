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
    private option1Button: Konva.Image;
    private option2Button: Konva.Image;
    private option3Button: Konva.Image;
    
    // Add these image properties
    private pyramidImage: Konva.Image;
    private doorImage: Konva.Image;
    private pillar1Image: Konva.Image;
    private pillar2Image: Konva.Image;
    private groundImage: Konva.Image;
    private backpack: Konva.Image;
    private levelClue: Konva.Image;
    private mgClue: Konva.Image;

    private levelClueX: number = STAGE_WIDTH / 2 - 250;
    private levelClueY: number = STAGE_HEIGHT / 2 + 25;

    private mgClueX: number = STAGE_WIDTH / 2 + 200;
    private mgClueY: number = STAGE_HEIGHT / 2 + 25;

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
        this.levelClue = new Konva.Image();
        this.mgClue = new Konva.Image();
        this.option1Button = new Konva.Image();
        this.option2Button = new Konva.Image();
        this.option3Button = new Konva.Image();


        const background = new Konva.Rect({
            x: 0,
            y: 0,
            width: STAGE_WIDTH,
            height: STAGE_HEIGHT,
            fill: "#D6E8FF",
        });
        this.backgroundGroup.add(background);

        // Text
        this.problemText = new Konva.Text({
            x: 25,
            y: STAGE_HEIGHT - 150,
            text: "",
            fontSize: 16,
            fontFamily: "Press Start 2P",
            fill: "black",
        });
        this.textInputGroup.add(this.problemText);

        this.option1Text = new Konva.Text({
            x: STAGE_WIDTH / 2 - 205,
            y: STAGE_HEIGHT - 75,
            text: "1",
            fontSize: 16,
            fontFamily: "Press Start 2P",
            fill: "black",
        });
        this.textInputGroup.add(this.option1Text);

        this.option2Text = new Konva.Text({
            x: STAGE_WIDTH / 2 - 5,
            y: STAGE_HEIGHT - 75,
            text: "2",
            fontSize: 16,
            fontFamily: "Press Start 2P",
            fill: "black",
        });
        this.textInputGroup.add(this.option2Text);

        this.option3Text = new Konva.Text({
            x: STAGE_WIDTH / 2 + 200,
            y: STAGE_HEIGHT - 75,
            text: "3",
            fontSize: 16,
            fontFamily: "Press Start 2P",
            fill: "black",
        });
        this.textInputGroup.add(this.option3Text);

        this.group.add(this.backgroundGroup);
        this.group.add(this.textInputGroup);
    }

    private async loadBackground(): Promise<void> {
        try {
            this.pyramidImage = await this.loadImage("/res/pyramid.png", STAGE_WIDTH, STAGE_HEIGHT / 2, 0, 0);
            this.doorImage = await this.loadImage("/res/door.png", 85, 150, STAGE_WIDTH / 2 - 30, STAGE_HEIGHT / 2 - 125);
            
            const [pillar1, pillar2, ground, backpack] = await Promise.all([
                this.loadImage("/res/Pillar.png", 100, 160, STAGE_WIDTH / 2 - 100, STAGE_HEIGHT / 2 - 150),
                this.loadImage("/res/Pillar.png", 100, 160, STAGE_WIDTH / 2 - 50, STAGE_HEIGHT / 2 - 120, -30),
                this.loadImage("/res/ground.png", STAGE_WIDTH, STAGE_HEIGHT / 2, 0, STAGE_HEIGHT / 2),
                this.loadImage("/res/backpack.png", 50, 50, 5, 5),
            ]);
            
            this.pillar1Image = pillar1;
            this.pillar2Image = pillar2;
            this.groundImage = ground;
            this.backpack = backpack;
            
            const [levelClue, mgClue] = await Promise.all([
                this.loadImage("/res/pillar_outline.png", 100, 100, this.levelClueX, this.levelClueY),
                this.loadImage("/res/Clue.png", 100, 100, this.mgClueX, this.mgClueY),
            ]);
            
            this.levelClue = levelClue;
            this.mgClue = mgClue;
            
            const [btn1, btn2, btn3] = await Promise.all([
                this.loadImage("/res/button.png", 125, 75, 150, STAGE_HEIGHT - 105),
                this.loadImage("/res/button.png", 125, 75, STAGE_WIDTH / 2 - 50, STAGE_HEIGHT - 105),
                this.loadImage("/res/button.png", 125, 75, STAGE_WIDTH / 2 + 150, STAGE_HEIGHT - 105)
            ]);
            
            this.option1Button = btn1;
            this.option2Button = btn2;
            this.option3Button = btn3;

            this.group.getLayer()?.batchDraw();
        } catch (error) {
            console.error("Error loading background images:", error);
        }
    }

    private loadImage(src: string, width: number, height: number, x: number, y: number, r?: number): Promise<Konva.Image> {
        return new Promise((resolve, reject) => {
            Konva.Image.fromURL(src, (image) => {
                image.width(width);
                image.height(height);
                image.x(x);
                image.y(y);
                image.listening(true); // Enable events
                
                if (r !== undefined) {
                    image.rotate(r);
                }
                
                this.backgroundGroup.add(image);
                resolve(image); // Return the actual image
            }, reject)
        });
    }

    

    waitForLoadBackground(): Promise<void> {
        return this.loadBackground();
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

    getBackpackNode(): Konva.Image {
        return this.backpack;
    }

    getLevelClueNode(): Konva.Image {
        return this.levelClue;
    }

    getMGClueNode(): Konva.Image {
        return this.mgClue;
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
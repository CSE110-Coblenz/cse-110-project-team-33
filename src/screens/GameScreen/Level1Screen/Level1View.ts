import Konva from "konva";
import type { View } from "../../../types.ts";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../../constants.ts";

export class Level1View implements View {
    // Groups
    private group: Konva.Group;
    private backgroundGroup: Konva.Group;
    private textInputGroup: Konva.Group;

    // Images
    private background: Konva.Image;
    private door: Konva.Image;
    private pillar1: Konva.Image;
    private pillar2: Konva.Image;
    private backpack: Konva.Image;
    private levelClue: Konva.Image;
    private mgClue: Konva.Image;
    private crystal: Konva.Image;

    // Text
    private coinsText: Konva.Text;
    private problemText: Konva.Text;
    private option1Text: Konva.Text;
    private option2Text: Konva.Text;
    private option3Text: Konva.Text;

    // Data
    private coins: number;

    constructor() {
        // Groups
        this.group = new Konva.Group({ visible: false });
        this.backgroundGroup = new Konva.Group();
        this.textInputGroup = new Konva.Group();
        
        // Images
        this.background = new Konva.Image();
        this.door = new Konva.Image();
        this.backpack = new Konva.Image();
        this.pillar1 = new Konva.Image();
        this.pillar2 = new Konva.Image();
        this.levelClue = new Konva.Image();
        this.mgClue = new Konva.Image();
        this.crystal = new Konva.Image();

        // Text
        this.coinsText = new Konva.Text();
        this.problemText = new Konva.Text();
        this.option1Text = new Konva.Text();
        this.option2Text = new Konva.Text();
        this.option3Text = new Konva.Text();
        
        // Data
        this.coins = 0

        // ------------------------------------------
        
        // Text
        this.problemText = new Konva.Text({
            x: 25,
            y: STAGE_HEIGHT - 120,
            text: "",
            fontSize: 16,
            fontFamily: "Press Start 2P",
            fill: "black",
        });
        this.textInputGroup.add(this.problemText);

        this.option1Text = new Konva.Text({
            x: STAGE_WIDTH / 2 - 220,
            y: STAGE_HEIGHT - 60,
            text: "1",
            fontSize: 16,
            fontFamily: "Press Start 2P",
            fill: "black",
        });
        this.textInputGroup.add(this.option1Text);

        this.option2Text = new Konva.Text({
            x: STAGE_WIDTH / 2 - 20,
            y: STAGE_HEIGHT - 60,
            text: "2",
            fontSize: 16,
            fontFamily: "Press Start 2P",
            fill: "black",
        });
        this.textInputGroup.add(this.option2Text);

        this.option3Text = new Konva.Text({
            x: STAGE_WIDTH / 2 + 200,
            y: STAGE_HEIGHT - 60,
            text: "3",
            fontSize: 16,
            fontFamily: "Press Start 2P",
            fill: "black",
        });
        this.textInputGroup.add(this.option3Text);

        this.coinsText = new Konva.Text({
            x: 135,
            y: 20,
            text: String(this.coins),
            fontSize: 20,
            fontFamily: "Press Start 2P",
            fill: "black",
        });
        this.textInputGroup.add(this.coinsText);

        this.group.add(this.backgroundGroup);
        this.group.add(this.textInputGroup);
    }

    private async loadBackground(): Promise<void> {
        try {
            this.background = await this.loadImage("/res/level_1_background.png", STAGE_WIDTH, STAGE_HEIGHT, 0, 0);
            this.door = await this.loadImage("/res/level_1_door.png", 150, 200, STAGE_WIDTH / 2 - 75, STAGE_HEIGHT / 2 - 100);
            
            const [backpack, crystal] = await Promise.all([
                this.loadImage("/res/backpack.png", 50, 50, 5, 5),
                this.loadImage("/res/crystal.png", 40, 50, STAGE_WIDTH / 2 - 20, STAGE_HEIGHT / 2 - 60),
                this.loadImage("/res/Coins.png", 50, 50, 75, 5)
            ]);

            this.backpack = backpack;
            this.crystal = crystal;

            const [pillar1, pillar2] = await Promise.all([
                this.loadImage("/res/Pillar.png", 130, 210, STAGE_WIDTH / 2 - 150, STAGE_HEIGHT / 2 - 105),
                this.loadImage("/res/Pillar.png", 130, 210, STAGE_WIDTH / 2 - 90, STAGE_HEIGHT / 2 - 50, -35),
            ])
            
            this.pillar1 = pillar1;
            this.pillar2 = pillar2;
            
            const [levelClue, mgClue] = await Promise.all([
                this.loadImage("/res/Clue.png", 100, 100, STAGE_WIDTH / 2 - 275, STAGE_HEIGHT / 2),
                this.loadImage("/res/Clue.png", 100, 100, STAGE_WIDTH - 100, STAGE_HEIGHT - 100),
            ]);
            
            this.levelClue = levelClue;
            this.mgClue = mgClue;

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
                // image.listening(true); // Enable events
                
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

    setCoins(coins: number) {
        this.coins = coins;
        this.coinsText.text(String(this.coins));
        this.group.getLayer()?.batchDraw();
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

    // Nodes for click and move listeners
    getBackpackNode(): Konva.Image {
        return this.backpack;
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

    getDoorNode(): Konva.Image {
        return this.door;
    }

    getCrystalNode(): Konva.Image {
        return this.crystal;
    }

    getLevelClueNode(): Konva.Image {
        return this.levelClue;
    }

    getMGClueNode(): Konva.Image {
        return this.mgClue;
    }

    animateMovePillar(): Promise<void> {
        return new Promise((resolve) => {
            // Set the rotation point to bottom-right corner
            this.pillar2.offsetX(this.pillar2.width());
            this.pillar2.offsetY(this.pillar2.height());
            this.pillar2.x(STAGE_WIDTH / 2 + 145);
            this.pillar2.y(STAGE_HEIGHT / 2 + 80);
            
            // Konva.Tween animates properties of a Konva node smoothly over a set duration.
            const anim = new Konva.Tween({
                node: this.pillar2,
                duration: 2,
                rotation: 0, // Animate to upright position
                easing: Konva.Easings.EaseInOut,
                onFinish: () => {
                    this.pillar2.x(STAGE_WIDTH / 2 + 145);
                    this.pillar2.y(STAGE_HEIGHT / 2 + 105);
                    resolve(); // Signals completion
                }
            });
            anim.play();
        });
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
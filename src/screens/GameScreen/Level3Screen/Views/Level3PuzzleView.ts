// import statements
import Konva from "konva";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../../../constants.ts";

export class Level3PuzzleView {
    // elements
    private group: Konva.Group; // whole view
    // all rocks (5)
    private rock1: Konva.Image;
    private rock2: Konva.Image;
    private rock3: Konva.Image;
    private rock4: Konva.Image;
    private rock5: Konva.Image;

    private water: Konva.Image;
    private chosen: number[];
    private back: Konva.Image;

    private status: boolean;

    // constructor
    constructor() {
        this.group = new Konva.Group;
        // all 5 rocks
        this.rock1 = new Konva.Image;
        this.rock2 = new Konva.Image;
        this.rock3 = new Konva.Image;
        this.rock4 = new Konva.Image;
        this.rock5 = new Konva.Image;

        this.back =  new Konva.Image;

        this.water = new Konva.Image;
        this.chosen = [0, 0, 0, 0, 0]; // image of selected rock
        this.status = false; // initially false

        this.loadBackground();

    } // end of constructor
    
    // promises for images
    private async loadBackground(): Promise<void> {
        try {
            await this.loadWater();

            await Promise.all([
                this.loadRock(this.rock1, 170, 425, 0),
                this.loadRock(this.rock2, STAGE_WIDTH / 2 - 80, STAGE_HEIGHT / 2 - 50, 1),
                this.loadRock(this.rock3, STAGE_WIDTH / 2 - 220, STAGE_HEIGHT / 2 - 240, 2),
                this.loadRock(this.rock4, STAGE_WIDTH / 2 + 150, STAGE_HEIGHT / 2 - 180, 3),
                this.loadRock(this.rock5, STAGE_WIDTH / 2 + 170, STAGE_HEIGHT / 2 + 80, 4),

                // add loadButton here
                this.loadBack()
            ]);

            this.group.getLayer()?.batchDraw();

        } catch (error) {
            console.error("Error loading images:", error);
        }
    }

    // functions
    private async loadWater(): Promise<void> {
        return new Promise((resolve, reject) => {
            Konva.Image.fromURL("/res/Water.png", (image) => {
                image.width(STAGE_WIDTH);
                image.height(STAGE_HEIGHT);
                image.listening(true);
                this.water = image;
                this.group.add(this.water);
                resolve();
            }, reject);
        });
    }

    // add loadButton ^^ use loadWater for reference

    private loadRock(rock: Konva.Image, x: number, y: number, idx: number): Promise<void> {
        return new Promise((resolve, reject) => {
            Konva.Image.fromURL("/res/Rock.png", (image) => {
                image.width(120);
                image.height(120);
                image.x(x);
                image.y(y);
                image.listening(true);

                rock = image;
                this.group.add(rock);

                image.on('mouseover', () => {
                    document.body.style.cursor = "pointer";
                });
                image.on('mouseout', () => {
                    document.body.style.cursor = "default";
                });
                
                // Add click handler
                rock.on('click', () => {
                    // if not clicked -> scale and set to selected
                    if((this.chosen)[idx] == 0){
                        (this.chosen)[idx] = 1;
                        rock.scale({ x: 1.1, y: 1.1 });
                    }
                    else{
                        (this.chosen)[idx] = 0;
                        rock.scale({ x: 1, y: 1 }); // Reset the image size
                    }
                });
                this.group.add(rock);
                
                resolve();
            }, reject);
        });
    }

    private async loadBack(): Promise<void> {
        return new Promise((resolve, reject) => {
            Konva.Image.fromURL("/res/arrow.png", (image) => {
                image.width(100);
                image.height(100);
                image.y(500);
                image.listening(true);
                this.back = image;
                this.group.add(this.back);

                // all click handlers
                // mouseover to show it's being hovered over to click
                this.back.on('mouseover', () => {
                    document.body.style.cursor = "pointer";
                    this.back.scale({ x: 1.1, y: 1.1 }); // Slightly enlarge the image
                    this.back.getLayer()?.batchDraw();
                });
                this.back.on('mouseout', () => {
                    document.body.style.cursor = "default";
                    this.back.scale({ x: 1, y: 1 }); // Reset the image size
                    this.back.getLayer()?.batchDraw();
                });

                this.back.on('click', () => {
                    this.group.moveToBottom();
                    this.group.getLayer()?.draw();
                })
                // this.group.add(this.back);

                resolve();
            }, reject);
        });
    }
    // end of promises for images
    // check answer
    checkAnswer(): boolean {
        console.log(this.chosen);

        if((this.chosen)[0] == 1){
            if((this.chosen)[1] == 1){
                if((this.chosen)[2] == 1){
                    return true;
                }
            }
        }
        return false;
    }

    // functions
    /**
     * Show the screen
     */
    show(): void {
        this.group.visible(true);
        this.group.getLayer()?.draw();
    }

    /**
     * Hide the screen
     */
    hide(): void {
        this.group.visible(false);
        this.group.getLayer()?.draw();
    }

    /**
     * return the group
     */
    getGroup(): Konva.Group {
        return this.group;
    }

    /**
     * return the array of which rocks were chosen
     */
    getChosen(): number[] {
        return this.chosen;
    }

    getloadBackground(): Promise<void> {
        return this.loadBackground();
    }
}
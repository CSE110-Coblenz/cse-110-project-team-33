// import statements
import Konva from "konva";
//import { View } from "../../../../types.ts";
//import type { ScreenSwitcher } from "../../../../types.ts";
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

    private back: Konva.Rect;

    //private room: Level3View;

    // constructor
    constructor() {
        this.group = new Konva.Group;
        // all 5 rocks
        this.rock1 = new Konva.Image;
        this.rock2 = new Konva.Image;
        this.rock3 = new Konva.Image;
        this.rock4 = new Konva.Image;
        this.rock5 = new Konva.Image;

        this.back =  new Konva.Rect;

        this.water = new Konva.Image;
        this.chosen = [0, 0, 0, 0, 0]; // image of selected rock
        //this.room = new Level3View;

        // water background
        Konva.Image.fromURL("/res/Water.png", (image) => {
            image.width(STAGE_WIDTH), image.height(STAGE_HEIGHT);

            //image.x(50), image.y(475);

            this.water = image;
            this.group.add(this.water);
        });

        Konva.Image.fromURL("/res/Rock.png", (image) => {
            image.width(120), image.height(120);

            image.x(170), image.y(425);

            this.rock1 = image;
            this.group.add(this.rock1);
            this.group.draw; // makes sure rock displays
        });

        Konva.Image.fromURL("/res/Rock.png", (image) => {
            image.width(120), image.height(120);

            image.x(STAGE_WIDTH / 2 - 80), image.y(STAGE_HEIGHT / 2 - 50);

            this.rock2 = image;
            this.group.add(this.rock2);
            this.group.draw; // makes sure rock displays
        });

        Konva.Image.fromURL("/res/Rock.png", (image) => {
            image.width(120), image.height(120);

            image.x(STAGE_WIDTH / 2 - 220), image.y(STAGE_HEIGHT / 2 - 240);

            this.rock3 = image;
            this.group.add(this.rock3);
            this.group.draw; // makes sure rock displays
        });

        Konva.Image.fromURL("/res/Rock.png", (image) => {
            image.width(120), image.height(120);

            image.x(STAGE_WIDTH / 2 + 150), image.y(STAGE_HEIGHT / 2 - 180);

            this.rock4 = image;
            this.group.add(this.rock4);
            this.group.draw; // makes sure rock displays
        });

        Konva.Image.fromURL("/res/Rock.png", (image) => {
            image.width(120), image.height(120);

            image.x(STAGE_WIDTH / 2 + 170), image.y(STAGE_HEIGHT / 2 + 80);

            this.rock5 = image;
            this.group.add(this.rock5);
            this.group.draw; // makes sure rock displays
        });

        this.rock1.on('click', () => {
            // change to selected img
            // this.back.scale({ x: 1.1, y: 1.1 }); // Slightly enlarge the image
            if(this.chosen[0] == 0){ // select and scale up
                this.chosen[0] = 1;
                this.rock1.scale({ x: 1.1, y: 1.1 });
            }
            else{ // already selected -> deselect and scale back down
                this.chosen[0] = 0;
                this.rock1.scale({ x: 1, y: 1 }); // Reset the image size
            }
        })

        /*
        // ** TESTING BACK BUTTON ** //
        Konva.Image.fromURL("/res/Clue.png", (image) => {
            //image.width(120), image.height(120);
            image.offsetX(image.width() / 2), image.offsetY(image.height() / 2);
            image.x(STAGE_WIDTH / 2), image.y(STAGE_HEIGHT / 2);

            this.back = image;
            this.group.add(this.back);
            this.back.moveToTop();
            this.group.getLayer()?.draw(); // makes sure rock displays
        });
        */
        this.loadBackground();

        // "hide view"
        this.back.on('click', () => {
            //this.group.moveToBottom();
            //this.group.getLayer()?.draw();
        })

        this.back.on('mouseover', () => {
                this.back.scale({ x: 1.1, y: 1.1 }); // Slightly enlarge the image
                this.back.getLayer()?.batchDraw();
            });
        this.back.on('mouseout', () => {
                this.back.scale({ x: 1, y: 1 }); // Reset the image size
                this.back.getLayer()?.batchDraw();
        });


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
                this.loadRock(this.rock5, STAGE_WIDTH / 2 + 170, STAGE_HEIGHT / 2 + 80, 4)

                // add loadButton here
            ]);

            this.back = new Konva.Rect({
                x: 0,
                y: 0,
                width: 100,
                height: 100,
                fill: "red",
            });
            this.group.add(this.back);

            // mouseover to show it's being hovered over to click
            this.back.on('mouseover', () => {
                this.back.scale({ x: 1.1, y: 1.1 }); // Slightly enlarge the image
                this.back.getLayer()?.batchDraw();
            });
            this.back.on('mouseout', () => {
                this.back.scale({ x: 1, y: 1 }); // Reset the image size
                this.back.getLayer()?.batchDraw();
            });

            this.back.on('click', () => {
                this.group.moveToBottom();
                this.group.getLayer()?.draw();
            })
            this.group.add(this.back);

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
                //image.offsetX(image.width() / 2);
                //image.offsetY(image.height() / 2);
                rock = image;
                this.group.add(rock);
                
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

    // end of promises for images


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
}
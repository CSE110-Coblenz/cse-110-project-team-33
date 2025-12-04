// import statements
import Konva from "konva";
import type { View } from "../../types";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../constants";
import type { ScreenSwitcher } from "../../types";

export class ResultsView implements View {
    // ** variables ** //
    private group: Konva.Group;
    private screenSwithcer: ScreenSwitcher;
    
    // all images
    private bg: Konva.Image; // room background
    private menu_button: Konva.Image;
    private exit_button: Konva.Image;
    private back_button: Konva.Image;
    private coins: Konva.Image; // to display number of coins earned
    private crystal: Konva.Image; // to display number of crystals found
    // private minigame: boolean; // display if the minigame was completed?

    // win game sound effect (maybe?)
    private win_sound: HTMLAudioElement;

    // ** aything testing ** //
    private congratulations: Konva.Text;
    private text: Konva.Text;
    private text2: Konva.Text;

    // text for final page
    private t1: Konva.Text;
    private t2: Konva.Text;

    // constructor
    constructor(screenSwitcher: ScreenSwitcher) {
        this.group = new Konva.Group({visible: false});
        this.screenSwithcer = screenSwitcher;

        // all images for display
        this.bg = new Konva.Image();
        this.menu_button = new Konva.Image();
        this.exit_button = new Konva.Image();
        this.back_button = new Konva.Image();
        this.coins = new Konva.Image();
        this.crystal = new Konva.Image();

        // audio
        this.win_sound = new Audio("/res/sounds/winner.wav");
        this.win_sound.volume = 0.2;

        this.congratulations = new Konva.Text({
            text: "Congratulations!",
            fontSize: 36,
            fontFamily: "Press Start 2P",
            fill: "black",
            x: 130,
            y: 40
        });

        this.t1 = new Konva.Text({
            text: "You've demonstrated your trigonometric prowess,",
            fontSize: 15,
            fontFamily: "Press Start 2P",
            fill: "black",
            x: 45,
            y: 350    
        });
        this.t2 = new Konva.Text({
            text: "and have displayed your mathematical abilities!",
            fontSize: 15,
            fontFamily: "Press Start 2P",
            fill: "black",
            x: 45,
            y: 380    
        });

        this.text = new Konva.Text({
            text: "You explored the whole PI-yramid!",
            fontSize: 23,
            fontFamily: "Press Start 2P",
            fill: "black",
            x: 30,
            y: 90    
        });

        this.text2 = new Konva.Text({
            text: "During your journey you found...",
            fontSize: 23,
            fontFamily: "Press Start 2P",
            fill: "black",
            x: 40,
            y: 120    
        })
    }// end of consturctor

    // load background image + anything that will be displayed on top of it
    private async loadBackground(): Promise<void> {
        try {
            // load in background
            this.bg = await this.loadImage("/res/paper.png", STAGE_WIDTH, STAGE_HEIGHT, 0, 0); // room background
            this.back_button = await this.loadImage("/res/arrow.png", 50, 50, 750, 550);

            this.performActionsWithDelay();
    
            this.group.getLayer()?.batchDraw();
            } catch (error) {
                console.error("Error loading images:", error);
        }
    }

    // general function to load in images
    private loadImage(src: string, width: number, height: number, x: number, y: number): Promise<Konva.Image> {
        return new Promise((resolve, reject) => {
            Konva.Image.fromURL(src, (image) => {
                image.width(width);
                image.height(height);
                image.x(x);
                image.y(y);
                image.listening(true); // Enable events

                if(src == "/res/arrow.png"){
                    image.offsetX(image.width() / 2);
                    image.offsetY(image.height() / 2);
                    image.rotate(180);
                }
                // add to the background group
                this.group.add(image);
                resolve(image); // Return the actual image
            }, reject)
        });
    }

    // beginning of functions (needed for implementing View)
    getGroup(): Konva.Group {
        return this.group;
    }

    show(): void {
        this.group.visible(true);
    }
    
    hide(): void {
        this.group.visible(false);
    }
    // end of functions (needed for implementing View)

    // for controller to load in the background
    getBG(): Promise<void> {
        return this.loadBackground();
    }

    // getters for every interactable image
    getCrystal(): Konva.Image { // ** note: might not need this anymore
        return this.crystal;
    }

    getBack(): Konva.Image { // originally back button -> used to click for next text
        return this.back_button;
    }

    /**
     * play sound upon winning
     * ** note: HTML doesn't allow for autoplay on sounds apparently
     */
    playSound(): void {
        this.win_sound.play();
    }

    // ** functions that deal with loading in button views ** //
    getMenuButton(): Konva.Image {
        return this.menu_button;
    }

    getExitButton(): Konva.Image {
        return this.exit_button;
    }

    // separate because they load in later
    async loadButtons(): Promise<void> {
        // load the return to menu and exit buttons to be clicked on
        try {
            const[menu, exit] = await Promise.all([
                this.loadImage("/res/MenuReturn.png", 264, 90, 80, 450),
                this.loadImage("/res/exit.png", 264, 90, 450, 450)
            ]);

            this.menu_button = menu;
            this.exit_button = exit;

            this.handleButtonClick(this.menu_button, "menu");
            this.handleButtonClick(this.exit_button, "exit");

            // text prompt
            const prompt = new Konva.Text({
                text: "What shall you do now that your journey is over?",
                fontSize: 15,
                fontFamily: "Press Start 2P",
                fill: "black",
                x: 40,
                y: 420  
            })

            this.group.add(prompt);
            this.group.add(this.t1);
            this.group.add(this.t2);

            this.group.getLayer()?.batchDraw();
            } catch (error) {
                console.error("Error loading images:", error);
        }
    }

    // handle button switches back to menu or to exit screen
    handleButtonClick(node: any, button: string): void {
        // change mouse display to indicate clickable items
        node.on("mouseover", () => {
            document.body.style.cursor = "pointer";
        })
        node.on("mouseout", () => {
            document.body.style.cursor = "default";
        })

        node.on("click", () => {
            // hide current group
            this.group.hide();

            // depending on which button is clicked -> switch to corresponding screen
            if(button == "menu"){
                this.screenSwithcer.switchToScreen({type: "menu"});
            } else if(button == "exit") {
                this.screenSwithcer.switchToScreen({type: "exit"});
            }
        })
    }

    // load what's been collected into inventory
    async loadBag(coins_str: string, crystals_str: string): Promise<void> {
        try {
            const [crystal, coins] = await Promise.all([
                this.loadImage("/res/crystal.png", 80, 100, 410, 160),
                this.loadImage("/res/Coins.png", 100, 100, 30, 160)
            ])

            this.crystal = crystal;
            this.coins = coins;

            const num_coins = new Konva.Text({
                text: coins_str + " coins",
                fontSize: 24,
                fontFamily: "Press Start 2P",
                fill: "black",
                x: 145,
                y: 200    
            })

            const num_crystals = new Konva.Text({
                text: crystals_str + " crystals",
                fontSize: 24,
                fontFamily: "Press Start 2P",
                fill: "black",
                x: 510,
                y: 200    
            })
            this.group.add(num_coins);
            this.group.add(num_crystals);

            // check if they completed the mini game (?)

            // delete next button since nothing left to show
            this.back_button.destroy();

            this.group.getLayer()?.batchDraw();
        } catch (error) {
            console.error("Error loading: ", error);
        }
     }

     // animated congratulations
     async animatedText(str: string): Promise<void> {
        // this.congratulations.opacity(0); // start invisible

        const displayed = new Konva.Text({
            text: str,
            fontSize: 36,
            fontFamily: "Press Start 2P",
            fill: "black",
            x: 130,
            y: 40,
            opacity: 0 // start invisible
        })
        this.group.add(displayed);

        /*
        const congrats = new Konva.Text({
            text: "Congratulations!",
            fontSize: 36,
            fontFamily: "Press Start 2P",
            fill: "black",
            x: 130,
            y: 40,
            opacity: 0 // start invisible
        })
        this.group.add(congrats);
        */

        const anim = new Konva.Animation(function(frame) {
            const duration = 1000;
            const newOpacity = Math.min(1, frame.time / duration);

            displayed.opacity(newOpacity);
            
            displayed.getLayer()?.batchDraw();
        }, displayed.getLayer());

        anim.start();
    }

    async performActionsWithDelay() {
        console.log("Action 1 started.");
        this.animatedText("Congratulations!");

        // wait x amount of time
        await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 5 seconds

        // displays coins earned then wait
        console.log("Action 2 started after 5 seconds.");
        this.group.add(this.text);
        this.group.add(this.text2);
    }
}
// import statements
import Konva from "konva";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../../../constants";
import type { Element } from "./Element";

export class TextPopUp implements Element{
    // variables
    private alert: Konva.Text;
    private text: string;
    private status: boolean;

    // return the alert
    getElement(): Konva.Shape | Konva.Group {
        return this.alert;
    }
    getURL(): string {
        return "Not Implemented";
    }
    getID(): string {
        return this.text;
    }
    getDefaultHeight(): number {
        return STAGE_HEIGHT;
    }
    getDefaultWidth(): number {
        return STAGE_WIDTH;
    }

    // constructor
    constructor (identifier: string) {
        this.text = identifier; // alert identifier
        this.status = false; // initially invisible until shown on screen
        this.alert = new Konva.Text();
        
        // text to be displayed
        this.alert = new Konva.Text({
            text: "",
            align: "center",
            fontSize: 24,
            fontFamily: "Press Start 2P",
            fill: "black",
            x: STAGE_WIDTH / 2,
            y: STAGE_HEIGHT / 2,
            height: 24,
            width: STAGE_WIDTH,
            offsetX: STAGE_WIDTH / 2,
            visible: false,
        });
    }

    // function to trigger the alert
    triggerAlert(text: string) {
        // if the status is already true -> trigger the alert
        if (this.status){
            return;
        }
        // else set up text animation
        this.alert.text(text); // set the text of the alert to the given string
        this.alert.y(STAGE_WIDTH / 2);
        this.alert.opacity(0);
        this.alert.visible(true);

        // animation related variables
        // let animStage = 0;
        let floatUpCount = 0;
        let floatUpGoal = 50;
        let fadeStep = 0.05;
        let fadeIn = 0;
        let fadeOut = 5;

        // ** animation fade in ** //
        this.status = true;
        let animationTimer: any = null;

        // function to animate
        let animFunct = () => {
            // if the fadeIn amount is not 1, update amount by the step
            if(fadeIn < 1){
                fadeIn += fadeStep;
                this.alert.opacity(fadeIn); // update the opacity of the text
            }

            // if the floatUp value has not yet reached the floatUpGoal then update the count
            if(floatUpCount < floatUpGoal){
                floatUpCount += 1;
                this.alert.y(this.alert.y() - 1); // update the y value of the text
            } else if (fadeOut > fadeStep) {
                fadeOut -= fadeStep;
                this.alert.opacity(fadeOut);
            } else if (fadeOut <= fadeStep) {
                this.status = false;
                this.alert.visible(false);
                clearInterval(animationTimer);
                return;
            }
        };
        animationTimer = setInterval(animFunct, 16);
    }
}
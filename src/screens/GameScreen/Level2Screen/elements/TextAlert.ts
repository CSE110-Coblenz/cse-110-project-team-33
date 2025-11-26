/* File: TextAlert.ts
 * Author: Connor Larmer 
 *
 * Provides cute animated text notifications to help the player
 *
 */

import Konva from "konva";
import type { Element } from "./Element.ts";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../../../constants.ts";

export class TextAlert implements Element {

	private alert: Konva.Text;
    private id: string;
	private active: boolean;


    getURL()            { return "Not implemented"; }
    getID()             { return this.id; }
    getDefaultWidth()   { return STAGE_WIDTH; }
    getDefaultHeight()  { return STAGE_HEIGHT; }
    getElement()        { return this.alert; }
    
    constructor (id: string) {
        this.id = id;
        this.active = false;
        this.alert = new Konva.Text({
            text: "",
            align: "center",
            fontSize: 24,
            fontFamily: "Press Start 2P",
            fill: "yellow",
            x: STAGE_WIDTH/2,
            y: STAGE_HEIGHT/2,
            height: 24,
            width: STAGE_WIDTH,
            offsetX: STAGE_WIDTH/2,
            visible: false
        });
	}

	triggerAlert(text: string) {
		if(this.active) return;
		this.alert.text(text);
		this.alert.y(STAGE_WIDTH/2);
		this.alert.opacity(0);
		this.alert.visible(true);


		let animStage = 0;
		let floatUpCount = 0;
		let floatUpGoal = 20;
		let fadeStep = 0.05;
		let fadeIn = 0;
		let fadeOut = 1;
		/* fade in */
	    this.active = true;
        let animTimer: any = null;
        let animFunc = () => {

            if(fadeIn < 1) {
            	fadeIn += fadeStep;
           		this.alert.opacity(fadeIn);
            }
            
            if(floatUpCount < floatUpGoal) {
            	floatUpCount += 1;
            	this.alert.y(this.alert.y() - 5);
            } else if(fadeOut > fadeStep) {
            	fadeOut -= fadeStep;
           		this.alert.opacity(fadeOut);
            } else if(fadeOut <= fadeStep) {
            	this.active = false;
            	this.alert.visible(false);
            	clearInterval(animTimer);
            	return;
            }
        };
        animTimer = setInterval(animFunc, 32);
	}

	
}

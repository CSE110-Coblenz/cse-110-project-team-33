/* File: RoomView.ts
 * Author: Connor Larmer
 * Created on: 2025-11-05 @ 2:46 PM
 *
 * Summary: This is the main room view of level 2, The user will interact with
 * elements in this view, and solve the level from here.
 *
 */

import Konva from "konva";
import { Sundial } from "../elements/Sundial";
import { Clue } from "../elements/Clue";
import { Door } from "../elements/Door";
import { Background } from "../elements/Background";
import { Backpack } from "../elements/Backpack";
import { Coins } from "../elements/Coins";
import { Gem } from "../elements/Gem";
import { Overlay } from "../elements/Overlay";
import { ReturnArrow } from "../elements/ReturnArrow";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../../../constants";
import type { SubView } from "./SubView";

export class RoomView implements SubView {
    private parentView: SubView | null;
    private group: Konva.Group;

    private bg: Background;
    private door: Door;
    private overlay: Overlay;
    private sundial1: Sundial;
    private sundial2: Sundial;
    private sundial3: Sundial;

	private clue: Clue;
	private gem: Gem;
	private backpack: Backpack;
	private coins: Coins;
	
    private isDoorOpen: boolean;

    constructor(){
        this.parentView = null;
        this.isDoorOpen = false;
        this.group = new Konva.Group();
        this.bg = new Background(Background.mainBG, "RoomViewBG");
        this.overlay = new Overlay(Overlay.mainOverlay, "RoomViewOverlay");

        let centerX = STAGE_WIDTH/2;
        let centerY = STAGE_HEIGHT/2;
        this.door = new Door(centerX, 0, "exitDoor");
        this.sundial1 = new Sundial( centerX - 128, centerY, "sundial1");
        this.sundial2 = new Sundial( centerX      , centerY, "sundial2");
        this.sundial3 = new Sundial( centerX + 128, centerY, "sundial3");

		this.clue = new Clue(STAGE_WIDTH/2,STAGE_HEIGHT/2 + 96, "RoomViewClue");
		this.gem = new Gem(STAGE_WIDTH/2, STAGE_HEIGHT/2 - 128, "RoomViewGem");
		this.backpack = new Backpack("Level2_InventoryTrigger");
		this.coins = new Coins("RoomViewCoinIcon");
        /* The order matters here for composition reasons(?) */
        this.group.add(this.bg.getElement());
        this.group.add(this.door.getElement());
        this.group.add(this.sundial1.getElement());
        this.group.add(this.sundial2.getElement());
        this.group.add(this.sundial3.getElement());
        this.group.add(this.overlay.getElement());
        this.group.add(this.backpack.getElement());
        this.group.add(this.coins.getElement());
		this.group.add(this.clue.getElement());
		this.group.add(this.gem.getElement());

		this.gem.disable();
		
		/* This code makes the cursor into a pointer over the door when it
		 * is opened. It technically has to do with visuals, so its in the
		 * view. */
        this.door.getElement().on("mouseover", () => {
        	if(this.isDoorOpen) {
				this.group.getStage().container().style.cursor = "pointer";
        	} else {
				this.group.getStage().container().style.cursor = "default";        		
        	}
        });
        this.door.getElement().on("mouseout", () => {
        	this.group.getStage().container().style.cursor = "default";
        });

        this.hide();
    }

    getGroup(): Konva.Group {
        return this.group;
    }

    getGem() {
        return this.gem;
    }

    getClue() {
        return this.clue;
    }

	getDoorState() {
		return this.isDoorOpen;
	}
    setDoorState(state: boolean) {
    	this.isDoorOpen = state;
    }

    getCoinDisplay() {
        return this.coins;
    }

    setSundialHeight(dial: number, val: number) {
        switch(dial) {
            case 1:
                this.sundial1.setHeight(val);
                break;
            case 2:
                this.sundial2.setHeight(val);
                break;
            case 3:
                this.sundial3.setHeight(val);
                break;
        }
    }

    
    show(): void {
        this.group.visible(true);
        // this.group.getLayer?.draw();
        /* Update door animation */
        if(this.isDoorOpen) {
        	this.door.animDoorOpen();
        } else {
        	this.door.animDoorClose();
        }        
    }
    
    hide(): void {
        this.group.visible(false);
        // this.group.getLayer?.draw();
    }

    pushToScreen(prevView: SubView): void {
        this.parentView = prevView;
        this.parentView.hide();
        this.show();
    }

    popFromScreen(): void {
        if(this.parentView == null) {
            return;
        }
        this.hide();
        this.parentView.show();
    }
}

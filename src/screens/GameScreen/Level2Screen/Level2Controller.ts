import Konva from "konva";

import { ScreenController } from "../../../types.ts";
import type { ScreenSwitcher } from "../../../types.ts";
import { PlayerDataManager } from "../../../managers/GameStateManager.ts";
import { Level2View } from "./Level2View.ts"
import { Level2Model } from "./Level2Model.ts"
import { RoomView } from "./views/RoomView.ts"
import { SundialView } from "./views/SundialView.ts"


export class Level2Controller extends ScreenController {
    private screenSwitcher: ScreenSwitcher;
    private model:  	Level2Model;
    
    /* Views */
    private levelView:  Level2View;
    private roomView:   RoomView;
    private sundial1View:   SundialView;
    private sundial2View:   SundialView;
    private sundial3View:   SundialView;
    
    constructor(screenSwitcher: ScreenSwitcher) {
        super();
        this.screenSwitcher = screenSwitcher;
        if(this.screenSwitcher) {/* NOP to shut TSC up */}

		this.model = new Level2Model(screenSwitcher.getPlayerDataManager());
        this.levelView = new Level2View();
        this.roomView = new RoomView();
        this.sundial1View = new SundialView("sundial1");
        this.sundial2View = new SundialView("sundial2");
        this.sundial3View = new SundialView("sundial3");
        this.levelView.getGroup().add(this.roomView.getGroup());
        this.levelView.getGroup().add(this.sundial1View.getGroup());
        this.levelView.getGroup().add(this.sundial2View.getGroup());
        this.levelView.getGroup().add(this.sundial3View.getGroup());

        this.levelView.getGroup().listening(true);
        this.levelView.getGroup().on("click", 
        	(evt) => this.commonElementEventHandler(evt));

        /* HACK: Check clue position for dragging into inventory */
        const clue = this.roomView.getClue();
        clue.getElement().on("dragend", () => this.clueDragHandler());    
        const gem = this.roomView.getGem();
        gem.getElement().on("dragend", () => this.gemDragHandler());  

        this.roomView.getGem().disable(); 
        this.roomView.show();
    }

    getView(): Level2View {
        /* HACK: Ensure that coin display is updated when ScreenSwitcher
         * selects level 2 */
        const coinDisplay = this.roomView.getCoinDisplay();
     	coinDisplay.updateDisplayCoins(this.model.getCoins());

     	this.roomView.setSundialHeight(1, this.model.getSundialHeight(1));
     	this.roomView.setSundialHeight(2, this.model.getSundialHeight(2));
     	this.roomView.setSundialHeight(3, this.model.getSundialHeight(3));
     	this.sundial1View.updateSundialShadow();
     	this.sundial2View.updateSundialShadow();
     	this.sundial3View.updateSundialShadow();

        return this.levelView;
    }

    clueDragHandler(): void {
        const clue = this.roomView.getClue();
        const clueXPos = clue.getElement().x();
        const clueYPos = clue.getElement().y();
        if( (clueXPos <= 64) && (clueYPos <= 64) ) {
            /* Place clue in inventory */
            clue.getElement().visible(false);
            this.model.addToInventory(clue.getInventoryItem(
                this.model.getSundialTargetTheta(1),
                this.model.getSundialTargetTheta(2),
                this.model.getSundialTargetTheta(3)
            ));
        }
    }

    gemDragHandler(): void {
        const gem = this.roomView.getGem();
        const xPos = gem.getElement().x();
        const yPos = gem.getElement().y();
        if( (xPos <= 64) && (yPos <= 64) ) {
            /* Place clue in inventory */
            gem.getElement().visible(false);
            this.model.addToInventory(gem.getInventoryItem());
        }
    }

    /* This is the *one* event handler that is passed to all elements, it can
     * differentiate elements based on their element IDs that are assigned in
     * the constructor. NOTE: This doesnt handle return arrows, that logic
     * is predefined in the ReturnArrow element and (sort of) implemented in
     * each subview, sue me if you don't like it. */
    commonElementEventHandler(evt: any): void {
        const target = evt.target;

        /* Fixes issue with Group/Shape ID incompatibility */
        let id = target.id();
        if(id == "") {
        	id = target.findAncestor("Group", true).id();
        }
		/* For sundial input handling */
		let measureTray = null;
		let inputVal = -1;
        /* Conditional based on object ID */
        switch(id) {
            case "sundial1":
                this.sundial1View.pushToScreen(this.roomView);
                break;
            case "sundial2":
                this.sundial2View.pushToScreen(this.roomView);
                break;
            case "sundial3":
                this.sundial3View.pushToScreen(this.roomView);
                break;
            case "sundial1_input":
                this.sundial1View.updateSundialShadow();
                measureTray = this.sundial1View.getMeasureElement();
				inputVal 	= this.sundial1View.getInputElement().getValue();
				this.model.updateSundialHeight(1, inputVal);
				measureTray.setA(this.model.getSundialHeight(1));				
				measureTray.setB(this.model.defaultSundialWidth());
				measureTray.setC(this.model.getSundialHypotenuse(1));				
				measureTray.setT(this.model.getSundialTheta(1));			
				break;	
            case "sundial2_input":
                this.sundial2View.updateSundialShadow();
                measureTray = this.sundial2View.getMeasureElement();
				inputVal 	= this.sundial2View.getInputElement().getValue();
				this.model.updateSundialHeight(2, inputVal);
				measureTray.setA(this.model.getSundialHeight(2));				
				measureTray.setB(this.model.defaultSundialWidth());
				measureTray.setC(this.model.getSundialHypotenuse(2));				
				measureTray.setT(this.model.getSundialTheta(2));			
				break;	
            case "sundial3_input":
                this.sundial3View.updateSundialShadow();
                measureTray = this.sundial3View.getMeasureElement();
				inputVal 	= this.sundial3View.getInputElement().getValue();
				this.model.updateSundialHeight(3, inputVal);
				measureTray.setA(this.model.getSundialHeight(3));				
				measureTray.setB(this.model.defaultSundialWidth());
				measureTray.setC(this.model.getSundialHypotenuse(3));				
				measureTray.setT(this.model.getSundialTheta(3));			
				break;	
			case "exitDoor":
				if(this.model.isSolved()) {
					if(this.roomView.getDoorState()) {
						this.screenSwitcher.switchToScreen({type: "level3"});
					} 
				} else {
					this.levelView.triggerAlert("This door is locked!");
				}
				break;
		    /* Defined in views/RoomView.ts */
			case "Level2_InventoryTrigger":
		        this.screenSwitcher.switchToScreen({type: "inventory"});    
			    break;
			 case "Level2_MinigameTrigger":
			    this.screenSwitcher.switchToScreen({type: "minigame"});
			    break;
			
        }
        /* Convenient place to check if the level is solved, since it will occur 
         *after every user interaction. Unoptimized but neat. */
        if(this.model.checkSolution()) {
            this.roomView.setDoorState(true);
            this.levelView.triggerAlert("The gate has opened!");
            this.roomView.getGem().enable(); 
            this.model.awardCoins();
        }
        /* Similar to above, update coin display at any click */
        const coinDisplay = this.roomView.getCoinDisplay();
     	coinDisplay.updateDisplayCoins(this.model.getCoins());
     	/* Update tiny sundials */
     	this.roomView.setSundialHeight(1, this.model.getSundialHeight(1));
     	this.roomView.setSundialHeight(2, this.model.getSundialHeight(2));
     	this.roomView.setSundialHeight(3, this.model.getSundialHeight(3));
    }
}

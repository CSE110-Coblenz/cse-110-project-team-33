/* File: Level2Model.ts
 * Author: Connor Larmer
 *
 * Summary: Holds information about level state, generates puzzle solutions,
 * checks solutions, etc.
 *
 */
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../../constants.ts";
import { PlayerDataManager } from "../../../managers/GameStateManager.ts";
import type {  InventoryItem } from "../../../types.ts";

export class Level2Model {

	private isComplete: boolean;
	private sundial1TargetHeight: number;	
	private sundial2TargetHeight: number;	
	private sundial3TargetHeight: number;	

 	private sundial1TargetTheta: number;
 	private sundial2TargetTheta: number;
 	private sundial3TargetTheta: number;

	private sundial1CurrentHeight: number;
	private sundial2CurrentHeight: number;
	private sundial3CurrentHeight: number;

	private sundial1CurrentTheta: number;
	private sundial2CurrentTheta: number;
	private sundial3CurrentTheta: number;

 	private sundial1Hypotenuse: number;
 	private sundial2Hypotenuse: number;
 	private sundial3Hypotenuse: number;

    private playerData: PlayerDataManager;

    private coinsAwarded: boolean;

	/* Constants */
	defaultSundialWidth()	{ return 12; }
	maxSundialHeight() 		{ return 4.2; }
	epsilon() 				{ return 0.001; }
	defaultCoinAward() 	    { return 100; }
	
 	constructor(playerData: PlayerDataManager) {
		this.resetLevel();
		this.playerData = playerData;
 	}

 	resetLevel() {
 		this.generateStartingHeights();
 		this.generateTargetHeights();
 		this.isComplete = false;
 		this.updateSundialCalcs();
	    this.coinsAwarded = false;
 	}

	generateStartingHeights() {
		function getRandomInRange(max) {
			let val = Math.random() * max;
			// Limit to 2 decimal places
			val = Math.floor(val * 100)/100;
			return val;
		}
		this.sundial1CurrentHeight = 0;
		this.sundial2CurrentHeight = 0;
		this.sundial3CurrentHeight = 0;
	}

	generateTargetHeights() {
		function getRandomInRange(max) {
			let val = Math.random() * max;
			// Limit to 2 decimal places
			val = Math.floor(val * 100)/100;
			return val;
		}
		this.sundial1TargetHeight = getRandomInRange(this.maxSundialHeight());
		this.sundial2TargetHeight = getRandomInRange(this.maxSundialHeight());
		this.sundial3TargetHeight = getRandomInRange(this.maxSundialHeight());
		console.log((this.sundial1TargetHeight));
		console.log((this.sundial2TargetHeight));
		console.log((this.sundial3TargetHeight));
		console.log(this.getSundialTargetTheta(1).toFixed(2));
		console.log(this.getSundialTargetTheta(2).toFixed(2));
		console.log(this.getSundialTargetTheta(3).toFixed(2));
	}

	isSolved() {
		return this.isComplete;
	}

	checkSolution() {

		let isCorrect = true;

		function equalsEpsilon(a: number, b: number, e: number) {
			return (Math.abs(a - b) < e);
		}

		isCorrect &= equalsEpsilon(
			this.getSundialTheta(1), 
			this.getSundialTargetTheta(1), 
			this.epsilon()
		);
		isCorrect &= equalsEpsilon(
			this.getSundialTheta(2), 
			this.getSundialTargetTheta(2), 
			this.epsilon()
		);
		isCorrect &= equalsEpsilon(
			this.getSundialTheta(3), 
			this.getSundialTargetTheta(3), 
			this.epsilon()
		);

		/* Trigger only on rising edge */
		if(isCorrect) {
			if(!this.isComplete) {
				this.isComplete = true;
				return true;
			}
		}
		return false;
	}

    awardCoins() {
        /* Ensure coins are awarded only once per level reset */
        if(this.coinsAwarded == false && this.isComplete == true) {
            this.coinsAwarded = true;
            this.playerData.setCoins(
                this.playerData.getCoins() + this.defaultCoinAward()
            );
        }
    }

    addToInventory(inventoryItem: InventoryItem): void {
        let inv = this.playerData.getInventory();
        inv.push(inventoryItem);
        this.playerData.setInventory(inv);
        console.log(this.playerData.getInventory());
    }

    getCoins() {
        return this.playerData.getCoins();
    }

	getSundialTargetTheta(dial: number) {
		const conv = (180 / Math.PI);
		switch(dial) {
			case 1: return Math.atan(
				this.sundial1TargetHeight / this.defaultSundialWidth()
			) * conv;
			case 2: return Math.atan(
				this.sundial2TargetHeight / this.defaultSundialWidth()
			) * conv;
			case 3: return Math.atan(
				this.sundial3TargetHeight / this.defaultSundialWidth()
			) * conv;	
			default: return -1;		
		}
	}

	/* Perform a bunch of calcs */
 	updateSundialCalcs() {
 		this.sundial1Hypotenuse = Math.sqrt(
 			Math.pow(this.sundial1CurrentHeight, 2) +
 			Math.pow(this.defaultSundialWidth(), 2)
 		);
 		this.sundial2Hypotenuse = Math.sqrt(
 			Math.pow(this.sundial2CurrentHeight, 2) +
 			Math.pow(this.defaultSundialWidth(), 2)
 		);
  		this.sundial3Hypotenuse = Math.sqrt(
 			Math.pow(this.sundial3CurrentHeight, 2) +
 			Math.pow(this.defaultSundialWidth(), 2)
 		);

 		this.sundial1CurrentTheta = Math.atan(
 			this.sundial1CurrentHeight /
 			this.defaultSundialWidth()
 		) * (180 / Math.PI);
 		this.sundial2CurrentTheta = Math.atan(
 			this.sundial2CurrentHeight /
 			this.defaultSundialWidth()
 		) * (180 / Math.PI);
 		this.sundial3CurrentTheta = Math.atan(
 			this.sundial3CurrentHeight /
 			this.defaultSundialWidth()
 		) * (180 / Math.PI);
 	}

 	getSundialTheta(dial: number) {
 		switch(dial) {
 			case 1:		return this.sundial1CurrentTheta;
 			case 2:		return this.sundial2CurrentTheta;
 			case 3:		return this.sundial3CurrentTheta;
 			default: 	return -1;
 		}
 	}

 	getSundialHeight(dial: number) {
 		switch(dial) {
 			case 1:		return this.sundial1CurrentHeight;
 			case 2:		return this.sundial2CurrentHeight;
 			case 3:		return this.sundial3CurrentHeight;
 			default: 	return -1;
 		}
 	}

 	getSundialHypotenuse(dial: number) {
 		switch(dial) {
 			case 1:		return this.sundial1Hypotenuse;
 			case 2:		return this.sundial2Hypotenuse;
 			case 3:		return this.sundial3Hypotenuse;
 			default: 	return -1;
 		}
 	}

 	updateSundialHeight(dial: number, height: number) {
 		switch(dial) {
 			case 1:
 				this.sundial1CurrentHeight = height;
 				break;
 			case 2:
 				this.sundial2CurrentHeight = height;
 				break;
 			case 3:
 				this.sundial3CurrentHeight = height;
 				break;
 		}
 		this.updateSundialCalcs();
 		return;
 	}
}


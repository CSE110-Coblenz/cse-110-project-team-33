// import statements
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../../constants";
import type { InventoryItem } from "../../../types";
import { PlayerDataManager } from "../../../GameStateManager";
import { Level3PuzzleView } from "./Views/Level3PuzzleView";

export class Level3Model {
    // flag to denote if the level was successfully completed
    private isSuccessful: boolean = false;

    // all player data related elements
    private playerDataManager: PlayerDataManager;
    private inventory: InventoryItem[];
    private coins: number | null;

    // puzzle view -> to handle checking the correct answer
    //private puzzle: Level3PuzzleView;

    constructor(playerDataManager: PlayerDataManager){
        // puzzle view
        //this.puzzle = new Level3PuzzleView();

        // initialization of player data when opening level
        this.playerDataManager = playerDataManager;
        this.playerDataManager.setLevel({type: "level3"});
        this.inventory = [];

        // get values
        if(playerDataManager.getCoins() != null){
            this.coins = playerDataManager.getCoins();
        }
        else{
            this.coins = 0;
        }
        this.isSuccessful = false; // change to false for testing
    }
    
    // get coins
    getCoins(): number {
        if(this.coins != null){
            return this.coins;
        }
        return 0;
    }

    // set (add to) coins
    addCoins(added: number) {
        if(this.coins != null){
            this.playerDataManager.setCoins(this.coins + added);
        }
    }

    // set the flag to this puzzle as correct
    setIsSuccessful(isCorrect: boolean): void {
        this.isSuccessful = isCorrect;
    }

    // returns the status of whether the puzzle is successful or not
    getSuccessful(): boolean {
        return this.isSuccessful;
    }
}
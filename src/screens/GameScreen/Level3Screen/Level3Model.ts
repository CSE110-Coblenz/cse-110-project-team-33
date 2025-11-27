// import statements
import type { InventoryItem } from "../../../types";
import { PlayerDataManager } from "../../../GameStateManager";

export class Level3Model {
    // flag to denote if the level was successfully completed
    private isSuccessful: boolean = false;

    // all player data related elements
    private playerDataManager: PlayerDataManager;
    private inventory: InventoryItem[];
    private coins: number | null;

    constructor(playerDataManager: PlayerDataManager){
        // initialization of player data when opening level
        this.playerDataManager = playerDataManager; 
        this.playerDataManager.setLevel({type: "level3"});
        this.inventory = this.playerDataManager.getInventory();

        // get values
        if(playerDataManager.getCoins() != null){
            this.coins = playerDataManager.getCoins();
        }
        else{
            this.coins = 0;
        }
        this.isSuccessful = false; // change to false for testing
    }
    
    // ** inventory related functions ** //
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

    // add something into the inventory
    addToInventory(inventoryItem: InventoryItem): void {
        this.inventory.push(inventoryItem);
        console.log(this.inventory);
        this.playerDataManager.setInventory(this.inventory);
        console.log(this.playerDataManager.getInventory());
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
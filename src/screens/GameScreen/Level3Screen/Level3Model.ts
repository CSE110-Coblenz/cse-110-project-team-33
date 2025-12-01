// import statements
import type { InventoryItem } from "../../../types";
import { PlayerDataManager } from "../../../managers/GameStateManager";

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

        // ** get player data
        // inventory
        this.inventory = this.playerDataManager.getInventory();
        // coins
        if(playerDataManager.getCoins() != null){
            this.coins = this.playerDataManager.getCoins();
        }
        else{
            this.coins = -1;
        }

        // assume puzzle not solved initially
        this.isSuccessful = false;
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
            this.playerDataManager.setCoins(150);
        }
    }

    // get inventory
    getInventory(): InventoryItem[] {
        return this.playerDataManager.getInventory();
    }

    // add something into the inventory
    addToInventory(inventoryItem: InventoryItem): void {
        // before pushing item
        console.log("before push -- \n this.inventory: " + this.inventory);
        console.log("this.playerDataManager.getInventory(): " + this.playerDataManager.getInventory() + "\n");

        this.inventory.push(inventoryItem);
        console.log("after push -- \n this.inventory: " + this.inventory + "\n");

        // console.log("this.inventory: " + this.inventory);
        this.playerDataManager.setInventory(this.inventory);

        console.log("after push -- \n this.playerDataManager.getInventory(): " + this.playerDataManager.getInventory() + "\n");
        // console.log(this.playerDataManager.getInventory());
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
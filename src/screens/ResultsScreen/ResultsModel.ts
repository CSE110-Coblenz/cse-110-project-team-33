// import statements
import Konva from "konva";

// import player data
import { PlayerDataManager } from "../../GameStateManager";
import type { InventoryItem } from "../../types";

export class ResultsModel {
    // player data
    private playerData: PlayerDataManager;
    private inventory: InventoryItem[];
    private coins: number | null;

    constructor(playerDataManager: PlayerDataManager) {
        this.playerData = playerDataManager;
        this.inventory = this.playerData.getInventory();

        // check coins
        if(this.playerData.getCoins() != null){
            this.coins = this.playerData.getCoins();
        } else {
            this.coins = -1; // to test if successful
        }
    }

    // inventory related functions
    getInventory(): InventoryItem[] {
        return this.inventory;
    }

    addToInventory(toAdd: InventoryItem): void {
        this.inventory.push(toAdd);
        console.log(this.inventory); // display check
        this.playerData.setInventory(this.inventory);
        console.log(this.playerData.getInventory());
    }

    getCoins(): number | null {
        return this.coins;
    }

    setCoins(): void {
        this.playerData.setCoins(700);
    }
}
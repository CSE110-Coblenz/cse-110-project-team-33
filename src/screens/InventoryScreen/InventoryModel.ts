import { LocalStorageManager } from "../../GameStateManager.ts";
import { PlayerManager } from "../../GameStateManager.ts";

export class InventoryModel {
    private localStorageManager: LocalStorageManager;
    private playerManager: PlayerManager;
    
    private playerId: string | null;
    private inventory: string[];

    constructor() {
        this.localStorageManager = new LocalStorageManager();
        this.playerManager = new PlayerManager();
        
        this.playerId = this.playerManager.getCurrentPlayerId();

        if (this.playerId !== null) {
            this.inventory = this.localStorageManager.loadPlayerInventory(this.playerId);
        } else {
            this.inventory = [];
        }
    }

    public getInventory(): string[] {
        return this.inventory;
    }
}
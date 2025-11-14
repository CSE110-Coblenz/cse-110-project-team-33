import { PlayerDataManager } from "../../GameStateManager.ts";

export class InventoryModel {
    private playerManager: PlayerDataManager;
    private inventory: string[];

    constructor() {
        this.playerManager = new PlayerDataManager();

        this.inventory = this.playerManager.loadPlayerInventory();
    }

    public getInventory(): string[] {
        return this.inventory;
    }
}
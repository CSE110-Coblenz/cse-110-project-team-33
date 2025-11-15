import { PlayerDataManager } from "../../GameStateManager.ts";
import { InventoryItem } from "../../types.ts";

export class InventoryModel {
    private playerManager: PlayerDataManager;
    private inventory: InventoryItem[];
    private currentIndex: number;

    constructor() {
        this.playerManager = new PlayerDataManager();
        this.inventory = [];
        this.playerManager.loadPlayerInventory();
        this.currentIndex = 0;
    }

    public getInventory(): InventoryItem[] {
        return this.inventory;
    }

    public getCurrentIndex(): number {
        return this.currentIndex;
    }

    public setCurrentIndex(currentIndex: number) {
        this.currentIndex = currentIndex;
    }
}
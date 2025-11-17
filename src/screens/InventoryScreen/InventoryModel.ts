import { PlayerDataManager } from "../../GameStateManager.ts";
import { InventoryItem } from "../../types.ts";
import type { Screen } from "../../types.ts";

export class InventoryModel {
    private playerManager: PlayerDataManager;
    private inventory: InventoryItem[];
    private currentIndex: number;
    private level: Screen | null;

    constructor() {
        this.playerManager = new PlayerDataManager();
        this.inventory = [];
        this.playerManager.getInventory(); // ADD TO INVENTORY
        this.currentIndex = 0;
        this.level = this.playerManager.getLevel(); // { type : "level1"}; // your current level (!!)
    }

    public getLevel(): Screen | null {
        return this.level;
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
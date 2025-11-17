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
        this.inventory = [new InventoryItem("crystal", "crystal.png", 150, 150), new InventoryItem("door", "door.png", 150, 150)];
        // this.playerManager.getInventory();
        this.currentIndex = 0;
        this.level =  { type : "level1"}; // this.playerManager.getLevel();
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
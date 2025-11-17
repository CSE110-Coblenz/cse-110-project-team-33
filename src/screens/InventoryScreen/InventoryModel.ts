import { PlayerDataManager } from "../../GameStateManager.ts";
import { InventoryItem } from "../../types.ts";

export class InventoryModel {
    private playerManager: PlayerDataManager;
    private inventory: InventoryItem[];
    private currentIndex: number;

    constructor() {
        this.playerManager = new PlayerDataManager();
        this.inventory = [new InventoryItem("crystal", "crystal.png", 150, 150), new InventoryItem("door", "door.png", 150, 150)];
        // this.playerManager.loadInventory();
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
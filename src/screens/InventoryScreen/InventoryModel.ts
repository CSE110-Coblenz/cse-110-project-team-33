import { PlayerDataManager } from "../../managers/GameStateManager.ts";
import type { InventoryItem } from "../../types.ts";
import type { Screen } from "../../types.ts";

export class InventoryModel {
    private playerDataManager: PlayerDataManager;
    private currentIndex: number;

    constructor(playerDataManager: PlayerDataManager) {
        this.playerDataManager = playerDataManager;
        this.currentIndex = 0;
    }

    public getLevel(): Screen | null {
        return this.playerDataManager.getLevel();
    }

    public getInventory(): InventoryItem[] {
        return this.playerDataManager.getInventory();
    }

    public getCurrentIndex(): number {
        return this.currentIndex;
    }

    public setCurrentIndex(currentIndex: number): void {
        this.currentIndex = currentIndex;
    }

    public nextItem(): void {
        const inventory = this.getInventory();
        if (inventory.length > 0 && this.currentIndex < inventory.length - 1) {
            this.currentIndex++;
        }
    }

    public previousItem(): void {
        if (this.currentIndex > 0) {
            this.currentIndex--;
        }
    }

    public canGoNext(): boolean {
        const inventory = this.getInventory();
        return this.currentIndex < inventory.length - 1;
    }

    public canGoPrevious(): boolean {
        return this.currentIndex > 0;
    }
}
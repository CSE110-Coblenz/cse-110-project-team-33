import { TrigUtil } from "../../../utilities/TrigUtil";
import type {  InventoryItem } from "../../../types.ts";
import { PlayerDataManager } from "../../../managers/GameStateManager.ts";

export class Level1Model {
    // Player Data
    private playerDataManager: PlayerDataManager;
    private inventory: InventoryItem[];
    private coins: number | null;

    // Trig
    private trig: TrigUtil = new TrigUtil;

    private problemType: number = Math.floor((Math.random() * 3) + 1);

    private angle: number = this.trig.randomAngle();
    private opposite: number = this.trig.randomOpposite();
    private adjacent: number = this.trig.randomAdjacent();
    private hypotenuse: number = this.trig.randomHypotenuse();

    private SOH: number = this.trig.SOH(this.angle, this.opposite) // Finds hyp
    private CAH: number = this.trig.CAH(this.angle, this.adjacent) // Finds hyp
    private TOA: number = this.trig.TOA(this.angle, this.opposite) // Finds adj
    
    // Success
    private success: boolean;

    constructor(playerDataManager: PlayerDataManager) {
        // Player Data
        this.playerDataManager = playerDataManager;
        // this.inventory = this.playerDataManager.getInventory();
        this.inventory = [];
        this.playerDataManager.clearInventory();

        if (playerDataManager.getCoins() != null) {
            // playerDataManager.setCoins(0);
            this.coins = playerDataManager.getCoins();
        } else {
            this.coins = -1;
        }

        // Success
        this.success = false;
    }

    // Player Data
    getInventory(): InventoryItem[] {
        return this.inventory;
    }

    addToInventory(inventoryItem: InventoryItem): void {
        this.inventory.push(inventoryItem);
        this.playerDataManager.setInventory(this.inventory);
        console.log(this.playerDataManager.getInventory());
    }

    getCoins(): number {
        if (this.coins != null) {
            return this.coins;
        }
        return 0;
    }

    addToCoins(addedCoins: number) {
        if (this.coins != null) {
            this.playerDataManager.setCoins(this.coins + addedCoins);
        }
        if (this.coins != null) {
            this.coins += addedCoins;
        }
    }

    // Trig
    getProblemType(): number {
        return this.problemType;
    }

    getAngle(): number {
        return this.angle;
    }

    getOpposite(): number {
        return this.opposite;
    }

    getAdjacent(): number {
        return this.adjacent;
    }

    getHypotenuse(): number {
        return this.hypotenuse;
    }

    getSOH(): number {
        return this.SOH;
    }

    getCAH(): number {
        return this.CAH;
    }

    getTOA(): number {
        return this.TOA;
    }

    getAnswer(): number {
        if (this.problemType == 1) {
            return this.SOH;
        } else if (this.problemType == 2) {
            return this.CAH;
        } else if (this.problemType == 3) {
            return this.TOA;
        }
        return -1;
    }

    // Success
    setSuccess(success: boolean): void {
        this.success = success;
    }

    getSuccess(): boolean {
        return this.success;
    }
}
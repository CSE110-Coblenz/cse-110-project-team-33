import { TrigUtil } from "../../../TrigUtil";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../../constants.ts";
import type {  InventoryItem } from "../../../types.ts";
import { PlayerDataManager } from "../../../GameStateManager.ts";

export class Level1Model {
    private isCompleted: boolean = false;

    private trig: TrigUtil = new TrigUtil;

    private opposite: number = this.trig.randomOpposite();
    private adjacent: number = this.trig.randomAdjacent();
    private hypotenuse: number = this.trig.randomHypotenuse();
    private angle: number = this.trig.randomAngle();

    private problemType : number = Math.floor((Math.random() * 3) + 1);

    private SOH: number = this.trig.SOH(this.angle, this.opposite) // find hyp
    private CAH: number = this.trig.CAH(this.angle, this.adjacent) // finds hyp
    private TOA: number = this.trig.TOA(this.angle, this.opposite) // finds adj

    private playerDataManager: PlayerDataManager;
    private inventory: InventoryItem[];

    constructor(playerDataManager: PlayerDataManager) {
        this.playerDataManager = playerDataManager;
        this.playerDataManager.setLevel({type : "level1"});
        this.inventory = [];
        this.playerDataManager.clearInventory();
    }

    getInventory(): InventoryItem[] {
        return this.inventory;
    }

    addToInventory(inventoryItem: InventoryItem): void {
        this.inventory.push(inventoryItem);
        console.log(this.inventory);
        this.playerDataManager.setInventory(this.inventory);
        console.log(this.playerDataManager.getInventory());
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

    getAngle(): number {
        return this.angle;
    }

    getProblemType(): number {
        return this.problemType;
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

    getSOH(): number {
        return this.SOH;
    }

    getCAH(): number {
        return this.CAH;
    }

    getTOA(): number {
        return this.TOA;
    }

    setIsCompleted(isCompleted: boolean): void {
        this.isCompleted = isCompleted;
    }

    getIsCompleted(): boolean {
        return this.isCompleted;
    }
}
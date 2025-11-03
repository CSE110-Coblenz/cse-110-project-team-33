import { MainView } from "./Views/MainView.ts"
import { SundialView } from "./Views/SundialView.ts"
import { InventoryView } from "./Views/InventoryView.ts"

/* Level 2 demo model */
export class Level2Model {

    public sundial1State: SundialModel;
    public sundial2State: SundialModel;
    public sundial3State: SundialModel;
    private doorLocked: boolean = true;

    private currentLevelView: null | MainView | SundialView | InventoryView;

    resetLevel(): void {

        this.sundial1State = new SundialModel(0,1);
        this.sundial2State = new SundialModel(0,1);
        this.sundial3State = new SundialModel(0,1);
        
        this.doorLocked = true;
        this.currentLevelView = null;

    }

    getDoorState(): boolean {
        return this.doorLocked;
    }

}

class SundialModel {
    private currentHeight: number;
    private targetHeight: number;

    constructor(currentHeight: number, targetHeight: number): void {
        this.currentHeight = currentHeight;
        this.targetHeight = targetHeight;
    }

    getCurrentHeight(): number {
        return this.currentHeight;
    }

    setCurrentHeight(height: number): void {
        // We clamp between -1 and 1
        this.currentHeight = Math.min(Math.max(-1, height), 1);
    }

    onTarget(): boolean {
        if(this.currentHeight == this.targetHeight) {
            return true;
        }
        return false;
    }
}

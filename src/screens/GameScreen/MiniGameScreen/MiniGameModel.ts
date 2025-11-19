import { STAGE_HEIGHT, STAGE_WIDTH } from "../../../constants";

export interface Target {
    label: string;
    angle: number; // degrees
}

export interface ItemState {
    label: string;
    placed: boolean;
    angle: number;
}

export class MiniGameModel {
    radius = 150;
    centerX = 0;
    centerY = 0;

    targets: Target[] = [];
    items: ItemState[] = [];

    initTargets(targets: Target[]) {
        this.targets = targets;
        this.items = targets.map(t => ({
            label: t.label,
            angle: t.angle,
            placed: false
        }));
    }

    setCenter(x: number, y: number) {
        this.centerX = x;
        this.centerY = y;
    }

    getPosition(angleDeg: number, radius?: number) {
        const r = (radius ?? this.radius) + 20;
        const rad = (angleDeg * Math.PI) / 180;
        return {
            x: this.centerX + r * Math.cos(rad),
            y: this.centerY - r * Math.sin(rad) 
        };
    }

    checkPlacement(x: number, y: number, label: string, tolerance = 25): boolean {
        const item = this.items.find(i => i.label === label);
        if (!item) return false;
        const expected = this.getPosition(item.angle);
        const dx = x - expected.x;
        const dy = y - expected.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        return dist <= tolerance;
    }

    markPlaced(label: string) {
        const item = this.items.find(i => i.label === label);
        if (item) item.placed = true;
    }

    checkWin(): boolean {
        return this.items.every(i => i.placed);
    }

    getTargets(): Target[] {
        return this.targets;
    }
}

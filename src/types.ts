import type { Group } from "konva/lib/Group";

export interface View {
	getGroup(): Group;
	show(): void;
	hide(): void;
}

export type Screen =
	| { type: "menu" }
	| { type: "settings"}
	| { type: "inventory"}
	| { type: "level1" }
    | { type: "level2" }
    | { type: "level3" }
    | { type: "level4" }
	| { type: "result"}
	| { type: "exit"}
	| { type: "load"};

export abstract class ScreenController {
	abstract getView(): View;

	show(): void {
		this.getView().show();
	}

	hide(): void {
		this.getView().hide();
	}
}

export interface ScreenSwitcher {
	switchToScreen(screen: Screen): void;
}

export class InventoryItem {
    private name: string;
    private image: string;
    private width: number;
    private height: number;
    private text1?: string;
    private text2?: string;
    private text3?: string;
    private text1X?: number;
    private text1Y?: number;
    private text2X?: number;
    private text2Y?: number;
    private text3X?: number;
    private text3Y?: number;

    constructor(
        name: string, 
        image: string, 
        width: number, 
        height: number,
        text1?: string,
		text1X?: number, 
        text1Y?: number,
        text2?: string,
		text2X?: number, 
        text2Y?: number,
        text3?: string,
        text3X?: number, 
        text3Y?: number
    ) {
        this.name = name;
        this.image = image;
        this.width = width;
        this.height = height;
        this.text1 = text1;
		this.text1X = text1X;
        this.text1Y = text1Y;
        this.text2 = text2;
		this.text2X = text2X;
        this.text2Y = text2Y;
        this.text3 = text3;
        this.text3X = text3X;
        this.text3Y = text3Y;
    }

    public getName(): string {
        return this.name;
    }

    public getImage(): string {
        return this.image;
    }

    public getWidth(): number {
        return this.width;
    }

    public getHeight(): number {
        return this.height;
    }

    public getText1(): string | undefined {
        return this.text1;
    }

	public getText1X(): number | undefined {
        return this.text1X;
    }

    public getText1Y(): number | undefined {
        return this.text1Y;
    }

    public getText2(): string | undefined {
        return this.text2;
    }

	public getText2X(): number | undefined {
        return this.text2X;
    }

    public getText2Y(): number | undefined {
        return this.text2Y;
    }

    public getText3(): string | undefined {
        return this.text3;
	}

    public getText3X(): number | undefined {
        return this.text3X;
    }

    public getText3Y(): number | undefined {
        return this.text3Y;
    }
}

export interface PlayerData {
	level: Screen;
	coins: number;
	inventory: InventoryItem[];
}

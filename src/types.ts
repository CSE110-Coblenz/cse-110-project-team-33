import type { Group } from "konva/lib/Group";
import Konva from "konva";

export interface View {
	getGroup(): Group;
	show(): void;
	hide(): void;
}

export type Screen =
	| { type: "menu" }
	| { type: "settings"}
	| { type: "intro" }
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
    getStage(): Konva.Stage;
}

export interface InventoryItem {
    name: string;
    image: string;
    width: number;
    height: number;
    text1?: string;
    text2?: string;
    text3?: string;
    text1X?: number;
    text1Y?: number;
    text2X?: number;
    text2Y?: number;
    text3X?: number;
    text3Y?: number;
}

export interface PlayerData {
	level: Screen;
	coins: number;
	inventory: InventoryItem[];
}

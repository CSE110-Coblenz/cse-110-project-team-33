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

export interface PlayerData {
	id: string;
	name: string;
	level: number;
	coins: number;
	inventory: string[];
}

export type PlayersData = PlayerData[];

// import statements
import Konva from "konva";
import { Level3View } from "./Level3View.ts";
import { ScreenController } from "../../../types.ts";
import type { ScreenSwitcher } from "../../../types.ts";

export class Level3Model {
    // a flag to denote that Level 3 was successfully completed
	private completed = 0;

	/**
	 * Get current score
	 */
	checkSuccess(): number {
		return this.completed;
	}

	setSuccess(): void{
		this.completed = 1;
	}
}

/**
 * inventory class:
 * crystals
 * stars
 * player data
 * "level progression"
 * etc (if we forget anything)
 */
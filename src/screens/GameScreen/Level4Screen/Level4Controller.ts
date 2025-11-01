import { Level4Model } from "./Level4Model.ts";
import { Level4View } from "./Level4View.ts";
import { ScreenController } from "../../../types.ts";
import type { ScreenSwitcher } from "../../../types.ts";

export class Level4Controller extends ScreenController {
    private screenSwitcher: ScreenSwitcher;
    private model: Level4Model;
	private view: Level4View;

    constructor(screenSwitcher: ScreenSwitcher) {
        super();
        this.screenSwitcher = screenSwitcher;

		this.model = new Level4Model();
		this.view = new Level4View();
	}

    /**
	 * Get the view group
	 */
	getView(): Level4View {
		return this.view;
	}
}
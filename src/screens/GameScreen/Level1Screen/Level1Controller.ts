import { Level1Model } from "./Level1Model.ts";
import { Level1View } from "./Level1View.ts";
import { ScreenController } from "../../../types.ts";
import type { ScreenSwitcher } from "../../../types.ts";

export class Level1Controller extends ScreenController {
    private screenSwitcher: ScreenSwitcher;
    private model: Level1Model;
	private view: Level1View;

    constructor(screenSwitcher: ScreenSwitcher) {
        super();
        this.screenSwitcher = screenSwitcher;

		this.model = new Level1Model();
		this.view = new Level1View();
	}

    /**
	 * Get the view group
	 */
	getView(): Level1View {
		return this.view;
	}
}

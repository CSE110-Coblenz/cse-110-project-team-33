import { Level3Model } from "./Level3Model.ts";
import { Level3View } from "./Level3View.ts";
import { ScreenController } from "../../../types.ts";
import type { ScreenSwitcher } from "../../../types.ts";

export class Level3Controller extends ScreenController {
    private screenSwitcher: ScreenSwitcher;
    private model: Level3Model;
    private view: Level3View;

    constructor(screenSwitcher: ScreenSwitcher) {
        super();
        this.screenSwitcher = screenSwitcher;

        this.model = new Level3Model();
        //this.view = new Level3View();

        this.view = new Level3View(() => this.handleClick());
    }

    /**
	 * Handle start button click
	 */
	private handleClick(): void {
		this.screenSwitcher.switchToScreen({ type: "level1" }); // CHANGE THIS TO YOUR LEVEL
	}

    /**
     * Get the view group
     */
    getView(): Level3View {
        return this.view;
    }
}
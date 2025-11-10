import { Level3Model } from "./Level3Model.ts";
import { Level3View } from "./Level3View.ts";
import { ScreenController } from "../../../types.ts";
import type { ScreenSwitcher } from "../../../types.ts";
import Konva from "konva";

export class Level3Controller extends ScreenController {
    private screenSwitcher: ScreenSwitcher;
    private model: Level3Model;
    private view: Level3View;
    //private problemType: number;
    //private correctAnswerValue: number; // Store the actual answer

    // constructor
    constructor(screenSwitcher: ScreenSwitcher) {
        super();

        // initialize all elements
        this.screenSwitcher = screenSwitcher;
        this.model = new Level3Model();
        this.view = new Level3View();
        
        this.view.show(); 
    }

    // get the view group
    getView(): Level3View {
        return this.view;
    }
}
import Konva from "konva";
import { Level3Model } from "./Level3Model.ts";
// import all the views
import { Level3View } from "./Level3View.ts";
import { Room3View } from "./Views/Room3View.ts";
import { Level3PuzzleView } from "./Views/Level3PuzzleView.ts";

import { ScreenController } from "../../../types.ts";
import type { ScreenSwitcher } from "../../../types.ts";


export class Level3Controller extends ScreenController {
    private screenSwitcher: ScreenSwitcher;
    private model: Level3Model;

    // all the views
    private view: Level3View;
    //private roomView: Room3View;
    //private puzzleView: Level3PuzzleView;

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
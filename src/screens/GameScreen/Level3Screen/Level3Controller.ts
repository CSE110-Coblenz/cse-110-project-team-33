import Konva from "konva";
import { Level3Model } from "./Level3Model.ts";
// import all the views
import { Level3View } from "./Level3View.ts";
//import { Room3View } from "./Views/Room3View.ts";
import { Level3PuzzleView } from "./Views/Level3PuzzleView.ts";

// add playerdata
import { PlayerDataManager } from "../../../GameStateManager.ts";

import { ScreenController } from "../../../types.ts";
import type { ScreenSwitcher } from "../../../types.ts";


export class Level3Controller extends ScreenController {
    private screenSwitcher: ScreenSwitcher;
    private model: Level3Model;
    private playerDataManager: PlayerDataManager;

    // all the views
    private view: Level3View;
    private puzzle_view: Level3PuzzleView;

    // constructor
    constructor(screenSwitcher: ScreenSwitcher, playerDataManager: PlayerDataManager) {
        super();

        // initialize all elements
        this.screenSwitcher = screenSwitcher;
        this.playerDataManager = playerDataManager;

        this.model = new Level3Model(playerDataManager);
        this.view = new Level3View();
        this.puzzle_view = new Level3PuzzleView();
        
        this.view.show(); 
    }

    // get the view group
    getView(): Level3View {
        return this.view;
    }
}
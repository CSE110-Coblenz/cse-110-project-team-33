
import Konva from "konva";

import { ScreenController } from "../../../types.ts";
import type { ScreenSwitcher } from "../../../types.ts";

// import { Level2Model } from "./Level2Model.ts"
import { Level2View } from "./Level2View.ts"
import { RoomView } from "./views/RoomView.ts"
import { SundialView } from "./views/SundialView.ts"


export class Level2Controller extends ScreenController {

    private screenSwitcher: ScreenSwitcher;

    /* Views */
    private levelView:  Level2View;
    private roomView:   RoomView;
    private sundial1View:   SundialView;
    
    constructor(screenSwitcher: ScreenSwitcher): void {
        super();
        this.screenSwitcher = screenSwitcher;

        this.levelView = new Level2View();
        this.roomView = new RoomView();
        this.sundial1View = new SundialView();
        this.levelView.getGroup().add(this.roomView.getGroup());
        this.levelView.getGroup().add(this.sundial1View.getGroup());
        this.roomView.hide();
        this.sundial1View.show();
    }

    getView(): Level2View {
        return this.levelView;
    }

    /* This is the *one* event handler that is passed to all elements, it can
     * differentiate elements based on their element IDs that are assigned in
     * the constructor. */
    generalElementEventHandler(evt): void {
        
    }
}

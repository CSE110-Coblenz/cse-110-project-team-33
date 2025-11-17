/* File: Level2Controller.ts
 * Author: Connor Larmer
 * Created on: who even knows anymore
 * 
 * Summary: Level 2 controller class, not much else to say.
 *
 */
 
import { ScreenController } from "../../../types";
import type { ScreenSwitcher } from "../../../types";
import { Level2View } from "./Level2View"
import { RoomView } from "./views/RoomView"
import { SundialView } from "./views/SundialView"


export class Level2Controller extends ScreenController {
    private screenSwitcher: ScreenSwitcher;

    /* Views */
    private levelView:  Level2View;
    private roomView:   RoomView;
    private sundial1View:   SundialView;
    
    constructor(screenSwitcher: ScreenSwitcher) {
        super();
        this.screenSwitcher = screenSwitcher;
        if(this.screenSwitcher) {/* NOP to shut TSC up */}

        this.levelView = new Level2View();
        this.roomView = new RoomView();
        this.sundial1View = new SundialView();
        this.levelView.getGroup().add(this.roomView.getGroup());
        this.levelView.getGroup().add(this.sundial1View.getGroup());

        this.levelView.getGroup().listening(true);
        this.levelView.getGroup().on("click", (evt) => this.commonElementEventHandler(evt));
        
        this.roomView.show();
    }

    getView(): Level2View {
        return this.levelView;
    }

    /* This is the *one* event handler that is passed to all elements, it can
     * differentiate elements based on their element IDs that are assigned in
     * the constructor. NOTE: This doesnt handle return arrows, that logic
     * is predefined in the ReturnArrow element and (sort of) implemented in
     * each subview, sue me if you don't like it. */
    commonElementEventHandler(evt: any): void {
        const target = evt.target;

        //alert("[DEBUG] commonElementEventHandler :: " + target.id());
        
        /* Conditional based on object ID */
        switch(target.id()) {
            case "sundial1":
                this.sundial1View.pushToScreen(this.roomView);
                break;
        }
    }
}

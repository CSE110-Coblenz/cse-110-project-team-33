/* File: SundialView.ts
 * Author: Connor Larmer
 * Created on: 2025-11-05 @ 11:00 PM
 *
 * Summary: Sundial close up view, where the actual puzzle interaciton happens.
 * Holds several elements that the user interacts with.
 *
 */

import Konva from "konva";
import { Background } from "../elements/Background.ts";
import { Overlay } from "../elements/Overlay.ts";
import { ReturnArrow } from "../elements/ReturnArrow.ts";
import { PuzzleDial } from "../elements/PuzzleDial.ts";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../../../constants.ts";
import type { SubView } from "./SubView.ts";

export class SundialView implements SubView {
    private parentView: SubView | null;
    private group: Konva.Group;
    private bg: Background;
    private overlay: Overlay;
    private dbArrow: ReturnArrow;
    private dial: PuzzleDial; 
    
    constructor() {
        this.parentView = null;
        this.group = new Konva.Group();
        this.bg = new Background(Background.sundialBG, "SundialViewBG");
        this.overlay = new Overlay(Overlay.sundialOverlay, "SundialViewOverlay");

        this.dbArrow = new ReturnArrow(
            STAGE_WIDTH*0.01, STAGE_HEIGHT*0.88,
            () => {this.popFromScreen();}, "dbArrow");

        let centerX = STAGE_WIDTH/2;
        let centerY = STAGE_HEIGHT/3;
        this.dial = new PuzzleDial(centerX, centerY, "puzzleDial");

        /* The order matters here for composition reasons(?) */
        this.group.add(this.bg.getElement());
        this.group.add(this.dial.getElement());
        this.group.add(this.overlay.getElement());
        this.group.add(this.dbArrow.getElement());

        this.hide();
    }

    getGroup(): Konva.Group {
        return this.group;
    }
    
    show(): void {
        this.group.visible(true);
        // this.group.getLayer?.draw();
    }
    
    hide(): void {
        this.group.visible(false);
        // this.group.getLayer?.draw();
    }

    pushToScreen(prevView: SubView): void {
        this.parentView = prevView;
        this.parentView.hide();
        this.show();
    }

    popFromScreen(): void {
        if(this.parentView == null) {
            return;
        }
        this.hide();
        this.parentView.show();
    }
}

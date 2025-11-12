/* File: RoomView.ts
 * Author: Connor Larmer
 * Created on: 2025-11-05 @ 2:46 PM
 *
 * Summary: This is the main room view of level 2, The user will interact with
 * elements in this view, and solve the level from here.
 *
 */

import Konva from "konva";
import { Sundial } from "../elements/Sundial.ts";
import { Door } from "../elements/Door.ts";
import { Background } from "../elements/Background.ts";
import { Overlay } from "../elements/Overlay.ts";
import { ReturnArrow } from "../elements/ReturnArrow.ts";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../../../constants.ts";
import type { SubView } from "./SubView.ts";

export class RoomView implements SubView {

    private parentView: SubView;
    private group: Konva.Group;

    private bg: Background;
    private door: Door;
    private overlay: Overlay;
    private sundial1: Sundial;
    private sundial2: Sundial;
    private sundial3: Sundial;
    private dbArrow: ReturnArrow;

    constructor(): RoomView {
        this.group = new Konva.Group();
        this.bg = new Background(Background.debugBG, "RoomViewBG");
        this.overlay = new Overlay(Overlay.debugOverlay, "RoomViewOverlay");

        this.dbArrow = new ReturnArrow(
            STAGE_WIDTH*0.01, STAGE_HEIGHT*0.88,
            () => {alert("cbclicked");}, "dbArrow");

        let centerX = STAGE_WIDTH/2;
        let centerY = STAGE_HEIGHT/2;
        this.door = new Door(centerX, 0, "exitDoor");
        this.sundial1 = new Sundial( centerX - 128, centerY, "sundial1");
        this.sundial2 = new Sundial( centerX      , centerY, "sundial2");
        this.sundial3 = new Sundial( centerX + 128, centerY, "sundial3");

        /* The order matters here for composition reasons(?) */
        this.group.add(this.bg.getElement());
        this.group.add(this.door.getElement());
        this.group.add(this.sundial1.getElement());
        this.group.add(this.sundial2.getElement());
        this.group.add(this.sundial3.getElement());
        this.group.add(this.overlay.getElement());
        this.group.add(this.dbArrow.getElement());

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
        this.hide();
        this.parentView.show();
    }
}

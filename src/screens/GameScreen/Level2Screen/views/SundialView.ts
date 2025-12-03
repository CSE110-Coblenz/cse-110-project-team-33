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
import { NumericInput } from "../elements/NumericInput.ts";
import { InfoTray } from "../elements/InfoTray.ts";
import type { SubView } from "./SubView.ts";

export class SundialView implements SubView {
    private parentView: SubView | null;
    private group: Konva.Group;
    private bg: Background;
    private overlay: Overlay;
    private returnArrow: ReturnArrow;
    private dial: PuzzleDial; 
    private input: NumericInput;

    private infoTray: InfoTray;
    
    constructor(id_suffix: string) {
        this.parentView = null;
        this.group = new Konva.Group();
        this.bg = new Background(Background.sundialBG, id_suffix+"_bg");
        this.overlay = new Overlay(Overlay.sundialOverlay, id_suffix+"_overlay");

        this.returnArrow= new ReturnArrow( STAGE_WIDTH*0.01, STAGE_HEIGHT*0.88,
            () => {this.popFromScreen();}, id_suffix+"_returnArrow");

        let centerX = STAGE_WIDTH/2;
        let centerY = STAGE_HEIGHT/3;
        this.dial = new PuzzleDial(centerX, centerY, id_suffix+"_puzzleDial", 0);
        this.input = new NumericInput(400, 600, 4.20, (id_suffix+"_input"));

        this.infoTray = new InfoTray(STAGE_WIDTH/2, 0, id_suffix+"_measureTray");
        /* The order matters here for composition reasons(?) */
        this.group.add(this.bg.getElement());
        this.group.add(this.dial.getElement());
        this.group.add(this.overlay.getElement());
        this.group.add(this.returnArrow.getElement());
        this.group.add(this.input.getElement());
        this.group.add(this.infoTray.getElement());

        this.hide();
    }

	updateSundialShadow() {
		this.dial.setShadowHeight(this.input.getValue());
	}

	getInputElement() {
		return this.input;
	}

	getMeasureElement() {
		return this.infoTray;
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

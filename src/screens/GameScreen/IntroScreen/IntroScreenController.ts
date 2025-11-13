/* File: IntroScreenController.ts
 * Author: Connor Larmer
 * Created on: 2025-11-12 @ 12:47 AM
 *
 */


import { ScreenController } from "../../../types";
import type { ScreenSwitcher } from "../../../types";
import { IntroScreenView } from "./IntroScreenView";

export class IntroScreenController extends ScreenController {
    private screenSwitcher: ScreenSwitcher;

    private view: IntroScreenView;

    /* BG scroll stuff */
    private bgScrollTimer: any;         /* Dangerous but we cope */
    private bgScrollOffset: number;
    private bgScrollFunc: any;

    /* Text page stuff */
    private currentTextPage: number;

    constructor(screenSwitcher: ScreenSwitcher) {
        super();
        this.screenSwitcher = screenSwitcher;

        this.view = new IntroScreenView();


        /* Set up background animation */
        this.bgScrollOffset = 0;
        this.bgScrollFunc = () => {
            if(this.bgScrollOffset == 400) {
                this.bgScrollOffset = 0;
            }
            this.view.setBackgroundOffset(this.bgScrollOffset);
            this.bgScrollOffset += 1;
        }

        /* Set up button callback */
        this.currentTextPage = 1;
        this.view.getButton().on("click", () => this.buttonCallback());
        this.startBackgroundScrollAnimation();

    }

    startBackgroundScrollAnimation() {
        if(this.bgScrollTimer != null) {
            return;
        }
        this.bgScrollTimer = setInterval(this.bgScrollFunc, 100);                
    }

    stopBackgroundScrollAnimation() {
        if(this.bgScrollTimer == null) {
            return;
        }
        clearInterval(this.bgScrollTimer);
    }

    /* Handles text switching & loading level 2 */
    buttonCallback() {
        if(this.currentTextPage < 4) {
            this.currentTextPage += 1;
            this.view.switchToPage(this.currentTextPage);
        }
        if(this.currentTextPage == 4) {
            /* Transition to start button */
            this.view.setButtonTextureToStart();
            this.currentTextPage = 5;
        } else if(this.currentTextPage == 5) {
            /* Final behavior of button, switch screen */
            this.screenSwitcher.switchToScreen({type: "level2"});
        }
    }

    getView(): IntroScreenView {
        return this.view;
    }
}

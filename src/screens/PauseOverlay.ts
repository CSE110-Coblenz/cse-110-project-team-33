/* File: PauseOverlay.ts
 * Author: Connor Larmer
 * Created on: 2025-11-07 @ 11:08 PM
 *
 * Summary: Pause overlay class, Overlays common UI elements on the main layer,
 * allows for basic keyboard iteractions (WIP) (shortcuts, etc.).
 *
 */

import Konva from 'konva';
import { STAGE_WIDTH, STAGE_HEIGHT } from "./constants.ts"
import type { ScreenSwitcher } from "./types.ts"

export class PauseOverlay {

    private group: Konva.Group;
    private pauseButtonSprite: Konva.Image;
    private pausedOverlay: Konva.Rect;
    private state: boolean;
    private screenSwitcher: ScreenSwitcher;
    private resumeBtn: Konva.Rect;
    private exitBtn: Konva.Rect;

    static get getPauseURL() { return "/res/pause_icon.png"; }
    static get cornerPadding() { return 16; }
    static get defaultSize() { return 32; }
    
    constructor(screenSwitcher: ScreenSwitcher): PauseOverlay {
        this.screenSwitcher = screenSwitcher;
        this.group = new Konva.Group();
        this.pauseButtonSprite = new Konva.Image();
        this.state = false;
        Konva.Image.fromURL(PauseOverlay.getPauseURL, (img) => {
             this.pauseButtonSprite.image(img.image());
             this.pauseButtonSprite.x(STAGE_WIDTH
                                - PauseOverlay.defaultSize 
                                - PauseOverlay.cornerPadding);
             this.pauseButtonSprite.y(PauseOverlay.cornerPadding);
             this.pauseButtonSprite.width(PauseOverlay.defaultSize);
             this.pauseButtonSprite.height(PauseOverlay.defaultSize);
             this.pauseButtonSprite.id("PauseOverlay_pause");
             this.pauseButtonSprite.crop({
                x:0,
                y:0,
                width:16,
                height:16
             });
        });

        this.pausedOverlay = new Konva.Rect({
            x:0,
            y:0,
            width: STAGE_WIDTH,
            height: STAGE_HEIGHT,
            fill: "black",
            opacity: 0.5,
            visible: false
        });

        this.resumeBtn = new Konva.Rect({
            x: STAGE_WIDTH/2,
            y: STAGE_HEIGHT/2 - 128,
            width: 128,
            height: 64,
            fill: "blue",
            offsetX: 64,
            visible: false
        });

        this.exitBtn = new Konva.Rect({
            x: STAGE_WIDTH/2,
            y: STAGE_HEIGHT/2,
            width: 128,
            height: 64,
            fill: "red",
            offsetX: 64,
            visible: false
        });

        this.resumeBtn.on("click", () => {
            this.togglePauseButton();
        });

        this.exitBtn.on("click", () => {
            this.togglePauseButton();
            this.screenSwitcher.switchToScreen({type: "menu"});
        });
        
        this.pauseButtonSprite.on("click", () => this.togglePauseButton());
        this.group.add(this.pausedOverlay);
        this.group.add(this.pauseButtonSprite);
        this.group.add(this.resumeBtn);
        this.group.add(this.exitBtn);
        this.group.visible(true);
    }

    togglePauseButton() {
        if(this.state) {
            this.pauseButtonSprite.cropX(0);
            this.pausedOverlay.visible(false);
            this.resumeBtn.visible(false);
            this.exitBtn.visible(false);
            this.state = false;
        } else {
            this.pauseButtonSprite.cropX(16);
            this.pausedOverlay.visible(true);
            this.resumeBtn.visible(true);
            this.exitBtn.visible(true);
            this.state = true;
        }
    }

    registerKeyEventListener(container): void {
        container.tabIndex = 1;
        container.focus();

        container.addEventListener("keydown", (e) => {
            if(e.key == "Escape")
            {
                this.togglePauseButton();
            }
        });
    }
    
    getGroup(): Konva.Group {
        return this.group;
    }

    setEnabled(state: boolean) {
        this.group.visible(state);
    }

    getEnabled(): boolean {
        return this.group.visible();
    }

    renderOnTop(): void {
        this.group.moveToTop();
    }
}

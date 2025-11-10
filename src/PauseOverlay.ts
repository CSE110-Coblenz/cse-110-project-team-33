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

export class PauseOverlay {

    private group: Konva.Group;
    private pauseButtonSprite: Konva.Image;
    private pausedOverlay: Konva.Rect;
    private state: boolean;

    static get getPauseURL() { return "/res/pause_icon.png"; }
    static get cornerPadding() { return 16; }
    static get defaultSize() { return 32; }
    
    constructor(): PauseOverlay {
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
        
        this.pauseButtonSprite.on("click", () => this.togglePauseButton());
        this.group.add(this.pausedOverlay);
        this.group.add(this.pauseButtonSprite);
        this.group.visible(true);
    }

    togglePauseButton() {
        if(this.state) {
            this.pauseButtonSprite.cropX(0);
            this.pausedOverlay.visible(false);
            this.state = false;
        } else {
            this.pauseButtonSprite.cropX(16);
            this.pausedOverlay.visible(true);
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
}

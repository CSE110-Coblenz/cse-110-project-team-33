/* File: ScreenTransitionOverlay.ts
 * Author: Connor Larmer
 * Created on: 2025-12-03 @ 10:36 PM
 *
 * Summary: Rahh we doing fancy transitions now!
 *
 */

import Konva from 'konva';
import { STAGE_WIDTH, STAGE_HEIGHT } from "../constants.ts"
import type { ScreenSwitcher } from "../types.ts"

export class ScreenTransitionOverlay {

    private group: Konva.Group;
    private overlay: Konva.Rect;
    private screenSwitcher: ScreenSwitcher;

    constructor(screenSwitcher: ScreenSwitcher) {
        this.screenSwitcher = screenSwitcher;
        this.group = new Konva.Group();
        this.overlay = new Konva.Rect({
            x:0,
            y:0,
            width: STAGE_WIDTH,
            height: STAGE_HEIGHT,
            fill: "black",
            opacity: 0.0,
            visible: true
        });
        this.group.add(this.overlay);
        this.group.visible(false);
    }

    fadeIn() {
        let animTimer: any = null;
        let target = 0.1;
        let step = 0.1;
        this.group.moveToTop();
        this.overlay.opacity(1);
        this.group.visible(true);
        let animFunc = () => {
            let opacity = this.overlay.opacity();
            if(opacity > target) {
                this.overlay.opacity(opacity - step);
            } else {
                this.overlay.opacity(0);
                this.group.visible(false);
                clearInterval(animTimer);
                return;
            }
        };
        animTimer = setInterval(animFunc, 32);        
    }   

    fadeOut(callback) {
        let animTimer: any = null;
        let target = 0.9;
        let step = 0.1;
        this.group.moveToTop();
        this.overlay.opacity(0);
        this.group.visible(true);        
        let animFunc = () => {
            let opacity = this.overlay.opacity();
            if(opacity < target) {
                this.overlay.opacity(opacity + step);
            } else {
                this.overlay.opacity(1);
                this.group.visible(true);
                callback();
                clearInterval(animTimer);
                return;
            }
        };
        animTimer = setInterval(animFunc, 32);        
    }    

    
    getGroup(): Konva.Group {
        return this.group;
    }
}

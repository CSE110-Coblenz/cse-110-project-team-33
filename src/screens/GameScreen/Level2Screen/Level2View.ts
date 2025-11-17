/* File: Level2View.ts
 * Author: Connor Larmer
 * Created on: 2025-11-05 @ 2:30 PM
 *
 * Summary: Main view for level 2, implements several subviews which are 
 * switched out depending on how the user interacts with the level. That
 * is all transparent to anything that adds this class, as the logic for
 * it is isolated to the level 2 MVC.
 *
 * NOTE: This file is quite empty, as the controller manages all views, and
 * uses this one as the 'canvas' that gets drawn to then passed up to the
 * main screen switcher.
 */

 import Konva from "konva";
 import type { View } from "../../../types";


 export class Level2View implements View {

    private group: Konva.Group;

    constructor() {
        this.group = new Konva.Group({visible: false});
    }

    getGroup(): Konva.Group {
        return this.group;
    }
    
    show(): void {
        this.group.visible(true);
    }
    
    hide(): void {
        this.group.visible(false);
    }
    
 }

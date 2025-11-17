/* File: Background.ts
 * Author: Connor Larmer 
 * Created on 2025-11-05 @ 2:36 PM
 *
 * Summary: Background element, only exists because each subview will likely
 * have different background textures, and this provides a layer of abstraction
 * between the image loading and displaying.. In other words, more work now =
 * less work later.
 *
 */

import Konva from "konva";
import type { Element } from "./Element.ts";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../../../constants.ts";

export class Background implements Element {

    private bg: Konva.Image;
    private xPos : number;
    private yPos : number;
    private id: string;
    private backgroundURL: string;

    /* Static getters to actual background URLS */
    static get debugBG()    { return "/img/level2/debug_bg2.png"; }
    static get mainBG()     { return "/img/level2/debug_bg.png"; }
    static get sundialBG()  { return "/img/level2/debug_bg.png"; }

    getURL()            { return this.backgroundURL; }
    getID()             { return this.id; }
    getDefaultWidth()   { return STAGE_WIDTH; }
    getDefaultHeight()  { return STAGE_HEIGHT; }
    getElement()        { return this.bg; }
    
    constructor (url: string, id: string) {
        this.backgroundURL = url;
        this.id = id;
        this.bg = new Konva.Image();
        Konva.Image.fromURL(this.getURL(), (img) => {
            this.bg.image(img.image());
            this.bg.id(id);
            this.bg.width(this.getDefaultWidth());
            this.bg.height(this.getDefaultHeight());
        });
    }

}

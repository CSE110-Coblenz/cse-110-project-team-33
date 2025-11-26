/* File: Overlay.ts
 * Author: Connor Larmer 
 * Created on 2025-11-05 @ 4:29 PM
 *
 * Summary: Overlay element, invisible to hits, for decoration only. Think of
 * a Background element but on top of everything.
 *
 */

import Konva from "konva";
import type { Element } from "./Element.ts";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../../../constants.ts";

export class Overlay implements Element {

    private overlay: Konva.Image;
    private id: string;
    private overlayURL: string;

    /* Static getters to actual background URLS */
    static get debugOverlay()    { return "/img/level2/debug_bg2_overlay.png"; }
    static get sundialOverlay()    { return "/img/level2/sundial_view_overlay.png"; }

    getURL()            { return this.overlayURL; }
    getID()             { return this.id; }
    getDefaultWidth()   { return STAGE_WIDTH; }
    getDefaultHeight()  { return STAGE_HEIGHT; }
    getElement()        { return this.overlay; }
    
    constructor (url: string, id: string) {
        this.overlayURL = url;
        this.id = id;
        this.overlay = new Konva.Image({image: undefined});
        Konva.Image.fromURL(this.getURL(), (img) => {
            this.overlay.image(img.image());
            this.overlay.id(id);
            this.overlay.width(this.getDefaultWidth());
            this.overlay.height(this.getDefaultHeight());
            this.overlay.fillEnabled(false); // Disable hit region
        });
    }

}

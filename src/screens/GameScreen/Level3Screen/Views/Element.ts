import Konva from "konva";


export interface Element {
    /* Return some object derived from Konva.Shape, for adding to screen */
    getElement(): Konva.Shape | Konva.Group;
    /* Method to get URL of an elements resource */
    getURL(): string;
    /* Get the non-unique name/ID of an element, for handling events by
     * target in subViews */
    getID(): string;
    /* Methods to get default width/height of an Element */
    getDefaultWidth(): number;
    getDefaultHeight(): number;
}
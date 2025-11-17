/* File: Element.ts
 * Author: Connor Larmer 
 * Created on 2025-11-05 @ 2:14 PM
 *
 * Summary: Element interface, provides common methods that any element
 * should implement in order to be added to a view/subview. 
 *
 */

import Konva from "konva";


export interface Element {
    /* Return some object derived from Konva.Shape, for adding to screen */
    abstract getElement(): Konva.Shape;
    /* Method to get URL of an elements resource */
    abstract getURL(): string;
    /* Get the non-unique name/ID of an element, for handling events by
     * target in subViews */
    abstract getID(): string;
    /* Methods to get default width/height of an Element */
    abstract getDefaultWidth(): number;
    abstract getDefaultHeight(): number;
}

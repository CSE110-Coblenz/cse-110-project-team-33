/* File: SubView.ts
 * Author: Connor Larmer
 * Created on: 2025-1105 @ 2:59 PM
 *
 * Summary: SubView interface to implement a 'stack' of views, where one
 * view can be pushed to the screen, then pop itself off later and restore
 * the previous view. NOTE: SubViews and Views are NOT interchangable!
 *
 */

import Konva from "konva";


 export interface SubView {
    /* Get SubView group */
    getGroup(): Konva.Group;
    /* Show the SubView */
    show(): void;
    /* Hide the SubView */
    hide(): void;

    /* NOTE: Only use push/pop methods together! as otherwise the contents of
     * the parentView variable may result in undefined behavior */
    
    /* Push the SubView to the screen, while hiding the parent view */
    pushToScreen(prevView: SubView): void;
    /* Pop the SubView from the screen while restoring the parent view */
    popFromScreen(): void;
 }

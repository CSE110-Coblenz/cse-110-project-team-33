// thank you Connor for this interface, makes opening puzzle subview so much easier
import Konva from "konva";

export interface SubView {
    // save the view that we're switching from (call it the parent)
    parentView: SubView;

    // get the view we're switching to
    getGroup(): Konva.Group;
    show(): void; // show the sub view
    hide(): void; // hide the sub view

    // display sub view, hides parent view
    pushToScreen(parView: SubView): void;

    // hide sub view, restore parent view
    popFromScreen(): void;
}
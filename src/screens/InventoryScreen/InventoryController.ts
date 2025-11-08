import { InventoryModel } from "./InventoryModel.ts";
import { InventoryView } from "./InventoryView.ts";
import { ScreenController } from "../../types.ts";
import type { ScreenSwitcher } from "../../types.ts";
import Konva from "konva";

export class InventoryController extends ScreenController {
    private screenSwitcher: ScreenSwitcher;
    private model: InventoryModel;
    private view: InventoryView;

    constructor(screenSwitcher: ScreenSwitcher) {
        super();
        this.screenSwitcher = screenSwitcher;
    
        this.model = new InventoryModel();
        this.view = new InventoryView();
    }
    
    getView(): InventoryView {
        return this.view;
    }
}
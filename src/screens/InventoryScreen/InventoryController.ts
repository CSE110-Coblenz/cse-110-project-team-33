import { InventoryModel } from "./InventoryModel.ts";
import { InventoryView } from "./InventoryView.ts";
import { ScreenController } from "../../types.ts";
import type { InventoryItem, ScreenSwitcher } from "../../types.ts";
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

        // Initialize with Promise
        this.initialize();
    }

    private async initialize(): Promise<void> {
        // Wait for the view to render everything
        await this.view.updateInventory(
            this.model.getInventory(), 
            this.model.getCurrentIndex()
        );
        
        // Now setup click listeners after everything is rendered
        this.setupClickListeners();
    }

    prevItem() {
        var currentIndex: number = this.model.getCurrentIndex();
        if (currentIndex > 0) {
            currentIndex--;
            this.model.setCurrentIndex(currentIndex);
            this.view.updateInventory(this.model.getInventory(), this.model.getCurrentIndex());
        }
    }

    nextItem() {
        var currentIndex: number = this.model.getCurrentIndex();
        var inventory: InventoryItem[] = this.model.getInventory();
        if (currentIndex < inventory.length - 1) {
            currentIndex++;
            this.model.setCurrentIndex(currentIndex);
            this.view.updateInventory(this.model.getInventory(), this.model.getCurrentIndex());
            console.log(currentIndex);
        }
    }

    private setupClickListeners(): void {
        const prevButton = this.view.getPrevButton();
        const nextButton = this.view.getNextButton();

        this.addClickBehavior(prevButton, "prev");
        this.addClickBehavior(nextButton, "next");
    }

    private addClickBehavior(image: Konva.Image, action: string): void {
        image.on("mouseover", () => {
            document.body.style.cursor = "pointer";
            console.log("mouseover");
        });
    
        image.on("mouseout", () => {
            document.body.style.cursor = "default";
        });
            
        image.on("click", () => {
            console.log("click:", action);
            if (action == "prev") {
                this.prevItem();
            }
            if (action == "next") {
                this.nextItem();
            }
        });
    }
    
    getView(): InventoryView {
        return this.view;
    }
}
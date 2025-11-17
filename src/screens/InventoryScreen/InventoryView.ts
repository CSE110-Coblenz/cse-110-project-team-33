import Konva from "konva";
import type { InventoryItem } from "../../types.ts";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../constants.ts";

export class InventoryView {
    private group: Konva.Group;
    private contentGroup: Konva.Group;
    private inventory: InventoryItem[];
    private prevButton: Konva.Image;
    private nextButton: Konva.Image;
    private backpack: Konva.Image;
    private buttonsCreated: boolean;
    

    constructor() {
        this.group = new Konva.Group({ visible: false });
        this.contentGroup = new Konva.Group();
        this.inventory = [];
        this.prevButton = new Konva.Image();
        this.nextButton = new Konva.Image();
        this.backpack = new Konva.Image();
        this.buttonsCreated = false;
        
        // Add background
        const bg = new Konva.Rect({
            x: 0,
            y: 0,
            width: STAGE_WIDTH,
            height: STAGE_HEIGHT,
            fill: "#e3cba2",
        });
        this.group.add(bg);

        Konva.Image.fromURL("/res/backpack.png", (image) => {
            image.width(50).height(50);
            image.x(5).y(5);
            this.group.add(image);
            this.backpack = image;
            this.group.getLayer()?.draw();
        });
        
        // Add contentGroup once in constructor
        this.group.add(this.contentGroup);
    }

    async updateInventory(inventory: InventoryItem[], currentIndex: number): Promise<void> {
        this.inventory = inventory;
        await this.renderInventory(currentIndex);
    }
    
    async renderInventory(currentIndex: number): Promise<void> {
        this.contentGroup.destroyChildren();

        // If inventory is empty, show a message
        if (this.inventory.length === 0) {
            const emptyText = new Konva.Text({
                x: STAGE_WIDTH / 2,
                y: STAGE_HEIGHT / 2,
                text: "Inventory is empty",
                fontSize: 16,
                fontFamily: "Press Start 2P",
                fill: "#000",
                align: "center",
                offsetX: 150
            });
            this.contentGroup.add(emptyText);
        } else {
            const inventoryItem: InventoryItem = this.inventory[currentIndex];
            
            // Only create navigation buttons if there are multiple items
            if (this.inventory.length > 1 && !this.buttonsCreated) {
                const prevPromise = new Promise<void>((resolve) => {
                    Konva.Image.fromURL("/res/arrow.png", (image) => {
                        image.width(40).height(40);
                        image.x(5).y(STAGE_HEIGHT / 2 - 40);
                        this.prevButton = image;
                        this.group.add(image);
                        this.group.getLayer()?.draw();
                        resolve();
                    });
                });

                const nextPromise = new Promise<void>((resolve) => {
                    Konva.Image.fromURL("/res/arrow.png", (image) => {
                        image.width(40).height(40);
                        image.x(STAGE_WIDTH - 5).y(STAGE_HEIGHT / 2 + 10);
                        image.rotation(180);
                        this.nextButton = image;
                        this.group.add(image);
                        this.group.getLayer()?.draw();
                        resolve();
                    });
                });

                // Wait for both images to load
                await Promise.all([prevPromise, nextPromise]);
                this.buttonsCreated = true;
            }

            // Load the inventory item image
            Konva.Image.fromURL("/res/" + inventoryItem.image, (image) => {
                image.width(inventoryItem.width).height(inventoryItem.height);
                image.x(STAGE_WIDTH / 2 - inventoryItem.width / 2).y(STAGE_HEIGHT / 2 - inventoryItem.height / 2);
                this.contentGroup.add(image);
                this.group.getLayer()?.draw();
            });
            
            // Add text1 if it exists
            if (inventoryItem.text1) {
                const text1 = new Konva.Text({
                    x: inventoryItem.text1X || STAGE_WIDTH / 2,
                    y: inventoryItem.text1Y || STAGE_HEIGHT / 2,
                    text: inventoryItem.text1,
                    fontSize: 24,
                    fontFamily: "Arial",
                    fill: "#000",
                    align: "center",
                    offsetX: 100
                });
                this.contentGroup.add(text1);
            }
            
            // Add text2 if it exists
            if (inventoryItem.text2) {
                const text2 = new Konva.Text({
                    x: inventoryItem.text2X || STAGE_WIDTH / 2,
                    y: inventoryItem.text2Y || STAGE_HEIGHT / 2,
                    text: inventoryItem.text2,
                    fontSize: 24,
                    fontFamily: "Arial",
                    fill: "#000",
                    align: "center",
                    offsetX: 100
                });
                this.contentGroup.add(text2);
            }
            
            // Add text3 if it exists
            if (inventoryItem.text3) {
                const text3 = new Konva.Text({
                    x: inventoryItem.text3X || STAGE_WIDTH / 2,
                    y: inventoryItem.text3Y || STAGE_HEIGHT / 2,
                    text: inventoryItem.text3,
                    fontSize: 24,
                    fontFamily: "Arial",
                    fill: "#000",
                    align: "center",
                    offsetX: 100
                });
                this.contentGroup.add(text3);
            }
        }
        
        this.group.getLayer()?.draw();
    }

    getPrevButton(): Konva.Image {
        return this.prevButton;
    }

    getNextButton(): Konva.Image {
        return this.nextButton;
    }

    getBackpack(): Konva.Image {
        return this.backpack;
    }

    show(): void {
        this.group.visible(true);
        this.group.getLayer()?.draw();
    }

    hide(): void {
        this.group.visible(false);
        this.group.getLayer()?.draw();
    }

    getGroup(): Konva.Group {
        return this.group;
    }
}
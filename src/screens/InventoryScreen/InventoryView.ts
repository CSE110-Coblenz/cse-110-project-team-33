import Konva from "konva";
import { InventoryItem } from "../../types.ts";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../constants.ts";

export class InventoryView {
    private group: Konva.Group;
    private contentGroup: Konva.Group;
    private inventory: InventoryItem[];
    private prevButton: Konva.Image;
    private nextButton: Konva.Image;
    private buttonsCreated: boolean;

    constructor() {
        this.group = new Konva.Group({ visible: false });
        this.contentGroup = new Konva.Group();
        this.inventory = [];
        this.prevButton = new Konva.Image();
        this.nextButton = new Konva.Image();
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
            image.width(75).height(75);
            image.x(10).y(10);
            this.group.add(image);
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
        
        var inventoryItem: InventoryItem = this.inventory[currentIndex];

        // If inventory is empty, show a message
        if (this.inventory.length === 0) {
            const emptyText = new Konva.Text({
                x: STAGE_WIDTH / 2,
                y: STAGE_HEIGHT / 2,
                text: "Inventory is empty",
                fontSize: 24,
                fontFamily: "Arial",
                fill: "#000",
                align: "center",
                offsetX: 100
            });
            this.contentGroup.add(emptyText);
        } else if (this.inventory.length === 1) {
            Konva.Image.fromURL("/res/" + inventoryItem.getImage(), (image) => {
                image.width(inventoryItem.getWidth()).height(inventoryItem.getHeight());
                image.x(STAGE_WIDTH / 2 - inventoryItem.getWidth() / 2).y(STAGE_HEIGHT / 2 - inventoryItem.getHeight() / 2);
                this.contentGroup.add(image);
                this.group.getLayer()?.draw();
            });
            if (inventoryItem.getText1()) {
                const text1 = new Konva.Text({
                    x: inventoryItem.getText1X(),
                    y: inventoryItem.getText1Y(),
                    text: inventoryItem.getText1(),
                    fontSize: 24,
                    fontFamily: "Arial",
                    fill: "#000",
                    align: "center",
                    offsetX: 100
                });
                this.contentGroup.add(text1);
            }
            if (inventoryItem.getText2()) {
                const text2 = new Konva.Text({
                    x: inventoryItem.getText2X(),
                    y: inventoryItem.getText2Y(),
                    text: inventoryItem.getText2(),
                    fontSize: 24,
                    fontFamily: "Arial",
                    fill: "#000",
                    align: "center",
                    offsetX: 100
                });
                this.contentGroup.add(text2);
            }
            if (inventoryItem.getText3()) {
                const text3 = new Konva.Text({
                    x: inventoryItem.getText3X(),
                    y: inventoryItem.getText3Y(),
                    text: inventoryItem.getText3(),
                    fontSize: 24,
                    fontFamily: "Arial",
                    fill: "#000",
                    align: "center",
                    offsetX: 100
                });
                this.contentGroup.add(text3);
            }
        } else {
            // Only create buttons once
            if (!this.buttonsCreated) {
                const prevPromise = new Promise<void>((resolve) => {
                    Konva.Image.fromURL("/res/arrow.png", (image) => {
                        image.width(50).height(50);
                        image.x(10).y(STAGE_HEIGHT / 2 - 40);
                        this.prevButton = image;
                        this.group.add(image);
                        this.group.getLayer()?.draw();
                        resolve();
                    });
                });

                const nextPromise = new Promise<void>((resolve) => {
                    Konva.Image.fromURL("/res/arrow.png", (image) => {
                        image.width(50).height(50);
                        image.x(STAGE_WIDTH - 10).y(STAGE_HEIGHT / 2 + 10);
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

            Konva.Image.fromURL("/res/" + inventoryItem.getImage(), (image) => {
                image.width(inventoryItem.getWidth()).height(inventoryItem.getHeight());
                image.x(STAGE_WIDTH / 2 - inventoryItem.getWidth() / 2).y(STAGE_HEIGHT / 2 - inventoryItem.getHeight() / 2);
                this.contentGroup.add(image);
                this.group.getLayer()?.draw();
            });
            if (inventoryItem.getText1()) {
                const text1 = new Konva.Text({
                    x: inventoryItem.getText1X(),
                    y: inventoryItem.getText1Y(),
                    text: inventoryItem.getText1(),
                    fontSize: 24,
                    fontFamily: "Arial",
                    fill: "#000",
                    align: "center",
                    offsetX: 100
                });
                this.contentGroup.add(text1);
            }
            if (inventoryItem.getText2()) {
                const text2 = new Konva.Text({
                    x: inventoryItem.getText2X(),
                    y: inventoryItem.getText2Y(),
                    text: inventoryItem.getText2(),
                    fontSize: 24,
                    fontFamily: "Arial",
                    fill: "#000",
                    align: "center",
                    offsetX: 100
                });
                this.contentGroup.add(text2);
            }
            if (inventoryItem.getText3()) {
                const text3 = new Konva.Text({
                    x: inventoryItem.getText3X(),
                    y: inventoryItem.getText3Y(),
                    text: inventoryItem.getText3(),
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
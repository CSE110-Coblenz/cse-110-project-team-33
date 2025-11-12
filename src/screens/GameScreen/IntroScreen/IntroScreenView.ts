/* File: IntroScreenView.ts
 * Author: Connor Larmer
 * Created on: 2025-11-12 @ 1:01 AM
 *
 */


import Konva from "konva";
import type { View } from "../../../types";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../../constants";


export class IntroScreenView implements View {
    private group: Konva.Group;
    
    private bg: Konva.Image;

    /* Currently storing intro text as images */
    private page1: Konva.Image;
    private page2: Konva.Image;
    private page3: Konva.Image;
    private page4: Konva.Image;

    private button: Konva.Image;

    private pageCount: number;
    

    constructor() {
        this.group = new Konva.Group({visible: false});

        this.bg = new Konva.Image();
        Konva.Image.fromURL("/res/img/intro/bg.png", (img) => {
            this.bg.image(img.image());
            this.bg.x(0);
            this.bg.y(0);
            this.bg.width(STAGE_WIDTH);
            this.bg.height(STAGE_HEIGHT);
            this.bg.crop({
                x:0, y:0,
                width: 200,
                height: 150
            });
        });

        this.button = new Konva.Image({
            x: STAGE_WIDTH/2,
            y: STAGE_HEIGHT * 0.88,
            width: 128,
            height: 64,
            offsetX: 64
        });

        /* Kind of a bad way to display text blocks ngl */
        this.page1 = new Konva.Image({
            x: 0, y:0, width: STAGE_WIDTH, 
            height: STAGE_HEIGHT});
        this.page2 = new Konva.Image({
            x: 0, y:0, width: STAGE_WIDTH, 
            height: STAGE_HEIGHT});
        this.page3 = new Konva.Image({
            x: 0, y:0, width: STAGE_WIDTH, 
            height: STAGE_HEIGHT});    
        this.page4 = new Konva.Image({
            x: 0, y:0, width: STAGE_WIDTH, 
            height: STAGE_HEIGHT});

        Konva.Image.fromURL("/res/img/intro/text1.png", (img) => {
            this.page1.image(img.image());
        });
        Konva.Image.fromURL("/res/img/intro/text2.png", (img) => {
            this.page2.image(img.image());
        });
        Konva.Image.fromURL("/res/img/intro/text3.png", (img) => {
            this.page3.image(img.image());
        });
        Konva.Image.fromURL("/res/img/intro/text4.png", (img) => {
            this.page4.image(img.image());
        });
        this.group.add(this.bg);
        this.group.add(this.page1);
        this.group.add(this.page2);
        this.group.add(this.page3);
        this.group.add(this.page4);

        this.group.add(this.button);

        this.setButtonTextureToNext();
        this.switchToPage(1);

        }

    setBackgroundOffset(x: number) {
        this.bg.cropX(x);
    }

    getButton() {
        return this.button;
    }

    setButtonTextureToNext() {
        Konva.Image.fromURL("/res/img/intro/next.png", (img) => {
            this.button.image(img.image());
        });        
    }

    setButtonTextureToStart() {
        Konva.Image.fromURL("/res/img/intro/start.png", (img) => {
            this.button.image(img.image());
        });        
    }

    switchToPage(page: number) {
        this.page1.visible(false);
        this.page2.visible(false);
        this.page3.visible(false);
        this.page4.visible(false);
        switch(page) {
            case 1:
                this.page1.visible(true);
                break;
            case 2:
                this.page2.visible(true);
                break;
            case 3:
                this.page3.visible(true);
                break;
            case 4:
                this.page4.visible(true);
                break;
        }
    }
    
    getGroup(): Konva.Group {
        return this.group;
    }

    show(): void {
        this.group.visible(true);
        //this.group.getLayer?.draw();
    }
    
    hide(): void {
        this.group.visible(false);
        //this.group.getLayer?.draw();
    }
}

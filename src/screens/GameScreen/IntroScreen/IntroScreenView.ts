/* File: IntroScreenView.ts
 * Author: Connor Larmer
 * Created on: 2025-11-12 @ 1:01 AM
 *
 */


import Konva from "konva";
import type { View } from "../../../types";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../../constants";


/* Class to organize text pages (blocks of text on the screen), since this
 * code is reused several times to display to intro text. */
class TextPage {
    private page: Konva.Image;

    constructor(src: string) {
        this.page = new Konva.Image({
            image: undefined,
            width: STAGE_WIDTH, 
            height: STAGE_HEIGHT,
            x: 0, 
            y:0, 
        });
        Konva.Image.fromURL(src, (img) => {
            this.page.image(img.image());
        });
    }

    getElement(): Konva.Image {
        return this.page;
    }

    visible(visible: boolean) {
        this.page.visible(visible);
    }
}

/* Button class, because if we're making each visible element into their own
 * class, might as well include the button */
class Button {
    private button: Konva.Image;
    private startURL: string;
    private nextURL: string;

    constructor(startURL: string, nextURL: string) {
        this.startURL = startURL;
        this.nextURL = nextURL;
        
        /* Hard code button position... */    
        this.button = new Konva.Image({
            image: undefined,
            x: STAGE_WIDTH/2,
            y: STAGE_HEIGHT * 0.88,
            width: 128,
            height: 64,
            offsetX: 64
        });  

        this.setNextTex();
    }

    setStartTex() {
        Konva.Image.fromURL(this.startURL, (img) => {
            this.button.image(img.image());
        });
    }

    setNextTex() {
        Konva.Image.fromURL(this.nextURL, (img) => {
            this.button.image(img.image());
        });
    }

    getElement(): Konva.Image {
        return this.button;
    }
}

/* IntroScreenView class, instantiated in IntroScreenController */
export class IntroScreenView implements View {
    private group: Konva.Group;
    
    private bg: Konva.Image;
    /* Currently storing intro text as images */
    private page1: TextPage;
    private page2: TextPage;
    private page3: TextPage;
    private page4: TextPage;
    private button: Button;

    constructor() {
        this.group = new Konva.Group({visible: false});

        this.bg = new Konva.Image({image: undefined});
        Konva.Image.fromURL("/res/intro/bg.png", (img) => {
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

        this.page1 = new TextPage("/res/intro/text1.png");
        this.page2 = new TextPage("/res/intro/text2.png");
        this.page3 = new TextPage("/res/intro/text3.png");
        this.page4 = new TextPage("/res/intro/text4.png");

        this.button = new Button(
            "/res/intro/start.png", 
            "/res/intro/next.png"
        );

        /* Ordering matters */
        this.group.add(this.bg);
        this.group.add(this.page1.getElement());
        this.group.add(this.page2.getElement());
        this.group.add(this.page3.getElement());
        this.group.add(this.page4.getElement());
        this.group.add(this.button.getElement());

        this.switchToPage(1);

        }

    setBackgroundOffset(x: number) {
        this.bg.cropX(x);
    }

    getButton() {
        return this.button.getElement();
    }

    setButtonTextureToNext() {
        this.button.setNextTex(); 
    }

    setButtonTextureToStart() {
        this.button.setStartTex(); 
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
    }
    
    hide(): void {
        this.group.visible(false);
    }
}

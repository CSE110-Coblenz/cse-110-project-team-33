/* File: NumericInput.ts
 * Author: Connor Larmer 
 * Created on 2025-11-22 @ 9:42 PM
 *
 */

import Konva from "konva";
import type Element from "Element" 



class DigitDisplay {
    private group: Konva.Group;
    private incBtn: Konva.Image;
    private decBtn: Konva.Image;
    private bg: Konva.Image;
    private digit: Konva.Text;

    private value: number;
    private maxVal: number

    constructor(x: number, y: number, maxVal: number) {
        this.value = 0;
        this.maxVal = maxVal;
        this.group = new Konva.Group({
            x: x, y: y,
            scaleX: 4,
            scaleY: 4,
            offsetX: 8,
            offsetY: 16
        });
        this.incBtn = new Konva.Image({image: undefined});
        this.decBtn = new Konva.Image({image: undefined});
        this.bg = new Konva.Image({image: undefined});

        Konva.Image.fromURL("img/level2/digit_bg.png", (img) => {
            this.bg.image(img.image());
            this.bg.x(0);
            this.bg.y(0);
            this.bg.width(16);
            this.bg.height(32);
        });

        Konva.Image.fromURL("img/level2/inc_btn.png", (img) => {
            this.incBtn.image(img.image());
            this.incBtn.x(1);
            this.incBtn.y(1);
            this.incBtn.width(14);
            this.incBtn.height(8);
        });

        Konva.Image.fromURL("img/level2/dec_btn.png", (img) => {
            this.decBtn.image(img.image());
            this.decBtn.x(1);
            this.decBtn.y(32-8-1);
            this.decBtn.width(14);
            this.decBtn.height(8);
        });

        this.digit = new Konva.Text({
            text: this.value,
            align: "center",
            fontSize: 10,
            fontFamily: "Press Start 2P",
            fill: "#fae800",
            x: 8,
            y: 16,
            height: 10,
            width: 10,
            offsetX: 5,
            offsetY: 5            
        });

        this.group.add(this.bg);
        this.group.add(this.incBtn);
        this.group.add(this.decBtn);
        this.group.add(this.digit);


        this.incBtn.on("click", () => {
            this.value = (this.value + 1) % (this.maxVal+1);
            this.digit.text(this.value);
        });

       this.decBtn.on("click", () => {
            this.value = (this.value - 1) % (this.maxVal+1);
            if(this.value < 0) {
                this.value = this.maxVal;
            }
            this.digit.text(this.value);
        });
        
    }

    getElement()    {return this.group;}
    getValue()      {return this.value;}
    setValue(val: number) {this.value = val % 10 };
}

export class NumericInput implements Element {

    private group: Konva.Group;
    private bg: Konva.Image;
    private d1: DigitDisplay;
    private d2: DigitDisplay;
    private d3: DigitDisplay;

    private maxVal: number;

    
    getElement()        { return this.group;}
    getURL()            {}
    getID()             { return this.id; }
    getDefaultWidth()   { return 232; }
    getDefaultHeight()  { return 144; }

    constructor(x : number, y : number, id: string, maxVal: number) {
    this.maxVal = maxVal;
        this.group = new Konva.Group({
            x: x, y: y,
            offsetX: this.getDefaultWidth()/2,
            offsetY: this.getDefaultHeight()
        });

        const bg = new Konva.Rect({
            x: 0,
            y: 0,
            width: this.getDefaultWidth(),
            height: this.getDefaultHeight(),
            fill: "red",
        });

        this.bg = new Konva.Image({image: undefined});
        Konva.Image.fromURL("img/level2/numeric_input_bg.png", (img) => {
            this.bg.image(img.image());
            this.bg.x(0);
            this.bg.x(0);
            this.bg.width(this.getDefaultWidth());
            this.bg.height(this.getDefaultHeight());
        });


        this.group.add(this.bg);
        this.d1 = new DigitDisplay(40 ,  this.getDefaultHeight() / 2, 9);
        this.d2 = new DigitDisplay(120 , this.getDefaultHeight() / 2, 9);
        this.d3 = new DigitDisplay(192 , this.getDefaultHeight() / 2, 9);
        this.group.add(this.d1.getElement());
        this.group.add(this.d2.getElement());
        this.group.add(this.d3.getElement());
    
    }

    getValue() {
        let val = 0;
        val += this.d1.getValue();
        val += this.d2.getValue()/10;
        val += this.d3.getValue()/100;
        return val;
    }
}

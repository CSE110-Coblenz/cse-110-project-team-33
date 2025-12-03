/* File: Coins.ts
 * Author: Connor Larmer 
 *
 * Summary: Display icon for coin score in level 2.
 *
 */

import Konva from "konva";
import type { Element } from "./Element";

export class Coins implements Element {

    private group: Konva.Group;
    private coinSprite: Konva.Image;
    private text: Konva.Text;
    private id: string;

    getURL()            { return "/res/Coins.png"; }
    getID()             { return this.id; }
    getDefaultWidth()   { return 50; }
    getDefaultHeight()  { return 50; }
    getElement()        { return this.group; }
    
    constructor (id: string) {
        this.id = id;
        this.group = new Konva.Group({id: id});
        this.coinSprite = new Konva.Image({image: undefined});
        Konva.Image.fromURL(this.getURL(), (img) => {
            this.coinSprite.image(img.image());
            this.coinSprite.id(id);
            this.coinSprite.x(75);
            this.coinSprite.y(5);
            this.coinSprite.width(this.getDefaultWidth());
            this.coinSprite.height(this.getDefaultHeight());
        });

        this.text = new Konva.Text({
            text: "$$$",
            fontSize: 20,
            fontFamily: "Press Start 2P",
            fill: "black",
            x: 135,
            y: 20,
        });
        
        this.group.add(this.coinSprite);
        this.group.add(this.text);
    }

    updateDisplayCoins(score: number) {
        if(score != null) {
            this.text.text(score.toFixed(0));
        }
    };

}

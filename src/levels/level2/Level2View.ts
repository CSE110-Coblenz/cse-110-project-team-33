import Konva from "konva";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../constants.ts";

export class Level2View {
    private group: Konva.Group;
    
    private doorSprite : Konva.Rect;
    private lightSprite : Konva.Circle; 

/*
    // Sundial surface sprites, move up and down according to input
    private sundial1Sprite : Konva.Circle;
    private sundial2Sprite : Konva.Circle;
    private sundial3Sprite : Konva.Circle;

    // Stationary base of sundial (purely visual)
    private sundial1BaseSprite : Konva.Rect;
    private sundial2BaseSprite : Konva.Rect;
    private sundial3BaseSprite : Konva.Rect;

    // Placeholders for text input boxes
    private sundial1InputBox : Konva.Rect;
    private sundial2InputBox : Konva.Rect;
    private sundial3InputBox : Konva.Rect;
*/
    private backgroundSprite : Konva.Rect;

    constructor() {
        this.group = new Konva.Group({visible: false});

        this.backgroundSprite = new Konva.Rect({
           x : 0, y : 0,
           width : STAGE_WIDTH,
           height : STAGE_HEIGHT,
           fill : "#CBB600" 
        });

        

        // Add everything in a specific order
        this.group.add(this.backgroundSprite);
        /*
        this.group.add(this.doorSprite);
        this.group.add(this.sundial1BaseSprite);
        this.group.add(this.sundial2BaseSprite);
        this.group.add(this.sundial3BaseSprite);
        this.group.add(this.sundial1Sprite);
        this.group.add(this.sundial2Sprite);
        this.group.add(this.sundial3Sprite);
        this.group.add(this.lightSprite);
        this.group.add(this.sundial1InputBox);
        this.group.add(this.sundial2InputBox);
        this.group.add(this.sundial3InputBox);
        */
        

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

import Konva from "konva";
import type { View } from "../../../types.ts";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../../constants.ts";

export class Level3View implements View {
    //private room: Konva.Image;
    private group: Konva.Group;
    private rock1: Konva.Circle;
    private rock2: Konva.Circle;
    private rock3: Konva.Circle;
    private rock4: Konva.Circle;
    private rock5: Konva.Circle;
    private selected: number[] = [];

    constructor(onClick: () => void) {
        // create group for layers
        this.group = new Konva.Group({ visible: false });
        // initialize list to be all false for now
        this.selected = [0, 0, 0, 0, 0];
        
        // water
        const bg = new Konva.Rect({
            x: 0,
            y: 0,
            width: STAGE_WIDTH,
            height: STAGE_HEIGHT,
            fill: "#87CEEB", // Sky blue -> water
        });
        this.group.add(bg);

        // "rocks" -> circles for now
        this.rock1 = new Konva.Circle({
            x: 170,
            y: 425,
            radius: 35,
            fill: 'gray',
            //stroke: 'black',
        });

        this.rock2 = new Konva.Circle({
            x: STAGE_WIDTH / 2 - 60,
            y: STAGE_HEIGHT / 2 - 20,
            radius: 35,
            fill: 'gray',
        });

        this.rock3 = new Konva.Circle({
            x: STAGE_WIDTH / 2 - 145,
            y: STAGE_HEIGHT / 2 - 180,
            radius: 35,
            fill: 'gray',
        });

        this.rock4 = new Konva.Circle({
            x: STAGE_WIDTH / 2 + 145,
            y: STAGE_HEIGHT / 2 - 110,
            radius: 35,
            fill: 'gray',
        });

        this.rock5 = new Konva.Circle({
            x: STAGE_WIDTH / 2 + 180,
            y: STAGE_HEIGHT / 2 + 50,
            radius: 35,
            fill: 'gray',
        });

        // end of all the rocks

        // click on rock to mark it as "selected"
        this.rock1.on('click', () => {
            //
            let newFill = this.rock1.fill() === 'red' ? 'gray' : 'red'
            // set a flag for when it's been selected/unselected
            if(this.selected[0] == 0) // unselected -> mark as selected
                this.selected[0] = 1;
            else // was selected (1) -> mark unselected
                this.selected[0] = 0;

            this.rock1.fill(newFill);
            this.group.add(this.rock1);
        });
        this.rock2.on('click', () => {
            //
            let newFill = this.rock2.fill() === 'red' ? 'gray' : 'red'
            // set a flag for when it's been selected/unselected
            if(this.selected[1] == 0) // unselected -> mark as selected
                this.selected[1] = 1;
            else // was selected (1) -> mark unselected
                this.selected[1] = 0;

            this.rock2.fill(newFill);
            this.group.add(this.rock2);
        });
        this.rock3.on('click', () => {
            //
            let newFill = this.rock3.fill() === 'red' ? 'gray' : 'red'
            // set a flag for when it's been selected/unselected
            if(this.selected[2] == 0) // unselected -> mark as selected
                this.selected[2] = 1;
            else // was selected (1) -> mark unselected
                this.selected[2] = 0;

            this.rock3.fill(newFill);
            this.group.add(this.rock3);
        });
        this.rock4.on('click', () => {
            //
            let newFill = this.rock4.fill() === 'red' ? 'gray' : 'red'
            // set a flag for when it's been selected/unselected
            if(this.selected[3] == 0) // unselected -> mark as selected
                this.selected[3] = 1;
            else // was selected (1) -> mark unselected
                this.selected[3] = 0;

            this.rock4.fill(newFill);
            this.group.add(this.rock4);
        });
        this.rock5.on('click', () => {
            //
            let newFill = this.rock5.fill() === 'red' ? 'gray' : 'red'
            // set a flag for when it's been selected/unselected
            if(this.selected[4] == 0) // unselected -> mark as selected
                this.selected[4] = 1;
            else // was selected (1) -> mark unselected
                this.selected[4] = 0;

            this.rock5.fill(newFill);
            this.group.add(this.rock5);
        });
        
        //his.group.add(simpleText);
        this.group.add(this.rock1);
        this.group.add(this.rock2);
        this.group.add(this.rock3);
        this.group.add(this.rock4);
        this.group.add(this.rock5);
    }

    /**
     * Show the screen
     */
    show(): void {
        this.group.visible(true);
        this.group.getLayer()?.draw();
    }

    /**
     * show the screen with rocks
     */
    /*
    showProblem(): void{
        this.group.visible(true);
        this.group.getLayer()?.draw();
    }
    */ 

    /**
     * Hide the screen
     */
    hide(): void {
        this.group.visible(false);
        this.group.getLayer()?.draw();
    }

    getGroup(): Konva.Group {
        return this.group;
    }

    // return list of what rocks have been selected
    getSelected(): number[]{
        return this.selected;
    }
}
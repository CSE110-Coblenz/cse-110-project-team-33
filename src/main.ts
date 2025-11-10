import Konva from "konva";
import { STAGE_WIDTH } from "./constants.ts"
import { STAGE_HEIGHT } from "./constants.ts"

import { Level2Controller } from "./levels/level2/Level2Controller.ts"

class App {
	private stage: Konva.Stage;
	private layer: Konva.Layer;

	private level2Controller: Level2Controller;

    constructor(container: string) {
		this.stage = new Konva.Stage({
			container: container,
			width: STAGE_WIDTH,
			height: STAGE_HEIGHT,
		});
		this.layer = new Konva.Layer();
		this.stage.add(this.layer);

		
        this.level2Controller = new Level2Controller();
        this.layer.add(this.level2Controller.getView().getGroup());

        /* DEBUG, should be handled by menu logic */
        this.level2Controller.setActive();
        this.level2Controller.getView().show();
        
    }
}

new App("container");

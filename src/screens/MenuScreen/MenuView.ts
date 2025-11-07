import Konva from "konva";
import type { View } from "../../types.ts";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../constants.ts";


/**
 * MenuScreenView - Renders the menu screen
 */
export class MenuView implements View {
	private group: Konva.Group;

	constructor(onClick: () => void) {
		
		this.group = new Konva.Group({ visible: true });


		const startButtonGroup = new Konva.Group();

		const bg = new Konva.Rect({
			x: 0,
			y: 0,
			width: STAGE_WIDTH,
			height: STAGE_HEIGHT,
			fill: "#E6CEB1", 
		});
		this.group.add(bg);


		Konva.Image.fromURL("/res/start.png", (image) => {
			//image.on("click", onClick);
			image.x(STAGE_WIDTH / 2 - image.width() / 2);
			image.y(75);	
			startButtonGroup.add(image);
			//startButtonGroup.getLayer()?.draw();	
		});

		Konva.Image.fromURL("/res/load.png", (image) => {
			image.x(STAGE_WIDTH / 2 - image.width() / 2);
			image.y(STAGE_HEIGHT/2 - image.height()/2);
			this.group.add(image);	
		});

		Konva.Image.fromURL("/res/exit.png", (image) => {
			image.x(STAGE_WIDTH / 2 - image.width() / 2);
			image.y(STAGE_HEIGHT - 75 - image.height());
			this.group.add(image);	
		});
		
		startButtonGroup.on("click", onClick);
		this.group.add(startButtonGroup);
		this.group.getLayer()?.draw();
	}

	/**
	 * Show the screen
	 */
	show(): void {
		this.group.visible(true);
		this.group.getLayer()?.draw();
	}

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
}

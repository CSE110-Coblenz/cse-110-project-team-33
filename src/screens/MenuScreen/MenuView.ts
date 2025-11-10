import Konva from "konva";
import type { View } from "../../types.ts";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../constants.ts";


/**
 * MenuScreenView - Renders the menu screen
 */
export class MenuView implements View {
	private group: Konva.Group;

	constructor(onStartClick: () => void, 
				onLoadClick: () => void,
    			onExitClick: () => void) {
		
		this.group = new Konva.Group({ visible: true });

		const bg = new Konva.Rect({
			x: 0,
			y: 0,
			width: STAGE_WIDTH,
			height: STAGE_HEIGHT,
			fill: "#E6CEB1", 
		});
		this.group.add(bg);


		Konva.Image.fromURL("/res/start.png", (image) => {
			image.x(STAGE_WIDTH / 2 - image.width() / 2);
			image.y(75);	
			image.on("click", onStartClick);
			this.group.add(image);
		});

		Konva.Image.fromURL("/res/load.png", (image) => {
			image.x(STAGE_WIDTH / 2 - image.width() / 2);
			image.y(STAGE_HEIGHT/2 - image.height()/2);
			image.on("click", onLoadClick);
			this.group.add(image);	
		});

		Konva.Image.fromURL("/res/exit.png", (image) => {
			image.x(STAGE_WIDTH / 2 - image.width() / 2);
			image.y(STAGE_HEIGHT - 75 - image.height());
			image.on("click", onExitClick);
			this.group.add(image);	
		});
		
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

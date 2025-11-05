import Konva from "konva";
import type { View } from "../../types.ts";
import { STAGE_WIDTH } from "../../constants.ts";


/**
 * MenuScreenView - Renders the menu screen
 */
export class MenuView implements View {
	private group: Konva.Group;

	constructor(onClick: () => void) {
		this.group = new Konva.Group({ visible: true });

		const startButtonGroup = new Konva.Group();


		Konva.Image.fromURL("/res/start.png", (image) => {
			//image.on("click", onClick);
			image.x(STAGE_WIDTH / 2 - image.width() / 2);
			image.y(250);	
			startButtonGroup.add(image);
			startButtonGroup.getLayer()?.draw();	
		  });
		
		startButtonGroup.on("click", onClick);
		this.group.add(startButtonGroup);
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

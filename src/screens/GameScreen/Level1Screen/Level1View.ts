import Konva from "konva";
import type { View } from "../../../types.ts";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../../constants.ts";

export class Level1View implements View {
    private group: Konva.Group;
    private backgroundGroup: Konva.Group;
    private textInputGroup: Konva.Group;
    private problemText: Konva.Text;
    private option1Text: Konva.Text;
    private option2Text: Konva.Text;
    private option3Text: Konva.Text;

    constructor() {
		this.group = new Konva.Group({ visible: false });
        this.backgroundGroup = new Konva.Group();
        this.textInputGroup = new Konva.Group();
        
		const background = new Konva.Rect({
			x: 0,
			y: 0,
			width: STAGE_WIDTH,
			height: STAGE_HEIGHT,
			fill: "#D6E8FF", // Sky blue
		});
		this.backgroundGroup.add(background);

        Konva.Image.fromURL("/res/pyramid.png", (image) => {
            image.width(STAGE_WIDTH).height(STAGE_HEIGHT / 2)
			this.backgroundGroup.add(image);
		});

        Konva.Image.fromURL("/res/door.png", (image) => {
            image.x(STAGE_WIDTH / 2 - 30).y(STAGE_HEIGHT / 2 - 125)
            image.width(85).height(150)
			this.backgroundGroup.add(image);
		});

        Konva.Image.fromURL("/res/pillar_1.png", (image) => {
            image.x(STAGE_WIDTH / 2 - 105).y(STAGE_HEIGHT / 2 - 150);
            image.height(150).width(75);
			this.backgroundGroup.add(image);
		});

        Konva.Image.fromURL("/res/pillar_2.png", (image) => {
            image.x(STAGE_WIDTH / 2 - 30).y(STAGE_HEIGHT / 2 - 175)
            image.height(175).width(150);
			this.backgroundGroup.add(image);
		});

        Konva.Image.fromURL("/res/ground.png", (image) => {
            image.x(0).y(STAGE_HEIGHT / 2)
            image.height(STAGE_HEIGHT / 2).width(STAGE_WIDTH);
			this.backgroundGroup.add(image);
		});

        this.problemText = new Konva.Text({ // NEW: Create and store the node
            x: 25,
            y: STAGE_HEIGHT - 200,
            text: "", // Start with an empty string or placeholder
            fontSize: 24,
            fontFamily: "Arial",
            fill: "black",
        });
        this.textInputGroup.add(this.problemText);

        this.option1Text = new Konva.Text({ // NEW: Create and store the node
            x: STAGE_WIDTH / 2 - 200,
            y: STAGE_HEIGHT - 100,
            text: "1", // Start with an empty string or placeholder
            fontSize: 24,
            fontFamily: "Arial",
            fill: "black",
        });
        this.textInputGroup.add(this.option1Text);

        this.option2Text = new Konva.Text({ // NEW: Create and store the node
            x: STAGE_WIDTH / 2,
            y: STAGE_HEIGHT - 100,
            text: "2", // Start with an empty string or placeholder
            fontSize: 24,
            fontFamily: "Arial",
            fill: "black",
        });
        this.textInputGroup.add(this.option2Text);

        this.option3Text = new Konva.Text({ // NEW: Create and store the node
            x: STAGE_WIDTH / 2 + 200,
            y: STAGE_HEIGHT - 100,
            text: "3", // Start with an empty string or placeholder
            fontSize: 24,
            fontFamily: "Arial",
            fill: "black",
        });
        this.textInputGroup.add(this.option3Text);

        this.group.add(this.backgroundGroup);
        this.group.add(this.textInputGroup);
    }

    setProblemText(problemText: string) : void {
        this.problemText.text(problemText);
        this.group.getLayer()?.draw();
    }

    setOption1Text(option1Text: string) : void {
        this.option1Text.text(option1Text);
        this.group.getLayer()?.draw();
    }

    setOption2Text(option2Text: string) : void {
        this.option2Text.text(option2Text);
        this.group.getLayer()?.draw();
    }

    setOption3Text(option3Text: string) : void {
        this.option3Text.text(option3Text);
        this.group.getLayer()?.draw();
    }

    getOption1TextNode(): Konva.Text {
        return this.option1Text;
    }

    getOption2TextNode(): Konva.Text {
        return this.option2Text;
    }

    getOption3TextNode(): Konva.Text {
        return this.option3Text;
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
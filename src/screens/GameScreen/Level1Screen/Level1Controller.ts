import { Level1Model } from "./Level1Model.ts";
import { Level1View } from "./Level1View.ts";
import { ScreenController } from "../../../types.ts";
import type { ScreenSwitcher } from "../../../types.ts";
import Konva from "konva";

export class Level1Controller extends ScreenController {
    private screenSwitcher: ScreenSwitcher;
    private model: Level1Model;
    private view: Level1View;
    private problemType: number;
    private correctAnswerValue: number; // Store the actual answer
    
    // The option values are still set up in the constructor below
    private option1: number;
    private option2: number;
    private option3: number;

    constructor(screenSwitcher: ScreenSwitcher) {
        super();
        this.screenSwitcher = screenSwitcher;

        this.model = new Level1Model();
        this.view = new Level1View();

        this.problemType = this.model.getProblemType();
        this.correctAnswerValue = this.model.getAnswer(); // Get the correct answer from the model

        console.log(this.problemType);
        if (this.problemType == 1 || this.problemType == 2) {
            this.view.setProblemText("What is the length of the fallen pillar?");
        } else if (this.problemType == 3) {
            this.view.setProblemText("What is the distance between the pillars?");
        }

        this.option1 = this.model.getSOH();
        this.view.setOption1Text((this.option1).toString());

        this.option2 = this.model.getCAH();
        this.view.setOption2Text((this.option2).toString());

        this.option3 = this.model.getTOA();
        this.view.setOption3Text((this.option3).toString());
        
        this.setupClickListeners();

        this.view.show();
    }
    
    private setupClickListeners(): void {
        const option1Node = this.view.getOption1TextNode();
        const option2Node = this.view.getOption2TextNode();
        const option3Node = this.view.getOption3TextNode();

        // Add a pointer cursor to indicate clickability
        this.addClickBehavior(option1Node, this.option1);
        this.addClickBehavior(option2Node, this.option2);
        this.addClickBehavior(option3Node, this.option3);
    }
    
    private addClickBehavior(node: Konva.Text, optionValue: number): void {
        node.on("mouseover", () => {
            document.body.style.cursor = "pointer";
        });

        node.on("mouseout", () => {
            document.body.style.cursor = "default";
        });
        
        node.on("click", () => {
            // Check if the clicked option's value matches the correct answer
            if (optionValue === this.correctAnswerValue) {
                this.handleCorrectAnswer(node);
            } else {
                this.handleWrongAnswer(node);
            }
        });
    }

    private handleCorrectAnswer(node: Konva.Text): void {
        node.text("Correct!"); // Change the text
        node.fill("green"); // Change the color
        this.model.setIsCompleted(true); // Mark the level as complete
        
        // Remove click handlers from all options to prevent further clicking
        this.view.getOption1TextNode().off("click");
        this.view.getOption2TextNode().off("click");
        this.view.getOption3TextNode().off("click");
        
        this.view.getGroup().getLayer()?.draw(); // Redraw the stage
        
    }
	
    private handleWrongAnswer(node: Konva.Text): void {
        // Example: Flash red briefly, then reset the text
        const originalText = node.text();
        node.fill("red");
        this.view.getGroup().getLayer()?.draw();

        setTimeout(() => {
            node.fill("black");
            this.view.getGroup().getLayer()?.draw();
        }, 500);
    }
    
    getView(): Level1View {
        return this.view;
    }
}
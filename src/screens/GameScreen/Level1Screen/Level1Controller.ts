import Konva from "konva";
import { ScreenController } from "../../../types.ts";
import { PlayerDataManager } from "../../../managers/GameStateManager.ts";
import { Level1Model } from "./Level1Model.ts";
import { Level1View } from "./Level1View.ts";
import { TrigUtil } from "../../../utilities/TrigUtil.ts"
import type { ScreenSwitcher } from "../../../types.ts";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../../constants.ts";

export class Level1Controller extends ScreenController {
    private screenSwitcher: ScreenSwitcher;
    private model: Level1Model;
    private view: Level1View;

    // Trig
    private trigUtil: TrigUtil;

    private problemType: number;
    private option1: number;
    private option2: number;
    private option3: number;
    private correctAnswerValue: number;

    constructor(screenSwitcher: ScreenSwitcher,  playerDataManager: PlayerDataManager) {
        super();
        this.screenSwitcher = screenSwitcher;
        this.model = new Level1Model(playerDataManager);
        this.view = new Level1View();

        this.view.setCoins(this.model.getCoins());

        // Trig
        this.trigUtil = new TrigUtil();

        this.problemType = this.model.getProblemType();
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

        this.correctAnswerValue = this.model.getAnswer();

        this.initialize();
    }

    private async initialize(): Promise<void> {
        await this.view.waitForLoadBackground();
        this.setupClickListeners();
        this.setupMoveListeners();
    }
    
    private setupClickListeners(): void {
        const option1Node = this.view.getOption1TextNode();
        const option2Node = this.view.getOption2TextNode();
        const option3Node = this.view.getOption3TextNode();
        const backpackNode = this.view.getBackpackNode();
        const doorNode = this.view.getDoorNode();

        this.addClickBehavior(option1Node, this.option1, "mc");
        this.addClickBehavior(option2Node, this.option2, "mc");
        this.addClickBehavior(option3Node, this.option3, "mc");
        this.addClickBehavior(backpackNode, undefined, "backpack");
        this.addClickBehavior(doorNode, undefined, "door");
    }
    
    private addClickBehavior(node: any, optionValue?: number, action?: string): void {
        node.on("mouseover", () => {
            document.body.style.cursor = "pointer";
        });

        node.on("mouseout", () => {
            document.body.style.cursor = "default";
        });
        
        node.on("click", () => {
            if (action == "backpack") {
                this.screenSwitcher.switchToScreen({ type: "inventory" });
            }

            if (action == "door") {
                if (this.model.getSuccess() == true) {
                    this.screenSwitcher.switchToScreen({ type: "level2" });
                }
            }
            
            // Check if the clicked option's value matches the correct answer
            if (action == "mc") {
                if (optionValue === this.correctAnswerValue) {
                    this.handleCorrectAnswer(node);
                    this.view.animateMovePillar();
                    this.model.addToCoins(100);
                    this.view.setCoins(this.model.getCoins() + 100);
                } else {
                    this.handleWrongAnswer(node);
                }
            }
        });
    }

    private setupMoveListeners(): void {
        const levelClueNode = this.view.getLevelClueNode();
        const mgClueNode = this.view.getMGClueNode();
        const crystalNode = this.view.getCrystalNode();

        this.addMoveBehavior(levelClueNode, "level");
        this.addMoveBehavior(mgClueNode, "mg");
        this.addMoveBehavior(crystalNode, "crystal");
    }
    
    private addMoveBehavior(node: Konva.Image, action: string): void {
        node.draggable(true);
        
        // Constrain dragging within stage boundaries
        // Constraint function that executes during every step of a drag operation
        // Modify the node's position before it is officially rendered
        node.dragBoundFunc(function(pos) {
            const nodeWidth = node.width();
            const nodeHeight = node.height();
            
            // Calculate boundaries
            const minX = 0;
            const minY = 0;
            const maxX = STAGE_WIDTH - nodeWidth;
            const maxY = STAGE_HEIGHT - nodeHeight;
            
            // Constrain position
            const newX = Math.max(minX, Math.min(pos.x, maxX));
            const newY = Math.max(minY, Math.min(pos.y, maxY));
            
            return {
                x: newX,
                y: newY
            };
        });
        
        node.on("mouseover", () => {
            document.body.style.cursor = "grab";
        });
        
        node.on("mouseout", () => {
            document.body.style.cursor = "default";
        });
        
        node.on("dragstart", () => {
            document.body.style.cursor = "grabbing";
        });

        node.on("dragend", () => {
            document.body.style.cursor = "grab";
            
            const pos = node.position();
            
            // Add to inventory
            if (pos.x <= 50 && pos.y <= 50) {
                if (action === "level") {
                    if (this.problemType == 1 || this.problemType == 2) {
                        this.model.addToInventory({
                        name: "levelClue",
                        image: "pillar_outline.png",
                        width: 400,
                        height: 400,
                        text1: String(this.model.getAngle() + "º"),
                        text1X: STAGE_WIDTH / 2 + 120,
                        text1Y: STAGE_HEIGHT / 2 + 110,
                        text2: String(this.model.getOpposite()),
                        text2X: STAGE_WIDTH / 2 + 10,
                        text2Y: STAGE_HEIGHT / 2 + 10,
                        text3: String(this.model.getAdjacent()),
                        text3X: STAGE_WIDTH / 2 + 100,
                        text3Y: STAGE_HEIGHT / 2 + 160});
                    } else {
                        this.model.addToInventory({
                        name: "levelClue",
                        image: "pillar_outline.png",
                        width: 400,
                        height: 400,
                        text1: String(this.model.getAngle() + "º"),
                        text1X: STAGE_WIDTH / 2 + 120,
                        text1Y: STAGE_HEIGHT / 2 + 110,
                        text2: String(this.model.getOpposite()),
                        text2X: STAGE_WIDTH / 2 + 10,
                        text2Y: STAGE_HEIGHT / 2 + 10,
                        text3: String(this.model.getHypotenuse()),
                        text3X: STAGE_WIDTH / 2 + 80,
                        text3Y: STAGE_HEIGHT / 2 + 20});
                    }
                } else if (action === "mg") {
                    this.model.addToInventory({
                        name: "mgClue",
                        image: "inventory_paper.png",
                        width: 500,
                        height: 300,
                        text1: String(this.trigUtil.randomDegree() + "º"),
                        text1X: STAGE_WIDTH / 2 - 50,
                        text1Y: STAGE_HEIGHT / 2 - 10,
                        text2: String(this.trigUtil.randomDegree() + "º"),
                        text2X: STAGE_WIDTH / 2 + 80,
                        text2Y: STAGE_HEIGHT / 2 - 10,
                        text3: String(this.trigUtil.randomDegree() + "º"),
                        text3X: STAGE_WIDTH / 2 + 200,
                        text3Y: STAGE_HEIGHT / 2 - 10});
                } else if (action == "crystal") {
                    this.model.addToInventory({
                        name: "crystal",
                        image: "crystal.png",
                        width: 300,
                        height: 350,
                        text1: this.trigUtil.randomTrigCoordinate(),
                        text1X: STAGE_WIDTH / 2 + 20,
                        text1Y: STAGE_HEIGHT / 2 - 10,
                    });
                }
                
                // Remove the node from the stage
                node.destroy();
                node.getLayer()?.batchDraw();
            }
        });
    }

    private handleCorrectAnswer(node: Konva.Text): void {
        node.fill("green"); // Change text color to green
        
        // Remove click handlers from all options to prevent further clicking
        this.view.getOption1TextNode().off("click");
        this.view.getOption2TextNode().off("click");
        this.view.getOption3TextNode().off("click");

        this.model.setSuccess(true); // Mark the level as complete
        
        this.view.getGroup().getLayer()?.draw(); // Redraw the stage
    }
	
    private handleWrongAnswer(node: Konva.Text): void {
        node.fill("red"); // Change text color to red
        this.view.getGroup().getLayer()?.draw();

        // After 0.5 seconds, change text color back to black
        setTimeout(() => {
            node.fill("black");
            this.view.getGroup().getLayer()?.draw();
        }, 500);
    }
    
    getView(): Level1View {
        return this.view;
    }
}
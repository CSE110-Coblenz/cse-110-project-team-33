import { Level4Model } from "./Level4Model.ts";
import type { Target } from "./Level4Model.ts";
import { Level4View } from "./Level4View.ts";
import { ScreenController } from "../../../types.ts";
import type { ScreenSwitcher } from "../../../types.ts";
import { STAGE_HEIGHT, STAGE_WIDTH } from "../../../constants.ts";

export class Level4Controller extends ScreenController {
    private screenSwitcher: ScreenSwitcher;
    private model: Level4Model;
    private view: Level4View;


    private targets: Target[] = [
        { label: "0°", angle: 0 },
        { label: "45°", angle: 45 },
        { label: "90°", angle: 90 },
        { label: "135°", angle: 135 },
        { label: "180°", angle: 180 },
    ];


    constructor(screenSwitcher: ScreenSwitcher) {
        super();
        this.screenSwitcher = screenSwitcher;

        // Initialize model and view
        this.model = new Level4Model();
        this.model.initTargets(this.targets);

        this.view = new Level4View();

        // Set center of the circle in the model
        this.model.setCenter(this.view.centerX, this.view.centerY);

        // Draw the circle and axes
        this.view.drawBase();

        // Create draggable labels for each target
        this.model.items.forEach((item, i) => {
            // Initial label positions (below the circle)
            const labelNode = this.view.createDraggableLabel(
                item.label,
                this.model.centerX - 50 + i * 60,
                this.model.centerY + this.model.radius + 50
            );

            labelNode.on("dragend", () => {
                // Check if label is close enough to its target radial line
                const placed = this.model.checkPlacement(labelNode.x(), labelNode.y(), item.label, 25);

                if (placed) {
                    const dx = labelNode.x() - this.model.centerX;
                    const dy = labelNode.y() - this.model.centerY;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const ratio = this.model.radius / distance;

                    // Snap label to circle radius along its radial line
                    labelNode.position({
                        x: this.model.centerX + dx * ratio,
                        y: this.model.centerY + dy * ratio
                    });

                    this.view.updateLabelColor(labelNode, true);
                    this.model.markPlaced(item.label);
                } else {
                    this.view.updateLabelColor(labelNode, false);
                }

                // Redraw the layer to reflect color updates
                this.view.getLayer().batchDraw();

            });
        });


    }

    /**
	 * Get the view group
	 */
    getView(): Level4View {
        return this.view;
    }
}

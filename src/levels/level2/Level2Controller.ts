import { Level2Model } from "./Level2Model.ts"
import { Level2View } from "./Level2View.ts"

import { MainView } from "./Views/MainView.ts"
import { SundialView } from "./Views/SundialView.ts"
import { InventoryView } from "./Views/InventoryView.ts"


export class Level2Controller {
    private model: Level2Model;
    private levelView: Level2View;

    private mainView: MainView;
    private inventoryView: InventoryView;
    // One for each sundial
    private sundial1View: SundialView;
    private sundial2View: SundialView;
    private sundial3View: SundialView;

    constructor() {
        this.model      = new Level2Model();
        this.levelView  = new Level2View();
        this.mainView   = new MainView();

        this.sundial1View = new SundialView();
        this.sundial2View = new SundialView();
        this.sundial3View = new SundialView();

        // Probably not ideal, but user input does fall under the responsibility
        // of the Controller. We pass this off to a callback for each sundial
        // and handle it there.
        this.mainView.sundial1.getGroup().listening(true);
        this.mainView.getSundial(1).on("click", (evt) => this.handleSundialClick(evt));
        this.mainView.getSundial(2).on("click", (evt) => this.handleSundialClick(evt));
        this.mainView.getSundial(3).on("click", (evt) => this.handleSundialClick(evt));

        this.sundial1View.getReturnArrow().on("click", () => this.handleReturnToLevelView());
        this.sundial2View.getReturnArrow().on("click", () => this.handleReturnToLevelView());
        this.sundial3View.getReturnArrow().on("click", () => this.handleReturnToLevelView());

        this.levelView.addToGroup(this.mainView.getGroup());
        this.levelView.addToGroup(this.sundial1View.getGroup());
        this.levelView.addToGroup(this.sundial2View.getGroup());
        this.levelView.addToGroup(this.sundial3View.getGroup());
        this.model.resetLevel();

        this.mainView.show();
    }

    setActive(): void {
        this.levelView.show();
    }

    getView(): Level2View {
        return this.levelView;
    }

    handleSundialClick(evt): void {
        const target = evt.target;
        switch(target.name()) {
            case "sundial1":
                this.mainView.hide();
                this.sundial1View.show();
                break;
            case "sundial2":
                this.mainView.hide();
                this.sundial2View.show();
                break;
            case "sundial3":
                this.mainView.hide();
                this.sundial3View.show();
                break;
            default:
                break;
        }        
    }

    handleReturnToLevelView(): void {
        this.sundial1View.hide();
        this.sundial2View.hide();
        this.sundial3View.hide();
        this.mainView.show();
    }
}

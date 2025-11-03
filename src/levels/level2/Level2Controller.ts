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

        this.mainView.sundial1.getGroup().listening(true);
        this.mainView.sundial1.getGroup().on("click", () => {
           this.mainView.hide();
           this.sundial1View.show();
        });


        this.levelView.addToGroup(this.mainView.getGroup());
        this.levelView.addToGroup(this.sundial1View.getGroup());
        this.model.resetLevel();
/*
        this.levelView.getGroup().listening(true);
        this.mainView.getGroup().listening(true);
        this.mainView.getGroup().on("click", function(evt) {
            target = evt.target;
            switch(target.getName()) {
                case "sundial1":
                    this.mainView.hide();
                    break;
                default:
                    alert("placeholder poopoo");
                    break;
            }
        });
*/
        this.mainView.show();
    }

    setActive(): void {
        this.levelView.show();
        
    }

    getView(): Level2View {
        return this.levelView;
    }
}

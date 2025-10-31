import { Level2Model } from "./Level2Model.ts"
import { Level2View } from "./Level2View.ts"

export class Level2Controller {
    private model: Level2Model;
    private view: Level2View;

    constructor() {
        this.model  = new Level2Model();
        this.view   = new Level2View();
        this.model.resetLevel();
    }

    setActive(): void {
        this.view.show();
    }

    getView(): Level2View {
        return this.view;
    }
}

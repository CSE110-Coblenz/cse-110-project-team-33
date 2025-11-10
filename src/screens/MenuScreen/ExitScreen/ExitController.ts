import { ScreenController } from "../../../types.ts";
import type { ScreenSwitcher } from "../../../types.ts";
import { ExitView } from "./ExitView.ts";

/**
 * ExitController - Handles exit screen interactions
 */
export class ExitController extends ScreenController {
  private view: ExitView;
  private screenSwitcher: ScreenSwitcher;

  constructor(screenSwitcher: ScreenSwitcher) {
    super();
    this.screenSwitcher = screenSwitcher;
    this.view = new ExitView(() => this.handleYesClick(), 
            () => this.handleNoClick());
  }

  /** Handle back to menu click */
  private handleNoClick(): void {
    this.screenSwitcher.switchToScreen({ type: "menu" });
  }

  /** Handle exit game click 
   * I dont think this will actually work? 
  */
  private handleYesClick(): void {
    window.close();
  }

  getView(): ExitView {
    return this.view;
  }
}

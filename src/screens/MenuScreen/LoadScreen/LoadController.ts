import { ScreenController } from "../../../types.ts";
import type { ScreenSwitcher } from "../../../types.ts";
import { LoadView } from "./LoadView.ts";

/**
 * ExitController - Handles exit screen interactions
 */
export class LoadController extends ScreenController {
  private view: LoadView;
  private screenSwitcher: ScreenSwitcher;

  constructor(screenSwitcher: ScreenSwitcher) {
    super();
    this.screenSwitcher = screenSwitcher;
    this.view = new LoadView();
  }


  getView(): LoadView {
    return this.view;
  }
}

import * as PIXI from 'pixi.js';

import {View} from '../../../framework/view';
import {Size} from '../../../framework/size';
import {HintView} from "./hint-view";
import {Point} from "pixi.js";

export class HintColumnView extends View {
  private _graphics: PIXI.Graphics;
  private _hintViews: HintView[];

  public size = new Size(32, 100);
  private text: PIXI.Text;

  constructor() {
    super();
  }

  public init() {
    this._hintViews = [];

    this._graphics = new PIXI.Graphics();
    this._graphics.beginFill(0xcccccc);
    this._graphics.drawRect(0, 0, this.size.width, this.size.height);

    this.addChild(this._graphics);

    for (let i = 0; i < 3; i++) {
      const hintView = new HintView();
      hintView.init();
      hintView.setText(i);
      hintView.position = new Point(0, this.size.height - hintView.size.height * (i + 1));
      this.addChild(hintView);

      this._hintViews.push(hintView);
    }

  }
}

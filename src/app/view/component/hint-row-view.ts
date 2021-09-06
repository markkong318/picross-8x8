import * as PIXI from 'pixi.js';

import {View} from '../../../framework/view';
import {Size} from '../../../framework/size';
import {HintView} from "./hint-view";
import {Point} from "pixi.js";

export class HintRowView extends View {
  private _graphics: PIXI.Graphics;
  private _hintViews: HintView[];

  public size = new Size(150, 32);
  private radius: number = 10;

  private text: PIXI.Text;

  constructor() {
    super();
  }

  public init() {
    this._hintViews = [];

    this._graphics = new PIXI.Graphics();

    this.addChild(this._graphics);

    for (let i = 0; i < 3; i++) {
      const hintView = new HintView();
      hintView.init();
      hintView.setText(i);
      hintView.position = new Point(
        this.size.width - hintView.size.width * (i + 1),
        (this.size.height - hintView.size.height) / 2,
      );
      this.addChild(hintView);

      this._hintViews.push(hintView);
    }
  }

  drawOdd() {
    this._graphics.beginFill(0xffffff);
    this._graphics.drawRoundedRect(0, 0, this.size.width + this.radius, this.size.height, this.radius);
  }

  drawEven() {
    this._graphics.beginFill(0xf1f2f3);
    this._graphics.drawRoundedRect(0, 0, this.size.width + this.radius, this.size.height, this.radius);
  }

  drawSelect() {
    this._graphics.beginFill(0x45d4ff);
    this._graphics.drawRoundedRect(0, 0, this.size.width + this.radius, this.size.height, this.radius);
  }
}

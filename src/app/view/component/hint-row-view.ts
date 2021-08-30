import * as PIXI from 'pixi.js';

import {View} from '../../../framework/view';
import {Size} from '../../../framework/size';
import {HintView} from "./hint-view";
import {Point} from "pixi.js";

export class HintRowView extends View {
  private _graphics: PIXI.Graphics;
  private _hintViews: HintView[];

  public size = new Size(100, 32);
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
      hintView.position = new Point(this.size.width - hintView.size.width * (i + 1), 0);
      this.addChild(hintView);

      this._hintViews.push(hintView);
    }

  }
}
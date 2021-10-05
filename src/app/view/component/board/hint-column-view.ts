import * as PIXI from 'pixi.js';

import {View} from '../../../../framework/view';
import {Size} from '../../../../framework/size';
import {HintView} from "./hint-view";
import {Point} from "pixi.js";

export class HintColumnView extends View {
  private graphics: PIXI.Graphics;
  private hintViews: HintView[];

  public size = new Size(32, 150);
  private radius: number = 10;

  private text: PIXI.Text;

  constructor() {
    super();
  }

  public init() {
    this.hintViews = [];

    this.graphics = new PIXI.Graphics();
    this.addChild(this.graphics);

    for (let i = 0; i < 3; i++) {
      const hintView = new HintView();
      hintView.init();
      hintView.setText(i);
      hintView.position = new Point(
        (this.size.width - hintView.size.width) / 2,
        this.size.height - hintView.size.height * (i + 1)
      );
      this.addChild(hintView);

      this.hintViews.push(hintView);
    }
  }

  drawOdd() {
    this.graphics.beginFill(0xffffff);
    this.graphics.drawRoundedRect(0, 0, this.size.width, this.size.height + this.radius, this.radius);
  }

  drawEven() {
    this.graphics.beginFill(0xf1f2f3);
    this.graphics.drawRoundedRect(0, 0, this.size.width, this.size.height + this.radius, this.radius);
  }

  drawSelect() {
    this.graphics.beginFill(0x45d4ff);
    this.graphics.drawRoundedRect(0, 0, this.size.width, this.size.height + this.radius, this.radius);
  }
}

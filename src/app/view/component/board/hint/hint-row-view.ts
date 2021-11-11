import * as PIXI from 'pixi.js';

import {View} from '../../../../../framework/view';
import {Size} from '../../../../../framework/size';
import {HintView} from "./hint-view";
import {Point} from "pixi.js";

export class HintRowView extends View {
  private graphics: PIXI.Graphics;
  private hintViews: HintView[];

  public size = new Size(150, 32);
  private radius: number = 10;

  constructor() {
    super();
  }

  public init() {
    this.graphics = new PIXI.Graphics();
    this.addChild(this.graphics);
  }

  drawOdd() {
    this.graphics.beginFill(0xffffff);
    this.graphics.drawRoundedRect(0, 0, this.size.width + this.radius, this.size.height, this.radius);
  }

  drawEven() {
    this.graphics.beginFill(0xf1f2f3);
    this.graphics.drawRoundedRect(0, 0, this.size.width + this.radius, this.size.height, this.radius);
  }

  drawSelect() {
    this.graphics.beginFill(0x45d4ff);
    this.graphics.drawRoundedRect(0, 0, this.size.width + this.radius, this.size.height, this.radius);
  }

  drawHints(hits: number[]) {
    this.hintViews = [];

    for (let i = 0; i < hits.length; i++) {
      const hintView = new HintView();
      hintView.init();
      hintView.setText(hits[i]);
      hintView.position = new Point(
        this.size.width - hintView.size.width * (hits.length - i),
        (this.size.height - hintView.size.height) / 2,
      );
      this.addChild(hintView);

      this.hintViews.push(hintView);
    }
  }
}

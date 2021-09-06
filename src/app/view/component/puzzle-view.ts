import * as PIXI from 'pixi.js';

import {View} from '../../../framework/view';
import {Size} from '../../../framework/size';

export class PuzzleView extends View {
  private _graphics: PIXI.Graphics;
  private _x: number;
  private _y: number;

  public size = new Size(32, 32);

  constructor() {
    super();
  }

  public init() {
    // this.size = new Size(32, 32);

    this._graphics = new PIXI.Graphics();
    // this._graphics.beginFill(0x656566);
    // this._graphics.drawRect(0, 0, this.size.width, this.size.height);

    this._graphics.beginFill(0x323334);
    this._graphics.drawRoundedRect(1, 1, this.size.width - 2, this.size.height - 2, 5);

    this._graphics.interactive = true;

    this.addChild(this._graphics);

    this.interactive = true;

    this.on('pointertap', this.select);
  }

  drawFilled() {
    this._graphics.beginFill(0x323334);
    this._graphics.drawRoundedRect(1, 1, this.size.width - 2, this.size.height - 2, 5);
  }

  drawEmpty() {
    this._graphics.beginFill(0xffffff);
    this._graphics.drawRoundedRect(1, 1, this.size.width - 2, this.size.height - 2, 5);

    const lineStyle= {
      width: 4,
      color: 0xf68310,
      cap: 'round',
    };

    // @ts-ignore
    this._graphics.lineStyle(lineStyle)
      .moveTo(this.size.width / 2 - this.size.width / 5.5, this.size.height / 2 - this.size.height / 5.5)
      .lineTo(this.size.width / 2 + this.size.width / 5.5, this.size.height / 2 + this.size.height / 5.5);

    // @ts-ignore
    this._graphics.lineStyle(lineStyle)
      .moveTo(this.size.width / 2 + this.size.width / 5.5, this.size.height / 2 - this.size.height / 5.5)
      .lineTo(this.size.width / 2 - this.size.width / 5.5, this.size.height / 2 + this.size.height / 5.5);

  }

  select() {
    console.log('pointer tap');
  }
}

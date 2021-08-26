import * as PIXI from 'pixi.js';

import {View} from '../../../framework/view';
import {Size} from '../../../framework/size';

export class TileView extends View {
  private _graphics: PIXI.Graphics;

  public size = new Size(32, 32);

  constructor() {
    super();
  }

  public init() {
    // this.size = new Size(32, 32);

    this._graphics = new PIXI.Graphics();
    this._graphics.beginFill(0xffffff);
    this._graphics.drawRect(0, 0, this.size.width, this.size.height);

    this._graphics.beginFill(0x888888);
    this._graphics.drawRoundedRect(1, 1, this.size.width - 2, this.size.height - 2, 5);

    this._graphics.interactive = true;

    this.addChild(this._graphics);

    this.interactive = true;

    this.on('pointertap', this.pointerTap);
  }

  pointerTap() {
    console.log('pointer tap');
  }
}

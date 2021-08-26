import * as PIXI from 'pixi.js';

import {View} from '../../../framework/view';
import {Size} from '../../../framework/size';

export class BlockView extends View {
  private _graphics: PIXI.Graphics;

  public size = new Size(32, 32);
  private text: PIXI.Text;

  constructor() {
    super();
  }

  public init() {
    this._graphics = new PIXI.Graphics();
    this._graphics.lineStyle(1, 0xD82257, 1);
    this._graphics.drawRect(0, 0, this.size.width, this.size.height);

    this.addChild(this._graphics);

    this.text = new PIXI.Text('0');
    this.text.anchor.x = 0.5;
    this.text.anchor.y = 0.5;
    this.text.x = this.width / 2;
    this.text.y = this.height / 2;
    this.addChild(this.text)
  }

  public setText(text) {
    this.text.text = text;
  }
}

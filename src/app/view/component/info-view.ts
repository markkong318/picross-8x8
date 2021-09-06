import * as PIXI from 'pixi.js';

import {View} from '../../../framework/view';
import {Size} from '../../../framework/size';

export class InfoView extends View {
  private _graphics: PIXI.Graphics;

  public size = new Size(150 -5 , 150 - 5);
  private titleText: PIXI.Text;

  constructor() {
    super();
  }

  public init() {
    this._graphics = new PIXI.Graphics();
    this.addChild(this._graphics);

    this._graphics.beginFill(0x323334);
    this._graphics.drawRoundedRect(0, 0, this.size.width, this.size.height, 10);

    this._graphics.beginFill(0x000000);
    this._graphics.drawRoundedRect(5, 5,135, 17, 10)

    this.titleText = new PIXI.Text('PICROSS', {
      fontFamily: 'lato',
      fill: ['#ffffff'],
      fontSize: 14,
      letterSpacing: 5,
    });
    this.titleText.anchor.x = 0.5;
    this.titleText.anchor.y = 0.5;
    this.titleText.x = this.width / 2;
    this.titleText.y = 13;
    this.addChild(this.titleText)
  }

}

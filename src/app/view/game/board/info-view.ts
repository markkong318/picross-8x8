import * as PIXI from 'pixi.js';

import {View} from '../../../../framework/view';
import {Size} from '../../../../framework/size';

export class InfoView extends View {
  private graphics: PIXI.Graphics;

  public size = new Size(150 - 5 , 150 - 5);
  private titleText: PIXI.Text;
  private timerText: PIXI.Text;

  constructor() {
    super();
  }

  public init() {
    this.graphics = new PIXI.Graphics();
    this.addChild(this.graphics);

    this.graphics.beginFill(0x323334);
    this.graphics.drawRoundedRect(0, 0, this.size.width, this.size.height, 10);

    this.graphics.beginFill(0x000000);
    this.graphics.drawRoundedRect(5, 5,135, 17, 10)

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

    this.timerText = new PIXI.Text('00:00:00', {
      fontFamily: 'lato',
      fill: ['#ffffff'],
      fontSize: 22,
      letterSpacing: 5,
    });
    this.timerText.anchor.x = 0.5;
    this.timerText.anchor.y = 0.5;
    this.timerText.x = this.width / 2;
    this.timerText.y = 70;
    this.addChild(this.timerText)
  }

}

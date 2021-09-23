import * as PIXI from 'pixi.js';

import {View} from '../../../framework/view';
import {Size} from '../../../framework/size';
import Event from '../../../framework/event';
import {
  EVENT_TOUCH_PUZZLE,
} from '../../util/env';
import Bottle from "../../../framework/bottle";
import {GameModel} from "../../model/game-model";

export class PuzzleView extends View {
  private graphics: PIXI.Graphics;
  private posX: number;
  private posY: number;

  public size = new Size(32, 32);

  private gameModel: GameModel;

  constructor(x: number, y: number) {
    super();

    this.posX = x;
    this.posY = y;
  }

  public init() {
    this.gameModel = Bottle.get('gameModel');

    this.graphics = new PIXI.Graphics();

    this.graphics.beginFill(0x323334);
    this.graphics.drawRoundedRect(1, 1, this.size.width - 2, this.size.height - 2, 5);

    this.graphics.interactive = true;

    this.addChild(this.graphics);

    this.interactive = true;

    this.on('pointerdown', () => {
      this.gameModel.isTouched = true;
      this.touch();
    });

    this.on('pointerup', () => {
      this.gameModel.isTouched = false;
    });
    this.on('pointerover', () => {
      if (!this.gameModel.isTouched) return;
      this.touch();
    });
  }

  drawWhite() {
    this.graphics.beginFill(0xffffff);
    this.graphics.drawRoundedRect(1, 1, this.size.width - 2, this.size.height - 2, 5);
  }

  drawBlack() {
    this.graphics.beginFill(0x323334);
    this.graphics.drawRoundedRect(1, 1, this.size.width - 2, this.size.height - 2, 5);
  }

  drawX() {
    this.graphics.beginFill(0xffffff);
    this.graphics.drawRoundedRect(1, 1, this.size.width - 2, this.size.height - 2, 5);

    const lineStyle= {
      width: 4,
      color: 0xf68310,
      cap: 'round',
    };

    // @ts-ignore
    this.graphics.lineStyle(lineStyle)
      .moveTo(this.size.width / 2 - this.size.width / 5.5, this.size.height / 2 - this.size.height / 5.5)
      .lineTo(this.size.width / 2 + this.size.width / 5.5, this.size.height / 2 + this.size.height / 5.5);

    // @ts-ignore
    this.graphics.lineStyle(lineStyle)
      .moveTo(this.size.width / 2 + this.size.width / 5.5, this.size.height / 2 - this.size.height / 5.5)
      .lineTo(this.size.width / 2 - this.size.width / 5.5, this.size.height / 2 + this.size.height / 5.5);

  }

  touch() {
    Event.emit(EVENT_TOUCH_PUZZLE, this.posX, this.posY);
  }
}

import * as PIXI from 'pixi.js';
import gsap from 'gsap';

import {View} from "../../../framework/view";
import {GameModel} from "../../model/game-model";
import {
  EVENT_PLAYER1_MOVE, EVENT_PLAYER1_TOUCH,
} from "../../util/env";
import Bottle from '../../../framework/bottle';
import Event from "../../../framework/event";
import {InteractionEvent} from "pixi.js";

export class TouchView extends View {
  private _gameModel: GameModel;

  private _graphics: PIXI.Graphics;
  private _y: number = 0;

  constructor() {
    super();
  }

  public init() {
    this._graphics = new PIXI.Graphics();
    this._graphics.beginFill(0x888888);
    this._graphics.drawRect(0, 0, this.size.width, this.size.height);
    this._graphics.interactive = true;

    this.addChild(this._graphics);

    this._graphics
      .on('pointerdown', this.onPointerDown)
      .on('pointermove', this.onPointerMove);
  }

  public onPointerDown(evt: InteractionEvent) {
    Event.emit(EVENT_PLAYER1_TOUCH);
    this._y = null;
  }

  public onPointerMove(evt: InteractionEvent) {
    if (!this._y) {
      this._y = evt.data.global.y;
      return;
    }

    const move = evt.data.global.y - this._y;
    this._y = evt.data.global.y;

    Event.emit(EVENT_PLAYER1_MOVE, move * 1.5);
  }
}

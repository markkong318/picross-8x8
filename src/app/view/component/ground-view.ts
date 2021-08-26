import * as PIXI from 'pixi.js';
import gsap from 'gsap';

import {View} from "../../../framework/view";
import {GameModel} from "../../model/game-model";
import {
  EVENT_PLAYER1_MOVE,
  EVENT_PLAYER1_OUT,
  EVENT_PLAYER2_MOVE,
  EVENT_START_GAME,
} from "../../util/env";
import Bottle from '../../../framework/bottle';
import Event from "../../../framework/event";
import PixiPlugin = gsap.plugins.PixiPlugin;

export class GroundView extends View {
  private _gameModel: GameModel;

  private _graphics: PIXI.Graphics;
  private _player1: PIXI.Sprite;
  private _player2: PIXI.Sprite;
  private _ball: PIXI.Sprite;

  private _active: boolean;

  constructor() {
    super();
  }

  public init() {
    this._graphics = new PIXI.Graphics();

    this._graphics.lineStyle(1, 0xffffff);

    this._graphics.moveTo(0, 0);
    this._graphics.lineTo(this.size.width, 0);

    this._graphics.moveTo(this.size.width, 0);
    this._graphics.lineTo(this.size.width, this.size.height);

    this._graphics.moveTo(this.size.width, this.size.height);
    this._graphics.lineTo(0, this.size.height);

    this._graphics.moveTo(0, this.size.height);
    this._graphics.lineTo(0, 0);

    this._graphics.moveTo(this.size.width / 2, 0);
    this._graphics.drawDashLine(this.size.width / 2, this.size.height, 10, 10);

    this.addChild(this._graphics);

    this._player1 = PIXI.Sprite.from(PIXI.Texture.WHITE);
    this.addChild(this._player1);

    this._player2 = PIXI.Sprite.from(PIXI.Texture.WHITE);
    this.addChild(this._player2);

    this._ball = PIXI.Sprite.from(PIXI.Texture.WHITE);
    this.addChild(this._ball);

    this.initPlayer();
    this.initBall();

    this._active = false;

    Event.on(EVENT_PLAYER1_MOVE, (distance) => {
      if (!this._active) {
        return;
      }
      this.player1Move(distance);
    });

    Event.on(EVENT_PLAYER2_MOVE, (distance) => {
      if (!this._active) {
        return;
      }
      this.player2Move(distance);
    });

    Event.on(EVENT_PLAYER1_OUT, () => {
      this._active = false;
    });

    Event.on(EVENT_START_GAME, () => {
      this.initPlayer();
      this.initBall();
      this._active = true;
    });

    Bottle.set('ballSprite', this._ball);
    Bottle.set('player1Sprite', this._player1);
    Bottle.set('player2Sprite', this._player2);
    Bottle.set('size', this.size);
  }


  public initPlayer() {
    this._player1.width = 8;
    this._player1.height = 40;
    this._player1.anchor.x = 0.5;
    this._player1.anchor.y = 0.5;
    this._player1.x = 20;
    this._player1.y = this._player1.height / 2;

    this._player2.width = 8;
    this._player2.height = 40;
    this._player2.anchor.x = 0.5;
    this._player2.anchor.y = 0.5;
    this._player2.x = this.size.width - 20;
    this._player2.y = this._player2.height / 2;
  }

  public initBall() {
    this._ball.width = 6;
    this._ball.height = 6;
    this._ball.anchor.x = 0.5;
    this._ball.anchor.y = 0.5;
    this._ball.x = this.size.width / 2;
    this._ball.y = this.size.height / 2;
  }

  public player1Move(distance) {
    this._player1.y += distance;

    if (this._player1.y < this._player1.height / 2) {
      this._player1.y = this._player1.height / 2;
    }

    if (this._player1.y > this.size.height - this._player1.height / 2) {
      this._player1.y = this.size.height - this._player1.height / 2;
    }
  }

  public player2Move(distance) {
    this._player2.y += distance;

    if (this._player2.y < this._player2.height / 2) {
      this._player2.y = this._player2.height / 2;
    }

    if (this._player2.y > this.size.height - this._player2.height / 2) {
      this._player2.y = this.size.height - this._player2.height / 2;
    }
  }
}

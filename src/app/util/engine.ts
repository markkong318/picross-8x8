import * as PIXI from 'pixi.js';
import {Size} from '../../framework/size';
import Bottle from '../../framework/bottle';
import Event from '../../framework/event';
import {
  EVENT_PLAYER1_OUT,
  EVENT_PLAYER2_OUT,
  EVENT_START_GAME,
  INIT_SLOPE_ID,
  INIT_SPEED,
  PLAYER1_ID,
  PLAYER2_ID, SPEED_RATE
} from "./env";

export class Engine {
  private _ball: PIXI.Sprite;
  private _player1: PIXI.Sprite;
  private _player2:  PIXI.Sprite;
  private _size: Size;

  private _dx: number;
  private _dy: number;

  private _lastWin: string = PLAYER1_ID;

  private _ticker: PIXI.Ticker;

  private _speed: number = INIT_SPEED;

  private _slopes = [
    0.2679,
    0.5774,
    1,
    1.7321,
    3.7321,
  ];

  private _slopeIdx = 2;

  constructor() {
    this._ball = Bottle.get('ballSprite');
    this._player1 = Bottle.get('player1Sprite');
    this._player2 = Bottle.get('player2Sprite');
    this._size = Bottle.get('size');

    this._ticker = PIXI.Ticker.shared;
    this._ticker.autoStart = false;

    this._ticker.add((delta) => {
      for (let i = 0; i < Math.floor(this._speed); i++) {
        this._ball.x += this._dx;
        this._ball.y += this._dy;

        if (this._ball.x <= 0 || this._ball.x >= this._size.width) {
          this._dx = -this._dx
        }

        if (this._ball.y <= 0 || this._ball.y >= this._size.height) {
          this._dy = -this._dy
        }

        if (this.isCollided(this._player1)) {
          this.updateDirection();
          this.updateSpeed();
          this.updateSlope(this._player1);
          this.updatePositionPatch(this._player1);
        }

        if (this.isCollided(this._player2)) {
          this.updateDirection();
          this.updateSpeed();
          this.updateSlope(this._player2);
          this.updatePositionPatch(this._player2);
        }

        if (this.isOut()) {
          console.log("out");
          break;
        }
      }
    });

    Event.on(EVENT_START_GAME, (playerId) => {
      this.start();
    });
  }

  start() {
    this._speed = INIT_SPEED;
    this._slopeIdx = INIT_SLOPE_ID;

    this._dx = 1 / Math.pow(1 + this._slopes[this._slopeIdx], 0.5);
    this._dy = this._slopes[this._slopeIdx] / Math.pow(1 + this._slopes[this._slopeIdx], 0.5);

    if (this._lastWin === PLAYER2_ID) {
      this._dx = - this._dx;
    }

    this._ticker.start();
  }

  stop() {
    this._ticker.stop();
  }

  isCollided(sprite: PIXI.Sprite) {
    if (this._ball.x - this._ball.width / 2 >= sprite.x - sprite.width / 2 &&
      this._ball.x - this._ball.width / 2 <= sprite.x + sprite.width / 2 &&
      this._ball.y - this._ball.height / 2 >= sprite.y - sprite.height / 2 &&
      this._ball.y - this._ball.height / 2 <= sprite.y + sprite.height / 2) {
      return true;
    }

    if (this._ball.x - this._ball.width / 2 >= sprite.x - sprite.width / 2 &&
      this._ball.x - this._ball.width / 2 <= sprite.x + sprite.width / 2 &&
      this._ball.y + this._ball.height / 2 >= sprite.y - sprite.height / 2 &&
      this._ball.y + this._ball.height / 2 <= sprite.y + sprite.height / 2) {
      return true;
    }

    if (this._ball.x + this._ball.width / 2 >= sprite.x - sprite.width / 2 &&
      this._ball.x + this._ball.width / 2 <= sprite.x + sprite.width / 2 &&
      this._ball.y - this._ball.height / 2 >= sprite.y - sprite.height / 2 &&
      this._ball.y - this._ball.height / 2 <= sprite.y + sprite.height / 2) {
      return true;
    }

    if (this._ball.x + this._ball.width / 2 >= sprite.x - sprite.width / 2 &&
      this._ball.x + this._ball.width / 2 <= sprite.x + sprite.width / 2 &&
      this._ball.y + this._ball.height / 2 >= sprite.y - sprite.height / 2 &&
      this._ball.y + this._ball.height / 2 <= sprite.y + sprite.height / 2) {
      return true;
    }

    return false;
  }

  isOut() {
    if (this._ball.x <= 0) {
      this._lastWin = PLAYER2_ID;
      this.stop();

      Event.emit(EVENT_PLAYER1_OUT);
      return true;
    }

    if (this._ball.x >= this._size.width) {
      this._lastWin = PLAYER1_ID;
      this.stop();

      Event.emit(EVENT_PLAYER2_OUT);
      return true;
    }

    return false;
  }

  updateDirection() {
    this._dx = -this._dx;
  }

  updateSpeed() {
    this._speed += SPEED_RATE;
  }

  updateSlope(player: PIXI.Sprite) {
    if (this._ball.y < player.y - player.height / 6) {
      if (this._dy > 0) {
        this._slopeIdx = --this._slopeIdx < 0 ? 0 : this._slopeIdx;
      } else {
        this._slopeIdx = ++this._slopeIdx > this._slopes.length - 1 ? this._slopes.length - 1 : this._slopeIdx;
      }
    }

    if (this._ball.y > player.y + player.height / 6) {
      if (this._dy > 0) {
        this._slopeIdx = ++this._slopeIdx > this._slopes.length - 1 ? this._slopes.length - 1 : this._slopeIdx;
      } else {
        this._slopeIdx = --this._slopeIdx < 0 ? 0 : this._slopeIdx;
      }
    }

    this._dx = 1 / Math.pow(1 + this._slopes[this._slopeIdx], 0.5) * Math.sign(this._dx);
    this._dy = this._slopes[this._slopeIdx] / Math.pow(1 + this._slopes[this._slopeIdx], 0.5) * Math.sign(this._dy);
  }

  updatePositionPatch(player: PIXI.Sprite) {
    if (player === this._player1) {
      this._ball.x = this._player1.x + this._player1.width / 2 + this._ball.width / 2;
    }

    if (player === this._player2) {
      this._ball.x = this._player2.x - this._player1.width / 2 - this._ball.width / 2;
    }
  }

  getDx() {
    return this._dx;
  }

  getDy() {
    return this._dy;
  }
}

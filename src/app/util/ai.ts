import * as PIXI from 'pixi.js';
import gsap from 'gsap';

import Bottle from '../../framework/bottle';
import Event from '../../framework/event';
import {
  AI_ACTIVE_SAMPLE_RATE, AI_SLEEP_SAMPLE_RATE,
  EVENT_PLAYER2_MOVE,
} from "./env";
import {Engine} from "./engine";

export class Ai {
  private _ball: PIXI.Sprite;
  private _player:  PIXI.Sprite;
  private _engine: Engine;

  private _sample: number;

  private _sampleMax: number;

  private _timeline: gsap.core.Timeline;

  constructor() {
    this._ball = Bottle.get('ballSprite');
    this._player = Bottle.get('player2Sprite');
    this._engine = Bottle.get('engine');

    this._sample = 0;

    PIXI.Ticker.shared.add((delta) => {
      this._sample++;

      this._sampleMax = this._engine.getDx() > 0 ? AI_ACTIVE_SAMPLE_RATE : AI_SLEEP_SAMPLE_RATE;
      if (this._sample > this._sampleMax) {
        this.move();

        this._sample = 0;
      }
    });

    this._timeline = gsap.timeline();
  }

  move() {
    const offset = Math.random() * (this._player.height / 8) - this._player.height / 16;

    this._timeline
      .clear()
      .to({
        val: 0,
        prev: 0,
      }, {
        val: this._ball.y - this._player.y + offset,
        duration: this._sampleMax / 60,
        ease: 'none',
        onUpdate: function() {
          const obj = this.targets()[0];

          const diff = obj.val - obj.prev;
          Event.emit(EVENT_PLAYER2_MOVE, diff);

          obj.prev = obj.val;
        }
    });
  }
}

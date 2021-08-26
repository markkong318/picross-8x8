import * as PIXI from 'pixi.js';
import gsap from 'gsap';

import {View} from "../../../framework/view";
import {GameModel} from "../../model/game-model";
import {
  END_SCORE,
  EVENT_RENDER_GAME_OVER,
  EVENT_RENDER_SCORE,
} from "../../util/env";
import Bottle from '../../../framework/bottle';
import Event from "../../../framework/event";
import titleStyle from "../style/title-style";

export class InfoView extends View {
  private _gameModel: GameModel;

  private _graphics: PIXI.Graphics;
  private _player1Score: PIXI.Text;
  private _player2Score: PIXI.Text;

  private _timeline: gsap.core.Timeline;

  constructor() {
    super();

    this._gameModel = Bottle.get('gameModel');
  }

  public init() {
    this._player1Score = new PIXI.Text('0', titleStyle);
    this._player1Score.anchor.x = 0.25;
    this._player1Score.anchor.y = 0.25;
    this._player1Score.x = this.size.width * 1 / 4;
    this._player1Score.y = 50;
    this.addChild(this._player1Score);

    this._player2Score = new PIXI.Text('0', titleStyle);
    this._player2Score.anchor.x = 0.25;
    this._player2Score.anchor.y = 0.25;
    this._player2Score.x = this.size.width * 3 / 4;
    this._player2Score.y = 50;
    this.addChild(this._player2Score);

    Event.on(EVENT_RENDER_SCORE, () => {
      this.renderScore();
    });

    Event.on(EVENT_RENDER_GAME_OVER, () => {
      this.renderGameOver();
    });

    this._timeline = gsap.timeline();
  }

  renderScore() {
    this._player1Score.text = `${this._gameModel.player1Score}`;
    this._player2Score.text = `${this._gameModel.player2Score}`;
  }

  renderGameOver() {
    let target;

    if (this._gameModel.player1Score === END_SCORE) {
      target = this._player1Score;
    } else {
      target = this._player2Score;
    }

    this._timeline
      .to(target,
      {
        duration: 0.5,
        onStart: function() {
          this.targets()[0].alpha = 1;
        },
        onComplete: function() {
          this.targets()[0].alpha = 0;
        }
      })
      .to(target,
        {
          duration: 0.5,
          onStart: function() {
            this.targets()[0].alpha = 0;
          },
          onComplete: function() {
            this.targets()[0].alpha = 1;
          }
        });

    this._timeline.repeat(3);
  }
}

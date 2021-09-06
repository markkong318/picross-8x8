import * as PIXI from 'pixi.js';

import {View} from "../../../framework/view";
import {Size} from "../../../framework/size";

import {PuzzleView} from "./puzzle-view";
import {Point} from "pixi.js";
import {HintColumnView} from "./hint-column-view";
import {HintRowView} from "./hint-row-view";
import Bottle from '../../../framework/bottle';
import {InfoView} from "./info-view";

export class BoardView extends View {
  private _graphics: PIXI.Graphics;
  private _boardGraphics: PIXI.Graphics;

  private _puzzleViews;
  private _hintRowViews = [];
  private _hintColumnViews = [];
  private _infoView;

  private _gameModel;

  constructor() {
    super();
  }

  public init() {
    this._gameModel = Bottle.get('gameModel');

    this._graphics = new PIXI.Graphics();
    this.addChild(this._graphics);

    for (let i = 0; i < 8; i++) {
      const hintRowView = new HintRowView();
      hintRowView.position = new Point(-hintRowView.size.width, i * 32);
      hintRowView.init();

      (i % 2) ? hintRowView.drawOdd() : hintRowView.drawEven();

      if (i === 7) hintRowView.drawSelect();

      this.addChild(hintRowView);

      this._hintRowViews.push(hintRowView);
    }

    for (let i = 0; i < 8; i++) {
      const hintColumnView = new HintColumnView();
      hintColumnView.position = new Point(i * 32, -hintColumnView.size.height);
      hintColumnView.init();

      (i % 2) ? hintColumnView.drawOdd() : hintColumnView.drawEven();

      if (i === 7) hintColumnView.drawSelect();

      this.addChild(hintColumnView);

      this._hintColumnViews.push(hintColumnView);
    }

    this._boardGraphics = new PIXI.Graphics();
    this.addChild(this._boardGraphics);

    this._boardGraphics.beginFill(0x656566);
    this._boardGraphics.drawRoundedRect(-1, -1, 32 * 8 + 2, 32 * 8 + 2, 5);


    // draw puzzle
    this._puzzleViews = new Array(8);

    for (let i = 0; i < this._puzzleViews.length; i++) {
      this._puzzleViews[i] = new Array(8);
    }

    for (let i = 0; i < this._puzzleViews.length; i++) {
      for (let j = 0; j < this._puzzleViews[i].length; j++) {
        this._puzzleViews[i][j] = new PuzzleView();
        this._puzzleViews[i][j].position = new Point(i * this._puzzleViews[i][j].size.width, j * this._puzzleViews[i][j].size.height);
        this._puzzleViews[i][j].init();
        this._puzzleViews[i][j].drawEmpty();

        this.addChild(this._puzzleViews[i][j]);
      }
    }

    const width = this._hintRowViews[0].size.width + this._puzzleViews[0][0].size.width * this._puzzleViews[0].length;
    const height = this._hintColumnViews[0].size.height + this._puzzleViews[0][0].size.height * this._puzzleViews.length;

    const padding = 5;

    this._graphics.beginFill(0xffffff);
    this._graphics.drawRoundedRect(
      -this._hintRowViews[0].size.width - padding,
      -this._hintColumnViews[0].size.height - padding,
      width + padding * 2,
      height + padding * 2,
      8
    );

    this._infoView = new InfoView();
    this._infoView.init();
    this._infoView.position = new Point(-150, -150);
    this.addChild(this._infoView)
  }
}

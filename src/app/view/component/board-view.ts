import * as PIXI from 'pixi.js';

import {View} from "../../../framework/view";
import {Size} from "../../../framework/size";

import {PuzzleView} from "./puzzle-view";
import {Point} from "pixi.js";
import {HintColumnView} from "./hint-column-view";
import {HintRowView} from "./hint-row-view";
import Bottle from '../../../framework/bottle';

export class BoardView extends View {
  private _puzzleViews;
  private _hintRowViews = [];
  private _hintColumnViews = [];

  private _gameModel;

  constructor() {
    super();
  }

  public init() {
    this._gameModel = Bottle.get('gameModel');

    this._puzzleViews = new Array(8);

    for (let i = 0; i < this._puzzleViews.length; i++) {
      this._puzzleViews[i] = new Array(8);
    }

    for (let i = 0; i < this._puzzleViews.length; i++) {
      for (let j = 0; j < this._puzzleViews[i].length; j++) {
        this._puzzleViews[i][j] = new PuzzleView();
        this._puzzleViews[i][j].position = new Point(i * this._puzzleViews[i][j].size.width, j * this._puzzleViews[i][j].size.height);
        this._puzzleViews[i][j].init();

        this.addChild(this._puzzleViews[i][j]);
      }
    }

    for (let i = 0; i < 8; i++) {
      const blockRowView = new HintRowView();
      blockRowView.position = new Point(-blockRowView.size.width, i * 32);
      blockRowView.init();
      this.addChild(blockRowView);

      this._hintRowViews.push(blockRowView);
    }

    for (let i = 0; i < 8; i++) {
      const blockColumnView = new HintColumnView();
      blockColumnView.position = new Point(i * 32, -blockColumnView.size.height);
      blockColumnView.init();
      this.addChild(blockColumnView);

      this._hintColumnViews.push(blockColumnView);
    }
  }
}

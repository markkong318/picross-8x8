import * as PIXI from 'pixi.js';

import {View} from "../../../framework/view";
import {Size} from "../../../framework/size";

import {TileView} from "./tile-view";
import {Point} from "pixi.js";
import {BlockColumnView} from "./block-column-view";
import {BlockRowView} from "./block-row-view";

export class BoardView extends View {
  private _tileViews;
  private _blockRowViews = [];
  private _blockColumnViews = [];

  constructor() {
    super();
  }

  public init() {
    this._tileViews = new Array(8);

    for (let i = 0; i < this._tileViews.length; i++) {
      this._tileViews[i] = new Array(8);
    }

    for (let i = 0; i < this._tileViews.length; i++) {
      for (let j = 0; j < this._tileViews[i].length; j++) {
        this._tileViews[i][j] = new TileView();
        this._tileViews[i][j].position = new Point(i * this._tileViews[i][j].size.width, j * this._tileViews[i][j].size.height);
        this._tileViews[i][j].init();

        this.addChild(this._tileViews[i][j]);
      }
    }

    for (let i = 0; i < 8; i++) {
      const blockRowView = new BlockRowView();
      blockRowView.position = new Point(- blockRowView.size.width, i * 32);
      blockRowView.init();
      this.addChild(blockRowView);

      this._blockRowViews.push(blockRowView);
    }

    for (let i = 0; i < 8; i++) {
      const blockColumnView = new BlockColumnView();
      blockColumnView.position = new Point(i * 32, - blockColumnView.size.height);
      blockColumnView.init();
      this.addChild(blockColumnView);

      this._blockColumnViews.push(blockColumnView);
    }
  }
}

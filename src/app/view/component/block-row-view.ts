import * as PIXI from 'pixi.js';

import {View} from '../../../framework/view';
import {Size} from '../../../framework/size';
import {BlockView} from "./block-view";
import {Point} from "pixi.js";

export class BlockRowView extends View {
  private _graphics: PIXI.Graphics;
  private _blockViews: BlockView[];

  public size = new Size(100, 32);
  private text: PIXI.Text;

  constructor() {
    super();
  }

  public init() {
    this._blockViews = [];

    this._graphics = new PIXI.Graphics();
    this._graphics.beginFill(0xcccccc);
    this._graphics.drawRect(0, 0, this.size.width, this.size.height);

    this.addChild(this._graphics);

    for (let i = 0; i < 3; i++) {
      const blockView = new BlockView();
      blockView.init();
      blockView.setText(i);
      blockView.position = new Point(this.size.width - blockView.size.width * (i + 1), 0);
      this.addChild(blockView);

      this._blockViews.push(blockView);
    }

  }
}

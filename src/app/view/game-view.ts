import * as PIXI from 'pixi.js';

import {View} from "../../framework/view";
import {GameModel} from "../model/game-model";
import {Size} from "../../framework/size";
import {GroundView} from "./component/ground-view";
import {Point} from "pixi.js";
import {TouchView} from "./component/touch-view";
import {InfoView} from "./component/info-view";
import {PuzzleView} from "./component/puzzle-view";
import {BoardView} from "./component/board-view";

export class GameView extends View {
  private _gameModel: GameModel;


  constructor() {
    super();
  }

  public init() {

    const bg = new PIXI.Sprite(PIXI.Texture.WHITE);
    bg.width = this.size.width;
    bg.height = this.size.height;
    bg.tint = 0x333333;
    this.addChild(bg);

    // const groundView = new GroundView();
    // groundView.position = new Point(0, 0);
    // groundView.size = new Size(this.size.width, this.size.height / 2);
    // groundView.init();
    // this.addChild(groundView);
    //
    // const touchView = new TouchView();
    // touchView.position = new Point(0, this.size.height / 2);
    // touchView.size = new Size(this.size.width, this.size.height / 2);
    // touchView.init();
    // this.addChild(touchView);
    //
    // const infoView = new InfoView();
    // infoView.position = new Point(0, 0);
    // infoView.size = new Size(this.size.width, this.size.height);
    // infoView.init();
    // this.addChild(infoView);

    // const tileView = new TileView();
    // tileView.position = new Point(100, 100);
    // tileView.init();
    // this.addChild(tileView);

    const boardView = new BoardView();
    boardView.position = new Point(200, 200);
    boardView.init();
    this.addChild(boardView);
  }
}

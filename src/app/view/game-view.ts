import * as PIXI from 'pixi.js';

import {View} from "../../framework/view";
import {BoardView} from "./component/board-view";
import {EVENT_FETCH_ANSWER_IMAGE} from "../env/event";
import Event from "../../framework/event";

export class GameView extends View {
  constructor() {
    super();
  }

  public init() {
    const bg = new PIXI.Sprite(PIXI.Texture.WHITE);
    bg.width = this.size.width;
    bg.height = this.size.height;
    bg.tint = 0x333333;
    this.addChild(bg);

    const boardView = new BoardView();
    boardView.position = new PIXI.Point(200, 200);
    boardView.init();
    this.addChild(boardView);

    Event.emit(EVENT_FETCH_ANSWER_IMAGE);
  }
}

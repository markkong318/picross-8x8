import * as PIXI from 'pixi.js';

import {View} from "../../framework/view";
import {BoardView} from "./game/board-view";
import {EVENT_FETCH_ANSWER_IMAGE, EVENT_UPDATE_BOARD_VIEW_POSITION} from "../env/event";
import Event from "../../framework/event";

export class GameView extends View {
  private boardView: BoardView;

  constructor() {
    super();

    Event.on(EVENT_UPDATE_BOARD_VIEW_POSITION, () => this.centerBoardView());
  }

  public init() {
    const bg = new PIXI.Sprite(PIXI.Texture.WHITE);
    bg.width = this.size.width;
    bg.height = this.size.height;
    bg.tint = 0x333333;
    this.addChild(bg);

    this.boardView = new BoardView();
    this.boardView.init();
    this.addChild(this.boardView);

    Event.emit(EVENT_FETCH_ANSWER_IMAGE);
  }

  private centerBoardView() {
    console.log("this.width:" + this.width);
    console.log("this.height:" + this.height);

    console.log("this.boardView.width:" + this.boardView.width);
    console.log("this.boardView.height:" + this.boardView.height);

    console.log("x:" + (this.width - this.boardView.width) / 2)
    console.log("y:" + (this.height - this.boardView.height) / 2)

    this.boardView.position = new PIXI.Point(
      (this.size.width - this.boardView.width) / 2,
      (this.size.height - this.boardView.height) / 2
    );
  }
}

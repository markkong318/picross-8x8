import * as PIXI from 'pixi.js';

import {View} from "../../../framework/view";
import {HintColumnView} from "../component/board/hint/hint-column-view";
import {HintRowView} from "../component/board/hint/hint-row-view";
import Bottle from '../../../framework/bottle';
import Event from '../../../framework/event';
import {InfoView} from "../component/board/info-view";
import {
  EVENT_UPDATE_HINT_VIEW, EVENT_INIT_BOARD_VIEW, EVENT_INIT_PUZZLES_VIEW, EVENT_UPDATE_BOARD_VIEW_POSITION,
} from "../../env/event";
import {GameModel} from "../../model/game-model";
import {PuzzlesView} from "./board/puzzles-view";
import {PUZZLE_HEIGHT, PUZZLE_WIDTH} from "../../env/puzzle";
import {HintColumnsView} from "./board/hint-columns-view";
import {HintRowsView} from "./board/hint-rows-view";

export class BoardView extends View {
  private graphics: PIXI.Graphics;

  private puzzlesView: PuzzlesView;
  private hintColumnsView: HintColumnsView;
  private hintRowsView: HintRowsView;
  private infoView: InfoView;

  private gameModel: GameModel;

  constructor() {
    super();
  }

  public init() {
    this.gameModel = Bottle.get('gameModel');

    Event.on(EVENT_INIT_BOARD_VIEW, () => {
      this.initBackground();
      this.initHintViews();
      this.initPuzzlesView();
      this.initInfoView();

      this.updateBackground();

      Event.emit(EVENT_INIT_PUZZLES_VIEW);
      Event.emit(EVENT_UPDATE_BOARD_VIEW_POSITION);
    });
  }

  initPuzzlesView() {
    this.puzzlesView = new PuzzlesView();
    this.puzzlesView.position = new PIXI.Point(0, 0);
    this.puzzlesView.init();
    this.addChild(this.puzzlesView)
  }

  initHintViews() {
    this.hintRowsView = new HintRowsView();
    this.hintRowsView.init();
    this.addChild(this.hintRowsView);

    this.hintColumnsView = new HintColumnsView();
    this.hintColumnsView.init();
    this.addChild(this.hintColumnsView);
  }

  initInfoView() {
    this.infoView = new InfoView();
    this.infoView.init();
    this.infoView.position = new PIXI.Point(-150, -150);
    this.addChild(this.infoView)
  }

  initBackground() {
    this.graphics = new PIXI.Graphics();
    this.addChild(this.graphics);
  }

  updateBackground() {
    const width = this.hintRowsView.width + PUZZLE_WIDTH * 8;
    const height = this.hintColumnsView.height + PUZZLE_HEIGHT * 8;

    const padding = 5;

    this.graphics.beginFill(0xffffff);
    this.graphics.drawRoundedRect(
      -this.hintRowsView.width - padding,
      -this.hintColumnsView.height - padding,
      width + padding * 2,
      height + padding * 2,
      8
    );
  }
}

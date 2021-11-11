import * as PIXI from 'pixi.js';

import {View} from "../../../framework/view";
import {HintColumnView} from "../component/board/hint/hint-column-view";
import {HintRowView} from "../component/board/hint/hint-row-view";
import Bottle from '../../../framework/bottle';
import Event from '../../../framework/event';
import {InfoView} from "../component/board/info-view";
import {
  EVENT_UPDATE_HINT_VIEW, EVENT_INIT_BOARD_VIEW, EVENT_INIT_PUZZLES_VIEW,
} from "../../env/event";
import {GameModel} from "../../model/game-model";
import {PuzzlesView} from "./board/puzzles-view";

export class BoardView extends View {
  private graphics: PIXI.Graphics;

  private hintRowViews = [];
  private hintColumnViews = [];
  private infoView;

  private puzzlesView: PuzzlesView;

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
    });

    // Event.on(EVENT_UPDATE_PUZZLE_VIEW, () => this.updatePuzzleViews());
    Event.on(EVENT_UPDATE_HINT_VIEW, (x, y) => this.updateHintViews(x, y));
  }

  initPuzzlesView() {
    this.puzzlesView = new PuzzlesView();
    this.puzzlesView.position = new PIXI.Point(0, 0);
    this.puzzlesView.init();
    this.addChild(this.puzzlesView)
  }

  initHintViews() {
    for (let i = 0; i < 8; i++) {
      const hintRowView = new HintRowView();
      hintRowView.position = new PIXI.Point(-hintRowView.size.width, i * 32);
      hintRowView.init();

      (i % 2) ? hintRowView.drawOdd() : hintRowView.drawEven();

      hintRowView.drawHints(this.gameModel.hintRows[i]);

      this.addChild(hintRowView);

      this.hintRowViews.push(hintRowView);
    }

    for (let i = 0; i < 8; i++) {
      const hintColumnView = new HintColumnView();
      hintColumnView.position = new PIXI.Point(i * 32, -hintColumnView.size.height);
      hintColumnView.init();

      (i % 2) ? hintColumnView.drawOdd() : hintColumnView.drawEven();

      hintColumnView.drawHints(this.gameModel.hintColumns[i]);

      this.addChild(hintColumnView);

      this.hintColumnViews.push(hintColumnView);
    }
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
    const width = this.hintRowViews[0].size.width + 32 * 8;
    const height = this.hintColumnViews[0].size.height + 32 * 8;

    const padding = 5;

    this.graphics.beginFill(0xffffff);
    this.graphics.drawRoundedRect(
      -this.hintRowViews[0].size.width - padding,
      -this.hintColumnViews[0].size.height - padding,
      width + padding * 2,
      height + padding * 2,
      8
    );
  }

  updateHintViews(x, y) {
    for (let i = 0; i < 8; i++) {
      const hintColumnView = this.hintColumnViews[i];
      (i % 2) ? hintColumnView.drawOdd() : hintColumnView.drawEven();

      if (i === y) {
        hintColumnView.drawSelect();
      }

      const hintRowView = this.hintRowViews[i];
      (i % 2) ? hintRowView.drawOdd() : hintRowView.drawEven();

      if (i === x) {
        hintRowView.drawSelect();
      }
    }
  }
}

import * as PIXI from 'pixi.js';

import {View} from "../../../framework/view";
import {Size} from "../../../framework/size";

import {PuzzleView} from "./board/puzzle-view";
import {Point} from "pixi.js";
import {HintColumnView} from "./board/hint-column-view";
import {HintRowView} from "./board/hint-row-view";
import Bottle from '../../../framework/bottle';
import Event from '../../../framework/event';
import {InfoView} from "./board/info-view";
import {
  PUZZLE_BLACK, PUZZLE_WHITE, PUZZLE_X,
  EVENT_UPDATE_PUZZLE_VIEW,
  EVENT_UPDATE_HINT_VIEW,
} from "../../util/env";
import {GameModel} from "../../model/game-model";

export class BoardView extends View {
  private graphics: PIXI.Graphics;
  private boardGraphics: PIXI.Graphics;

  private puzzleViews;
  private hintRowViews = [];
  private hintColumnViews = [];
  private infoView;

  private gameModel: GameModel;

  constructor() {
    super();
  }

  public init() {
    this.gameModel = Bottle.get('gameModel');

    this.graphics = new PIXI.Graphics();
    this.addChild(this.graphics);

    for (let i = 0; i < 8; i++) {
      const hintRowView = new HintRowView();
      hintRowView.position = new Point(-hintRowView.size.width, i * 32);
      hintRowView.init();

      (i % 2) ? hintRowView.drawOdd() : hintRowView.drawEven();

      if (i === 7) hintRowView.drawSelect();

      this.addChild(hintRowView);

      this.hintRowViews.push(hintRowView);
    }

    for (let i = 0; i < 8; i++) {
      const hintColumnView = new HintColumnView();
      hintColumnView.position = new Point(i * 32, -hintColumnView.size.height);
      hintColumnView.init();

      (i % 2) ? hintColumnView.drawOdd() : hintColumnView.drawEven();

      if (i === 7) hintColumnView.drawSelect();

      this.addChild(hintColumnView);

      this.hintColumnViews.push(hintColumnView);
    }

    this.boardGraphics = new PIXI.Graphics();
    this.addChild(this.boardGraphics);

    this.boardGraphics.beginFill(0x656566);
    this.boardGraphics.drawRoundedRect(-1, -1, 32 * 8 + 2, 32 * 8 + 2, 5);


    // draw puzzle
    this.puzzleViews = new Array(8);

    for (let i = 0; i < this.puzzleViews.length; i++) {
      this.puzzleViews[i] = new Array(8);
    }

    for (let i = 0; i < this.puzzleViews.length; i++) {
      for (let j = 0; j < this.puzzleViews[i].length; j++) {
        this.puzzleViews[i][j] = new PuzzleView(i, j);
        this.puzzleViews[i][j].position = new Point(i * this.puzzleViews[i][j].size.width, j * this.puzzleViews[i][j].size.height);
        this.puzzleViews[i][j].init();
        this.puzzleViews[i][j].drawWhite();

        this.addChild(this.puzzleViews[i][j]);
      }
    }

    const width = this.hintRowViews[0].size.width + this.puzzleViews[0][0].size.width * this.puzzleViews[0].length;
    const height = this.hintColumnViews[0].size.height + this.puzzleViews[0][0].size.height * this.puzzleViews.length;

    const padding = 5;

    this.graphics.beginFill(0xffffff);
    this.graphics.drawRoundedRect(
      -this.hintRowViews[0].size.width - padding,
      -this.hintColumnViews[0].size.height - padding,
      width + padding * 2,
      height + padding * 2,
      8
    );

    this.infoView = new InfoView();
    this.infoView.init();
    this.infoView.position = new Point(-150, -150);
    this.addChild(this.infoView)

    this.updatePuzzleViews();

    Event.on(EVENT_UPDATE_PUZZLE_VIEW, () => this.updatePuzzleViews());
    Event.on(EVENT_UPDATE_HINT_VIEW, (x, y) => this.updateHintViews(x, y));
  }

  updatePuzzleViews() {
    const puzzle = this.gameModel.puzzle;

    for (let i = 0; i < this.puzzleViews.length; i++) {
      for (let j = 0; j < this.puzzleViews[i].length; j++) {
        switch (puzzle[i][j]) {
          case PUZZLE_WHITE:
            this.puzzleViews[i][j].drawWhite();
            break;
          case PUZZLE_BLACK:
            this.puzzleViews[i][j].drawBlack();
            break;
          case PUZZLE_X:
            this.puzzleViews[i][j].drawX();
            break;
        }
      }
    }
  }

  updateHintViews(x, y) {
    for (let i = 0; i < 8; i++) {
      const hintColumnView = this.hintColumnViews[i];
      (i % 2) ? hintColumnView.drawOdd() : hintColumnView.drawEven();

      if (i === x) {
        hintColumnView.drawSelect();
      }

      const hintRowView = this.hintRowViews[i];
      (i % 2) ? hintRowView.drawOdd() : hintRowView.drawEven();

      if (i === y) {
        hintRowView.drawSelect();
      }
    }
  }
}

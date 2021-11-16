import * as PIXI from 'pixi.js';
import {View} from "../../../../framework/view";
import {PuzzleView} from "../../component/board/puzzle/puzzle-view";
import {BLOCK_BLACK, BLOCK_WHITE, BLOCK_X} from "../../../env/block";
import {GameModel} from "../../../model/game-model";
import Event from "../../../../framework/event";
import {
  EVENT_END_TOUCH_PUZZLE,
  EVENT_INIT_PUZZLES_VIEW,
  EVENT_START_TOUCH_PUZZLE, EVENT_UPDATE_HINT_VIEW,
  EVENT_UPDATE_PUZZLE_VIEW
} from "../../../env/event";
import Bottle from "../../../../framework/bottle";
import {PUZZLE_HEIGHT, PUZZLE_WIDTH} from "../../../env/puzzle";
import {HintColumnView} from "../../component/board/hint/hint-column-view";

export class HintColumnsView extends View {
  private hintColumnViews: HintColumnView[];
  private gameModel: GameModel;

  constructor() {
    super();
  }

  init() {
    this.gameModel = Bottle.get('gameModel');

    this.hintColumnViews = [];

    for (let i = 0; i < 8; i++) {
      const hintColumnView = new HintColumnView();
      hintColumnView.position = new PIXI.Point(i * PUZZLE_WIDTH, 0);
      hintColumnView.init();

      if (i % 2) {
        hintColumnView.drawOdd();
      } else {
        hintColumnView.drawEven();
      }

      hintColumnView.drawHints(this.gameModel.hintColumns[i]);

      this.addChild(hintColumnView);

      this.hintColumnViews.push(hintColumnView);
    }

    Event.on(EVENT_UPDATE_HINT_VIEW, (x, y) => this.updateSelect(x));
  }

  updateSelect(idx) {
    for (let i = 0; i < this.hintColumnViews.length; i++) {
      if (i === idx) {
        this.hintColumnViews[i].drawSelect();
      } else {
        if (i % 2) {
          this.hintColumnViews[i].drawOdd();
        } else {
          this.hintColumnViews[i].drawEven();
        }
      }
    }
  }
}

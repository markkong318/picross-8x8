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
import {HintRowView} from "../../component/board/hint/hint-row-view";

export class HintRowsView extends View {
  private hintRowViews: HintRowView[];
  private gameModel: GameModel;

  constructor() {
    super();
  }

  init() {
    this.gameModel = Bottle.get('gameModel');

    this.hintRowViews = [];

    for (let i = 0; i < 8; i++) {
      const hintRowView = new HintRowView();
      hintRowView.position = new PIXI.Point(0, i * PUZZLE_HEIGHT);
      hintRowView.init();

      if (i % 2) {
        hintRowView.drawOdd();
      } else {
        hintRowView.drawEven();
      }

      hintRowView.drawHints(this.gameModel.hintRows[i]);

      this.addChild(hintRowView);

      this.hintRowViews.push(hintRowView);
    }

    Event.on(EVENT_UPDATE_HINT_VIEW, (x, y) => this.updateSelect(x));
  }

  updateSelect(idx) {
    for (let i = 0; i < this.hintRowViews.length; i++) {
      if (i === idx) {
        this.hintRowViews[i].drawSelect();
      } else {
        if (i % 2) {
          this.hintRowViews[i].drawOdd();
        } else {
          this.hintRowViews[i].drawEven();
        }
      }
    }
  }
}

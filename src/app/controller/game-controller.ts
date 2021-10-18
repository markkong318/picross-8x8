import {Controller} from "../../framework/controller";
import {GameModel} from "../model/game-model";
import Bottle from "../../framework/bottle";
import Event from "../../framework/event";
import {
  PUZZLE_WHITE,
  PUZZLE_BLACK,
  PUZZLE_X,
} from "../util/env";
import {
  EVENT_TOUCH_PUZZLE,
  EVENT_UPDATE_PUZZLE_VIEW,
  EVENT_UPDATE_HINT_VIEW,
} from "../env/event";
export class GameController extends Controller {
  private gameModel: GameModel;

  constructor() {
    super();

    this.gameModel = Bottle.get('gameModel');

    Event.on(EVENT_TOUCH_PUZZLE, (x, y) => {
      const puzzle = this.gameModel.puzzle[x][y];

      if (this.gameModel.puzzle[x][y] == PUZZLE_WHITE) {
        this.gameModel.puzzle[x][y] = PUZZLE_BLACK;
      } else if (this.gameModel.puzzle[x][y] == PUZZLE_BLACK) {
        this.gameModel.puzzle[x][y] = PUZZLE_WHITE;
      }

      Event.emit(EVENT_UPDATE_PUZZLE_VIEW);
      Event.emit(EVENT_UPDATE_HINT_VIEW, x, y);
    });

    this.initHint();

    console.log('call game controller init');
  }

  initHint() {
    const answer = this.gameModel.answer;

    // for (let i = 0; i < answer.length; i++) {
    //   for (let j = 0; j < answer[i].length; j++) {
    //     answer[i][j] = PUZZLE_WHITE;
    //   }
    // }

    const hintRows = this.gameModel.hintRows;

    for (let i = 0; i < answer.length; i++) {
      let count = 0;

      for (let j = 0; j < answer[i].length; j++) {
        if (answer[i][j] === PUZZLE_WHITE) {
          if (count > 0) {
            hintRows[i].push(count);
            count = 0;
          }
          continue;
        }
        count++;
      }

      if (count > 0) {
        hintRows[i].push(count);
      }
    }

    const hintColumns = this.gameModel.hintColumns;

    for (let i = 0; i < answer[0].length; i++) {
      let count = 0;

      for (let j = 0; j < answer.length; j++) {
        if (answer[j][i] === PUZZLE_WHITE) {
          if (count > 0) {
            hintColumns[j].push(count);
            count = 0;
          }
          continue;
        }
        count++;
      }

      if (count > 0) {
        hintColumns[i].push(count);
      }
    }

    console.log(hintColumns);
  }
}

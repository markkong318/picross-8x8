import {Controller} from "../../framework/controller";
import {GameModel} from "../model/game-model";
import Bottle from "../../framework/bottle";
import Event from "../../framework/event";
import {
  EVENT_TOUCH_PUZZLE,
  EVENT_UPDATE_PUZZLE_VIEW,
  EVENT_UPDATE_HINT_VIEW,
  PUZZLE_WHITE,
  PUZZLE_BLACK,
  PUZZLE_X,
} from "../util/env";

export class GameController extends Controller {
  private gameModel: GameModel;

  constructor() {
    super();

    this.gameModel = Bottle.get('gameModel');

    Event.on(EVENT_TOUCH_PUZZLE, (x, y) => {
      console.log('EVENT_TOUCH_PUZZLE ' + x + ',' + y)
      if (this.gameModel.puzzle[x][y] == PUZZLE_WHITE) {
        this.gameModel.puzzle[x][y] = PUZZLE_BLACK;
      } else if (this.gameModel.puzzle[x][y] == PUZZLE_BLACK) {
        this.gameModel.puzzle[x][y] = PUZZLE_WHITE;
      }

      Event.emit(EVENT_UPDATE_PUZZLE_VIEW);
      Event.emit(EVENT_UPDATE_HINT_VIEW, x, y);
    });
  }
}

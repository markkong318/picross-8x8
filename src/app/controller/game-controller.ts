import {Controller} from "../../framework/controller";
import {GameModel} from "../model/game-model";
import Bottle from "../../framework/bottle";
import Event from "../../framework/event";
import {
  BLOCK_WHITE,
  BLOCK_BLACK,
  BLOCK_X,
} from "../env/block";
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
      let puzzle = this.gameModel.puzzle[x][y];

      if (puzzle == BLOCK_WHITE || puzzle == BLOCK_X) {
        puzzle = BLOCK_BLACK;
      } else if (puzzle == BLOCK_BLACK) {
        puzzle = BLOCK_WHITE;
      }

      this.gameModel.puzzle[x][y] = puzzle;

      this.clearXPuzzle();
      this.updateXPuzzle();

      Event.emit(EVENT_UPDATE_PUZZLE_VIEW);
      Event.emit(EVENT_UPDATE_HINT_VIEW, x, y);
    });

    this.initHintColumns();
    this.initHintRows();
    this.updateXPuzzle();
  }

  initHintRows() {
    const answer = this.gameModel.answer;
    const hintRows = this.gameModel.hintRows;

    for (let i = 0; i < answer.length; i++) {
      let count = 0;

      for (let j = 0; j < answer[i].length; j++) {
        if (answer[i][j] === BLOCK_WHITE) {
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
  }

  initHintColumns() {
    const answer = this.gameModel.answer;
    const hintColumns = this.gameModel.hintColumns;

    for (let i = 0; i < answer[0].length; i++) {
      let count = 0;

      for (let j = 0; j < answer.length; j++) {
        if (answer[j][i] === BLOCK_WHITE) {
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
  }

  clearXPuzzle() {
    for (let i = 0; i < this.gameModel.puzzle[0].length; i++) {
      this.clearXPuzzleRow(i);
    }

    for(let i = 0; i < this.gameModel.puzzle.length; i++) {
      this.clearXPuzzleColumn(i);
    }
  }

  clearXPuzzleRow(i) {
    const puzzle = this.gameModel.puzzle;

    for (let j = 0; j < puzzle[i].length; j++) {
      if (puzzle[i][j] === BLOCK_X) {
        puzzle[i][j] = BLOCK_WHITE;
      }
    }
  }

  clearXPuzzleColumn(i) {
    const puzzle = this.gameModel.puzzle;

    for (let j = 0; j < puzzle.length; j++) {
      if (puzzle[j][i] === BLOCK_X) {
        puzzle[j][i] = BLOCK_WHITE;
      }
    }
  }

  updateXPuzzle() {
    for (let i = 0; i < this.gameModel.puzzle.length; i++) {
      this.updateXPuzzleRow(i);
    }

    for(let i = 0; i < this.gameModel.puzzle[0].length; i++) {
      this.updateXPuzzleColumn(i);
    }
  }

  updateXPuzzles() {
    for (let i = 0; i < this.gameModel.puzzle.length; i++) {
      this.updateXPuzzleRow(i);
    }

    for(let i = 0; i < this.gameModel.puzzle[0].length; i++) {
      this.updateXPuzzleColumn(i);
    }
  }

  updateXPuzzleRow(i) {
    const puzzle = this.gameModel.puzzle;
    const hintRow = this.gameModel.hintRows[i];

    const current = [];

    let count = 0;

    for (let j = 0; j < puzzle[i].length; j++) {
      if (puzzle[i][j] != BLOCK_BLACK) {
        if (count > 0) {
          current.push(count);
          count = 0;
        }
        continue;
      }
      count++;
    }

    if (count > 0) {
      current.push(count);
    }

    if (current.length !== hintRow.length
      || ! current.every((value, index) => value === hintRow[index])) {
      return;
    }

    for (let j = 0; j < puzzle[i].length; j++) {
      if (puzzle[i][j] == BLOCK_WHITE) {
        puzzle[i][j] = BLOCK_X;
      }
    }
  }

  updateXPuzzleColumn(i) {
    const puzzle = this.gameModel.puzzle;
    const hintColumn = this.gameModel.hintColumns[i];

    const current = [];

    let count = 0;

    for (let j = 0; j < puzzle.length; j++) {
      if (puzzle[j][i] !== BLOCK_BLACK) {
        if (count > 0) {
          current.push(count);
          count = 0;
        }
        continue;
      }
      count++;
    }

    if (count > 0) {
      current.push(count);
    }

    if (current.length !== hintColumn.length
      || ! current.every((value, index) => value === hintColumn[index])) {
      return;
    }

    for (let j = 0; j < puzzle[i].length; j++) {
      if (puzzle[j][i] === BLOCK_WHITE) {
        puzzle[j][i] = BLOCK_X;
      }
    }
  }
}

import loadImage from "blueimp-load-image"
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
  EVENT_START_TOUCH_PUZZLE,
  EVENT_UPDATE_PUZZLE_VIEW,
  EVENT_UPDATE_HINT_VIEW,
  EVENT_FETCH_ANSWER_IMAGE,
  EVENT_INIT_DATA,
  EVENT_INIT_BOARD_VIEW,
  EVENT_COMPLETE_PUZZLE,
  EVENT_FETCH_ORIGIN_IMAGE, EVENT_END_TOUCH_PUZZLE,
} from "../env/event";
export class GameController extends Controller {
  private gameModel: GameModel;

  constructor() {
    super();

    this.gameModel = Bottle.get('gameModel');

    Event.on(EVENT_START_TOUCH_PUZZLE, (x, y) => {

      this.togglePuzzle(x, y);

      Event.emit(EVENT_UPDATE_PUZZLE_VIEW);
      Event.emit(EVENT_UPDATE_HINT_VIEW, x, y);
    });

    Event.on(EVENT_END_TOUCH_PUZZLE, (x, y) => {
      this.clearXPuzzle();
      this.updateXPuzzles();

      Event.emit(EVENT_UPDATE_PUZZLE_VIEW);
      Event.emit(EVENT_UPDATE_HINT_VIEW, x, y);

      if (this.isCompleted()) {
        console.log('completed');
        Event.emit(EVENT_COMPLETE_PUZZLE);
      }
    });

    Event.on(EVENT_FETCH_ANSWER_IMAGE, () => {
      this.initAnswer(EVENT_FETCH_ORIGIN_IMAGE);
    });

    Event.on(EVENT_FETCH_ORIGIN_IMAGE, () => {
      this.initOrigin(EVENT_INIT_DATA);
    });

    Event.on(EVENT_INIT_DATA, () => {
      this.initHintColumns();
      this.initHintRows();
      this.initPuzzles()
      this.updateXPuzzles();

      Event.emit(EVENT_INIT_BOARD_VIEW);
    });
  }

  initAnswer(next) {
    loadImage(
      "https://i.imgur.com/rIiqSQs.png",
      (canvas) => {
        console.log('init answer')
        console.log(canvas);
        const context = canvas.getContext('2d');
        const data = context.getImageData(0, 0, canvas.width, canvas.height).data;

        const answers = new Array(canvas.width);
        for (let i = 0; i < answers.length; i++) {
          answers[i] = new Array(canvas.height);
        }

        for (let i = 0; i < answers.length; i++) {
          for (let j = 0; j < answers[i].length; j++) {
            answers[i][j] =
              (
                data[(i * answers[i].length + j) * 4] +
                data[(i * answers[i].length + j) * 4 + 1] +
                data[(i * answers[i].length + j) * 4 + 2]
              ) / 3 > 128 ? BLOCK_BLACK : BLOCK_WHITE;
          }
        }

        console.log("answer:");
        console.log(answers);

        this.gameModel.answer = answers;

        Event.emit(next);
      },
      {canvas: true, crossOrigin: true},
    );
  }

  initOrigin(next) {
    loadImage(
      "https://i.imgur.com/jjVYPNF.jpg",
      (canvas) => {
        console.log('initOrigin')
        console.log(canvas);
        const context = canvas.getContext('2d');
        const data = context.getImageData(0, 0, canvas.width, canvas.height).data;

        const origins = new Array(canvas.width);
        for (let i = 0; i < origins.length; i++) {
          origins[i] = new Array(canvas.height);
        }

        for (let i = 0; i < origins.length; i++) {
          for (let j = 0; j < origins[i].length; j++) {
            origins[i][j] =
              (
                data[(i * origins[i].length + j) * 4] * 256 * 256 +
                data[(i * origins[i].length + j) * 4 + 1] * 256 +
                data[(i * origins[i].length + j) * 4 + 2]
              );

            console.log(`(${i}, ${j}) => rgb(${data[(i * origins[i].length + j) * 4]}, ${data[(i * origins[i].length + j) * 4 + 1]}, ${data[(i * origins[i].length + j) * 4 + 2]})`)
          }
        }

        console.log("origins:");
        console.log(origins);

        this.gameModel.origins = origins;

        Event.emit(next);
      },
      {canvas: true, crossOrigin: true},
    );
  }

  initHintRows() {
    const answer = this.gameModel.answer;

    const hintRows = new Array(8);
    for (let i = 0; i < hintRows.length; i++) {
      hintRows[i] = [];
    }

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

    this.gameModel.hintRows = hintRows;
  }

  initHintColumns() {
    const answer = this.gameModel.answer;

    const hintColumns = new Array(8);
    for (let i = 0; i < hintColumns.length; i++) {
      hintColumns[i] = [];
    }

    for (let i = 0; i < answer[0].length; i++) {
      let count = 0;

      for (let j = 0; j < answer.length; j++) {
        if (answer[j][i] === BLOCK_WHITE) {
          if (count > 0) {
            hintColumns[i].push(count);
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

    this.gameModel.hintColumns = hintColumns;
  }

  initPuzzles() {
    const puzzles = new Array(8);
    for (let i = 0; i < puzzles.length; i++) {
      puzzles[i] = new Array(8);
      for (let j = 0; j < puzzles[i].length; j++) {
        puzzles[i][j] = BLOCK_WHITE;
      }
    }

    this.gameModel.puzzle = puzzles
  }

  isCompleted() {
    const puzzle = this.gameModel.puzzle;
    const answer = this.gameModel.answer;

    let ret = true;

    for (let i = 0; i < puzzle.length; i++) {
      for (let j = 0; j < puzzle[i].length; j++) {
        if (puzzle[i][j] === BLOCK_WHITE) {
          ret = false;
          break;
        }

        if (puzzle[i][j] === BLOCK_BLACK && answer[i][j] !== BLOCK_BLACK) {
          ret = false;
          break;
        }

        if (puzzle[i][j] === BLOCK_X && answer[i][j] !== BLOCK_WHITE) {
          ret = false;
          break;
        }
      }
    }

    return ret;
  }

  togglePuzzle(x, y) {
    let puzzle = this.gameModel.puzzle[x][y];

    if (puzzle == BLOCK_WHITE || puzzle == BLOCK_X) {
      puzzle = BLOCK_BLACK;
    } else if (puzzle == BLOCK_BLACK) {
      puzzle = BLOCK_WHITE;
    }

    this.gameModel.puzzle[x][y] = puzzle;
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

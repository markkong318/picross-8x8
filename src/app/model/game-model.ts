import {Model} from "../../framework/model";
import {
  PUZZLE_BLACK,
  PUZZLE_WHITE,
} from "../util/env";

export class GameModel extends Model {
  public puzzle: number[][];
  public answer: number[][];
  public hintRow: number[][];
  public hintColumn: number[][];

  public isStart: boolean = false;
  public isTouched: boolean = false;

  constructor() {
    super();

    this.answer = new Array(8);
    for (let i = 0; i < this.answer.length; i++) {
      this.answer[i] = new Array(8);
      for (let j = 0; j < this.answer[i].length; j++) {
        this.answer[i][j] = PUZZLE_BLACK;
      }
    }

    this.puzzle = new Array(8);
    for (let i = 0; i < this.puzzle.length; i++) {
      this.puzzle[i] = new Array(8);
      for (let j = 0; j < this.puzzle[i].length; j++) {
        this.puzzle[i][j] = PUZZLE_WHITE;
      }
    }

    this.hintRow = new Array(8);
    this.hintColumn = new Array(8);
  }
}

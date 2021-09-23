import {Model} from "../../framework/model";
import {
  PUZZLE_WHITE,
} from "../util/env";

export class GameModel extends Model {
  public puzzle: number[][];
  public hintRow: number[][];
  public hintColumn: number[][];

  public isStart: boolean = false;
  public isTouched: boolean = false;

  constructor() {
    super();

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

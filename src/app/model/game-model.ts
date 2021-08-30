import {Model} from "../../framework/model";
import {PUZZLE_UNKNOWN} from "../util/env";

export class GameModel extends Model {
  public _puzzle: number[][];
  public _hintRow: number[][];
  public _hintColumn: number[][];

  public isStart: boolean = false;

  constructor() {
    super();

    this._puzzle = new Array(8);
    for (let i = 0; i < this._puzzle.length; i++) {
      this._puzzle[i] = new Array(8);
      for (let j = 0; j < this._puzzle[i].length; j++) {
        this._puzzle[i][j] = PUZZLE_UNKNOWN;
      }
    }

    this._hintRow = new Array(8);
    this._hintColumn = new Array(8);
  }
}

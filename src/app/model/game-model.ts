import {Model} from "../../framework/model";
import {
  BLOCK_BLACK,
  BLOCK_WHITE,
} from "../env/block";

export class GameModel extends Model {
  public puzzle: number[][];
  public answer: number[][];
  public origins: number[][];
  public hintRows: number[][];
  public hintColumns: number[][];

  public isStart: boolean = false;
  public isTouched: boolean = false;

  public timer: number = 0;

  constructor() {
    super();

    // this.answer = new Array(8);
    // for (let i = 0; i < this.answer.length; i++) {
    //   this.answer[i] = new Array(8);
    //   for (let j = 0; j < this.answer[i].length; j++) {
    //     this.answer[i][j] = BLOCK_WHITE;
    //   }
    // }
    //
    // this.puzzle = new Array(8);
    // for (let i = 0; i < this.puzzle.length; i++) {
    //   this.puzzle[i] = new Array(8);
    //   for (let j = 0; j < this.puzzle[i].length; j++) {
    //     this.puzzle[i][j] = BLOCK_WHITE;
    //   }
    // }
    //
    // this.hintRows = new Array(8);
    // for (let i = 0; i < this.hintRows.length; i++) {
    //   this.hintRows[i] = [];
    // }
    //
    // this.hintColumns = new Array(8);
    // for (let i = 0; i < this.hintColumns.length; i++) {
    //   this.hintColumns[i] = [];
    // }
  }
}

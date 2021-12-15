import {Model} from '../../framework/model';

export class GameModel extends Model {
  public puzzle: number[][];
  public answer: number[][];
  public origins: number[][];
  public hintRows: number[][];
  public hintColumns: number[][];

  public timer: number = 0;

  public puzzleWidth: number;
  public puzzleHeight: number;

  constructor() {
    super();
  }
}

import {Model} from '../../framework/model';

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
  }
}

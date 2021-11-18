import * as PIXI from 'pixi.js';
import {View} from "../../../../framework/view";
import {PuzzleView} from "../../component/board/puzzle/puzzle-view";
import {BLOCK_BLACK, BLOCK_WHITE, BLOCK_X} from "../../../env/block";
import {GameModel} from "../../../model/game-model";
import Event from "../../../../framework/event";
import {
  EVENT_END_TOUCH_PUZZLE,
  EVENT_INIT_PUZZLES_VIEW,
  EVENT_START_TOUCH_PUZZLE,
  EVENT_UPDATE_PUZZLE_VIEW, EVENT_UPDATE_PUZZLES_VIEW_TO_COLOR
} from "../../../env/event";
import Bottle from "../../../../framework/bottle";
import {PUZZLE_HEIGHT, PUZZLE_WIDTH} from "../../../env/puzzle";

export class PuzzlesView extends View {
  private puzzleViews: PuzzleView[][];
  private backgroundGraphics: PIXI.Graphics;
  private gameModel: GameModel;

  private posX: number;
  private posY: number;

  constructor() {
    super();
  }

  init() {
    this.gameModel = Bottle.get('gameModel');



    Event.on(EVENT_INIT_PUZZLES_VIEW, () => {
      this.initPuzzlesView();
      this.updatePuzzlesView();
    });

    Event.on(EVENT_UPDATE_PUZZLE_VIEW, () => this.updatePuzzlesView());
    Event.on(EVENT_UPDATE_PUZZLES_VIEW_TO_COLOR, () => this.updatePuzzlesViewToColor());

    this.on("touchstart", (event) => {
      const {x, y} = event.data.getLocalPosition(event.currentTarget)

      const {posX, posY} = this.getTouchPosition(x, y);
      this.touchStart(posX, posY);
    });

    this.on("touchmove", (event) => {
      const {x, y} = event.data.getLocalPosition(event.currentTarget);

      const {posX, posY} = this.getTouchPosition(x, y);
      this.touchStart(posX, posY);
    });

    this.on("touchend", (event) => {
      const {x, y} = event.data.getLocalPosition(event.currentTarget);

      const {posX, posY} = this.getTouchPosition(x, y);
      this.touchEnd(posX, posY);
    });
  }

  initPuzzlesView() {
    this.interactive = true;

    this.backgroundGraphics = new PIXI.Graphics();
    this.addChild(this.backgroundGraphics);

    this.backgroundGraphics.beginFill(0x656566);
    this.backgroundGraphics.drawRoundedRect(-1, -1, PUZZLE_WIDTH * 8 + 2, PUZZLE_HEIGHT * 8 + 2, 5);

    this.puzzleViews = new Array(8);

    for (let i = 0; i < this.puzzleViews.length; i++) {
      this.puzzleViews[i] = new Array(8);
    }

    for (let i = 0; i < this.puzzleViews.length; i++) {
      for (let j = 0; j < this.puzzleViews[i].length; j++) {
        this.puzzleViews[i][j] = new PuzzleView(i, j);
        this.puzzleViews[i][j].position = new PIXI.Point(j * this.puzzleViews[i][j].size.height, i * this.puzzleViews[i][j].size.width);
        this.puzzleViews[i][j].init();
        this.puzzleViews[i][j].drawWhite();

        this.addChild(this.puzzleViews[i][j]);
      }
    }
  }

  updatePuzzlesView() {
    const puzzle = this.gameModel.puzzle;

    for (let i = 0; i < this.puzzleViews.length; i++) {
      for (let j = 0; j < this.puzzleViews[i].length; j++) {
        switch (puzzle[i][j]) {
          case BLOCK_WHITE:
            this.puzzleViews[i][j].drawWhite();
            break;
          case BLOCK_BLACK:
            this.puzzleViews[i][j].drawBlack();
            break;
          case BLOCK_X:
            this.puzzleViews[i][j].drawX();
            break;
        }
      }
    }
  }

  updatePuzzlesViewToColor() {
    console.log('updatePuzzlesViewToColor')
    const origins = this.gameModel.origins;

    console.log(origins)

    for (let i = 0; i < this.puzzleViews.length; i++) {
      for (let j = 0; j < this.puzzleViews[i].length; j++) {
        this.puzzleViews[i][j].drawColor(origins[i][j]);
      }
    }
  }

  getTouchPosition(x: number, y: number) {
    const posX = Math.floor(x / PUZZLE_WIDTH);
    const posY = Math.floor(y / PUZZLE_HEIGHT);

    if (posX < 0 || posX > 8 || posY < 0 || posY > 8) {
      console.log('failed')
      return;
    }

    return {
      posX,
      posY,
    };
  }

  touchStart(posX, posY) {
    if (posX === this.posX && posY === this.posY) {
      return;
    }

    this.posX = posX;
    this.posY = posY;

    Event.emit(EVENT_START_TOUCH_PUZZLE, posY, posX);
  }

  touchEnd(posX, posY) {
    this.posX = -1;
    this.posY = -1;
    Event.emit(EVENT_END_TOUCH_PUZZLE, posY, posX);
  }
}

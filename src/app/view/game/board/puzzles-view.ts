import * as PIXI from 'pixi.js';
import gsap from "gsap";

import {View} from "../../../../framework/view";
import {PuzzleView} from "../../component/board/puzzle/puzzle-view";
import {BLOCK_BLACK, BLOCK_WHITE, BLOCK_X} from "../../../env/block";
import {GameModel} from "../../../model/game-model";
import Event from "../../../../framework/event";
import {
  EVENT_END_TOUCH_PUZZLE,
  EVENT_INIT_PUZZLES_VIEW,
  EVENT_PLAY_CLEAR_X,
  EVENT_START_TOUCH_PUZZLE,
  EVENT_UPDATE_PUZZLE_VIEW,
  EVENT_PLAY_COLORIZE,
  EVENT_COMPLETE_PUZZLE,
  EVENT_START_PUZZLE,
  EVENT_PLAY_FULL_COLORIZE,
  EVENT_REMOVE_TOUCH_EVENT,
  EVENT_INIT_TOUCH_EVENT
} from "../../../env/event";
import Bottle from "../../../../framework/bottle";
import {PUZZLE_HEIGHT, PUZZLE_WIDTH} from "../../../env/puzzle";

export class PuzzlesView extends View {
  private puzzleViews: PuzzleView[][];
  private backgroundGraphics: PIXI.Graphics;
  private gameModel: GameModel;

  private posX: number;
  private posY: number;

  private clearXTimeline: gsap.core.Timeline;
  private colorizeTimeline: gsap.core.Timeline;
  private fullColorizeTimeline: gsap.core.Timeline;

  private isTouched: boolean = false;

  constructor() {
    super();
  }

  init() {
    this.gameModel = Bottle.get('gameModel');

    this.clearXTimeline = gsap.timeline();
    Bottle.set('clearXTimeline', this.clearXTimeline);

    this.colorizeTimeline = gsap.timeline();
    Bottle.set('colorizeTimeline', this.colorizeTimeline);

    this.fullColorizeTimeline = gsap.timeline();
    Bottle.set('fullColorizeTimeline', this.fullColorizeTimeline);

    Event.on(EVENT_INIT_PUZZLES_VIEW, () => {
      this.initPuzzlesView();
      this.updatePuzzlesView();
      Event.emit(EVENT_START_PUZZLE);
    });

    Event.on(EVENT_UPDATE_PUZZLE_VIEW, () => this.updatePuzzlesView());
    Event.on(EVENT_PLAY_COLORIZE, () => this.playColorize());
    Event.on(EVENT_PLAY_FULL_COLORIZE, () => this.playFullColorize());
    Event.on(EVENT_PLAY_CLEAR_X, () => this.playClearX());

    Event.on(EVENT_INIT_TOUCH_EVENT, () => this.initTouchEvent());
    Event.on(EVENT_REMOVE_TOUCH_EVENT, () => this.removeTouchEvent());
  }

  initTouchEvent() {
    this.on('pointerdown', (event) => {
      this.isTouched = true;

      const {x, y} = event.data.getLocalPosition(event.currentTarget)

      const {posX, posY} = this.getTouchPosition(x, y);
      this.touchStart(posX, posY);
    });

    this.on('pointermove', (event) => {
      if (!this.isTouched) {
        return;
      }

      const {x, y} = event.data.getLocalPosition(event.currentTarget);

      const {posX, posY} = this.getTouchPosition(x, y);
      this.touchStart(posX, posY);
    });

    this.on('pointerup', (event) => {
      const {x, y} = event.data.getLocalPosition(event.currentTarget);

      const {posX, posY} = this.getTouchPosition(x, y);
      this.touchEnd(posX, posY);

      this.isTouched = false;
    });
  }

  removeTouchEvent() {
    this.off('pointerstart');
    this.off('pointermove');
    this.off('pointerend');
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

  playColorize() {
    const origins = this.gameModel.origins;

    for (let i = 0; i < this.puzzleViews.length; i++) {
      for (let j = 0; j < this.puzzleViews[i].length; j++) {
        this.puzzleViews[i][j].drawColor(origins[i][j]);
      }
    }
  }

  playFullColorize() {
    const origins = this.gameModel.origins;

    for (let i = 0; i < this.puzzleViews.length; i++) {
      for (let j = 0; j < this.puzzleViews[i].length; j++) {
        this.puzzleViews[i][j].drawFullColor(origins[i][j]);
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

  playClearX() {
    const puzzle = this.gameModel.puzzle;

    for (let i = 0; i < this.puzzleViews.length; i++) {
      for (let j = 0; j < this.puzzleViews[i].length; j++) {
        switch (puzzle[i][j]) {
          case BLOCK_X:
            this.puzzleViews[i][j].clearX();
            break;
        }
      }
    }
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

import * as PIXI from 'pixi.js';

import {View} from '../../../framework/view';
import Bottle from '../../../framework/bottle';
import Event from '../../../framework/event';
import {InfoView} from "./board/info-view";
import {
  EVENT_INIT_BOARD_VIEW, EVENT_INIT_PUZZLES_VIEW, EVENT_UPDATE_BOARD_VIEW_POSITION,
} from '../../env/event';
import {GameModel} from '../../model/game-model';
import {PuzzlesView} from './board/puzzles-view';
import {HintColumnsView} from './board/hint-columns-view';
import {HintRowsView} from './board/hint-rows-view';

export class BoardView extends View {
  private backgroundGraphics: PIXI.Graphics;

  private puzzlesView: PuzzlesView;
  private hintColumnsView: HintColumnsView;
  private hintRowsView: HintRowsView;
  private infoView: InfoView;

  private gameModel: GameModel;

  private borderPadding: number = 5;
  private puzzleOffset: number = 10;

  constructor() {
    super();
  }

  public init() {
    this.gameModel = Bottle.get('gameModel');

    Event.on(EVENT_INIT_BOARD_VIEW, () => {
      this.backgroundGraphics = new PIXI.Graphics();
      this.addChild(this.backgroundGraphics);

      this.hintColumnsView = new HintColumnsView();
      this.hintColumnsView.init();
      this.addChild(this.hintColumnsView);

      this.hintRowsView = new HintRowsView();
      this.hintRowsView.init();
      this.addChild(this.hintRowsView);

      this.puzzlesView = new PuzzlesView();
      this.puzzlesView.init();
      this.addChild(this.puzzlesView);

      Bottle.set('puzzlesView', this.puzzlesView);

      this.infoView = new InfoView();
      this.infoView.init();
      this.addChild(this.infoView)

      this.backgroundGraphics.beginFill(0xffffff);
      this.backgroundGraphics.drawRoundedRect(
        0,
        0,
        this.hintRowsView.width + this.hintColumnsView.width + this.borderPadding * 2,
        this.hintColumnsView.height + this.hintRowsView.height + this.borderPadding * 2,
        8
      );

      this.puzzlesView.position = new PIXI.Point(
        this.borderPadding + this.hintRowsView.width - this.puzzleOffset,
        this.borderPadding + this.hintColumnsView.height - this.puzzleOffset
      );

      this.hintColumnsView.position = new PIXI.Point(
        this.borderPadding + this.hintRowsView.width - this.puzzleOffset,
        this.borderPadding
      );

      this.hintRowsView.position = new PIXI.Point(
        this.borderPadding,
        this.borderPadding + this.hintColumnsView.height - this.puzzleOffset
      );

      this.infoView.position = new PIXI.Point(this.borderPadding, this.borderPadding);

      Event.emit(EVENT_INIT_PUZZLES_VIEW);
      Event.emit(EVENT_UPDATE_BOARD_VIEW_POSITION);
    });
  }
}

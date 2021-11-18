import * as PIXI from 'pixi.js';
import {View} from "../../../framework/view";
import {PuzzlesView} from "./board/puzzles-view";
import Bottle from "../../../framework/bottle";
import Event from "../../../framework/event";
import {EVENT_COMPLETE_PUZZLE, EVENT_FOO, EVENT_UPDATE_PUZZLES_VIEW_TO_COLOR} from "../../env/event";

export class ClearView extends View {
  private clearGraphics: PIXI.Graphics;
  private clearText: PIXI.Text;

  private resultGraphics: PIXI.Graphics;
  private resultText: PIXI.Text;
  private puzzlesView: PuzzlesView;

  constructor() {
    super();
  }

  init() {
    this.clearGraphics = new PIXI.Graphics();
    this.addChild(this.clearGraphics);

    this.resultGraphics = new PIXI.Graphics();
    this.addChild(this.resultGraphics);

    // this.drawClear();
    // this.drawResult();

    Event.on(EVENT_COMPLETE_PUZZLE, () => this.drawResult());
  }

  drawClear() {
    const backgroundHeight = 150;
    const lineHeight = 6;

    this.clearGraphics.beginFill(0x000000);
    this.clearGraphics.drawRect(
      0,
      (this.size.height - backgroundHeight) / 2,
      this.size.width,
      backgroundHeight,
    );

    this.clearGraphics.beginFill(0x666666);
    this.clearGraphics.drawRect(
      0,
      (this.size.height - backgroundHeight) / 2 + 10,
      this.size.width,
      lineHeight,
    );

    this.clearGraphics.drawRect(
      0,
      (this.size.height + backgroundHeight) / 2 - 10 - lineHeight,
      this.size.width,
      lineHeight,
    );

    this.clearText = new PIXI.Text('CLEAR!', {
      fontFamily: 'lato',
      fill: ['#ffffff'],
      fontSize: 30,
      letterSpacing: 50,
    });

    this.clearText.anchor.x = 0.5;
    this.clearText.anchor.y = 0.5;
    this.clearText.x = this.size.width / 2;
    this.clearText.y = this.size.height / 2;
    this.addChild(this.clearText)
  }

  drawResult() {
    this.resultGraphics.beginFill(0x000000, 0.5);
    this.resultGraphics.drawRect(
      0,
      0,
      this.size.width,
      this.size.height
    );

    this.puzzlesView = Bottle.get('puzzlesView');
    this.puzzlesView.position = this.toLocal(this.puzzlesView.getGlobalPosition());
    this.addChild(this.puzzlesView);

    // move center

    this.puzzlesView.position = new PIXI.Point(
      (this.size.width - this.puzzlesView.width) / 2,
      (this.size.height - this.puzzlesView.height) / 2,
    );

    // colorize

    Event.emit(EVENT_UPDATE_PUZZLES_VIEW_TO_COLOR);

    // // move up

    this.puzzlesView.position = new PIXI.Point(
      (this.size.width - this.puzzlesView.width) / 2,
      (this.size.height - this.puzzlesView.height) / 2 - 100,
    );

    // draw bar
    this.clearGraphics.beginFill(0x000000);
    this.clearGraphics.drawRect(
      0,
      this.puzzlesView.y + this.puzzlesView.height + 20,
      this.size.width,
      40,
    );

    this.resultText = new PIXI.Text('00:00:00 Warrior', {
      fontFamily: 'lato',
      fill: ['#ffffff'],
      fontSize: 22,
      letterSpacing: 10,
    });

    this.resultText.anchor.x = 0.5;
    this.resultText.anchor.y = 0.5;
    this.resultText.x = this.size.width / 2;
    this.resultText.y = this.puzzlesView.y + this.puzzlesView.height + 37;
    this.addChild(this.resultText)
  }
}

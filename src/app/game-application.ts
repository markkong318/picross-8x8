import * as PIXI from 'pixi.js';

import {GameView} from "./view/game-view";
import {GameModel} from "./model/game-model";
import {GameController} from "./controller/game-controller";
import {Application} from "../framework/application"
import {Size} from "../framework/size";
import Bottle from "../framework/bottle";
import {Engine} from "./util/engine";
import {Ai} from "./util/ai";

export class GameApplication extends Application {
  private _gameModel: GameModel;
  private _gameController: GameController;
  private _gameView: GameView;
  private _engine: Engine;
  private _ai: Ai;

  constructor(options?) {
    super(options);
    this.preload();
  }

  public preload(): void {
    this.loader
      .load((loader, resources) => {
        this.onAssetsLoaded();
      });
  }

  public onAssetsLoaded(): void {
    this.initScene();
  }

  public initScene(): void {
    this._gameModel = new GameModel();
    Bottle.set('gameModel', this._gameModel);

    this._gameController = new GameController();

    this._gameView = new GameView();
    this._gameView.size = new Size(480, 800);
    this._gameView.init();

    this._engine = new Engine();
    Bottle.set('engine', this._engine);

    this._ai = new Ai();
    Bottle.set('ai', this._ai);

    this.stage.addChild(this._gameView);

    this.resizeView();
  }

  public resizeView(): void {
    if (this.renderer.width > this.renderer.height) {
      const scale = Math.min(this.renderer.width / this._gameView.size.width, this.renderer.height / this._gameView.size.height);

      this._gameView.scale.x = scale;
      this._gameView.scale.y = scale;

      this._gameView.x = (this.renderer.width - this._gameView.size.width * scale) / 2;
      this._gameView.y = (this.renderer.height - this._gameView.size.height * scale) / 2;
    } else {
      this._gameView.width = this.renderer.width;
      this._gameView.height = this.renderer.height;
    }
  }
}

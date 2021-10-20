import * as PIXI from 'pixi.js';

import {GameView} from "./view/game-view";
import {GameModel} from "./model/game-model";
import {GameController} from "./controller/game-controller";
import {Application} from "../framework/application"
import {Size} from "../framework/size";
import Bottle from "../framework/bottle";

export class GameApplication extends Application {
  private gameModel: GameModel;
  private gameController: GameController;
  private gameView: GameView;

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
    this.gameModel = new GameModel();
    Bottle.set('gameModel', this.gameModel);

    this.gameController = new GameController();

    this.gameView = new GameView();
    this.gameView.size = new Size(480, 800);
    this.gameView.init();

    this.stage.addChild(this.gameView);

    this.resizeView();
  }

  public resizeView(): void {
    if (this.renderer.width > this.renderer.height) {
      const scale = Math.min(this.renderer.width / this.gameView.size.width, this.renderer.height / this.gameView.size.height) / this.renderer.resolution;

      console.log("this.renderer.width: " + this.renderer.width);
      console.log("this._gameView.size: " + this.gameView.size.width);

      console.log("this.renderer.height: " + this.renderer.height);
      console.log("this._gameView.height: " + this.gameView.size.height);

      console.log("scale: " + scale);

      console.log("this._gameView.scale.x: " + this.gameView.scale.x);

      this.gameView.scale.x = scale;
      this.gameView.scale.y = scale;

      console.log("this._gameView.scale.x: " + this.gameView.scale.x);

      console.log("this._gameView.size*: " + this.gameView.size.width);

      this.gameView.x = (this.renderer.width - this.gameView.size.width * scale * this.renderer.resolution) / 2 / this.renderer.resolution;
      this.gameView.y = (this.renderer.height - this.gameView.size.height * scale * this.renderer.resolution) / 2 / this.renderer.resolution;
    } else {
      console.log("hello");
      this.gameView.width = this.renderer.width;
      this.gameView.height = this.renderer.height;
    }
  }
}
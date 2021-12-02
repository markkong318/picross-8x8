import * as PIXI from 'pixi.js';

import {View} from "../../../framework/view";
import Bottle from '../../../framework/bottle';

export class BackView extends View {
  private gradientSprite: PIXI.Sprite;

  private layer1Len: number;
  private layer1ColumnCount: number;
  private layer1RowCount: number;

  private renderer;

  constructor() {
    super();
  }

  public init() {
    this.renderer = Bottle.get('renderer');

    this.drawBackground();
    this.drawRectLayer1();
    this.drawRectLayer2();
  }

  drawBackground() {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const gradient = ctx.createLinearGradient(0, 0, this.size.width, this.size.height)

    canvas.setAttribute('width', `${this.size.width}`)
    canvas.setAttribute('height', `${this.size.height}`)

    gradient.addColorStop(0, '#acb6e5')
    gradient.addColorStop(1, '#86fde8')

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, this.size.width, this.size.height)

    this.gradientSprite = PIXI.Sprite.from(canvas);

    this.addChild(this.gradientSprite);
  }

  drawRectLayer1() {
    // const graphics = new PIXI.Graphics();
    //
    // graphics.beginFill(0x000000, 0.5);
    // graphics.drawRoundedRect(0, 0, 64, 64, 10);
    //
    // const texture = this.renderer.generateTexture(graphics);
    //
    //
    // const sprite = new PIXI.Sprite(texture);
    // sprite.position = new PIXI.Point(150, 150);
    // sprite.angle = 45;
    //
    // console.log("rec: " + sprite.width + " x " + sprite.height);
    // console.log(sprite.getBounds());
    //
    // this.addChild(sprite);

    const columnCount = 6;
    const len = Math.ceil(this.size.width / (columnCount - 2));
    const rowCount = Math.ceil(this.size.height / len) + 2;
    const rectLen = Math.pow(Math.pow(len, 2) / 2, 0.5);

    const graphics = new PIXI.Graphics();

    graphics.beginFill(0x000000, 0.2);
    graphics.drawRoundedRect(0, 0, rectLen, rectLen, 10);

    const texture = this.renderer.generateTexture(graphics);

    for (let i = 0; i < columnCount; i++) {
      for (let j = 0; j < rowCount; j++) {
        const sprite = new PIXI.Sprite(texture);
        sprite.anchor.x = 0.5;
        sprite.anchor.y = 0.5;
        sprite.position = new PIXI.Point(i * len, j * len);
        sprite.angle = 45;
        this.addChild(sprite);

        const sprite2 = new PIXI.Sprite(texture);
        sprite2.anchor.x = 0.5;
        sprite2.anchor.y = 0.5;
        sprite2.position = new PIXI.Point(i * len + len / 2, j * len + len / 2);
        sprite2.angle = 45;
        this.addChild(sprite2);
      }
    }

    this.layer1Len = len;
    this.layer1ColumnCount = columnCount;
    this.layer1RowCount = rowCount;

    // // graphics.position = new PIXI.Point(150, 150);
    // // this.addChild(graphics);
    // //
    // const texture = this.renderer.generateTexture(graphics);
    // // const sprite = new PIXI.Sprite(texture);
    // // sprite.position = new PIXI.Point(150, 150);
    // // this.addChild(sprite);
    //
    // const D8 = PIXI.groupD8;
    //
    // const h = D8.isVertical(2) ? texture.frame.width : texture.frame.height;
    // const w = D8.isVertical(2) ? texture.frame.height : texture.frame.width;
    //
    // var frame = texture.frame;
    // var crop = new PIXI.Rectangle(texture.frame.x, texture.frame.y, w, h);
    // var trim = crop;
    // const texture2 = new PIXI.Texture(texture, frame, crop, trim, 2);
    //
    // const graphics2 = new PIXI.Graphics();
    // graphics2.beginTextureFill({ texture:texture });
    // graphics2.drawRoundedRect(0, 0, 480, 480, 10);
    // // graphics2.drawCircle(0, 0, 15);
    // graphics2.endFill();
    // graphics2.position = new PIXI.Point(150, 150);
    //
    // this.addChild(graphics2);
  }

  drawRectLayer2() {
    const len = this.layer1Len;
    const columnCount = this.layer1ColumnCount;
    const rowCount = this.layer1RowCount;

    const graphics = new PIXI.Graphics();

    graphics.beginFill(0x000000, 0.2);
    graphics.drawRoundedRect(0, 0, Math.ceil(len / 2), Math.ceil(len / 2), 10);

    const texture = this.renderer.generateTexture(graphics);

    for (let i = 0; i < columnCount; i++) {
      for (let j = 0; j < rowCount; j++) {
        const sprite = new PIXI.Sprite(texture);
        sprite.anchor.x = 0.5;
        sprite.anchor.y = 0.5;
        sprite.position = new PIXI.Point(i * len + (len / 2), j * len);
        sprite.angle = 45;
        this.addChild(sprite);

        const sprite2 = new PIXI.Sprite(texture);
        sprite2.anchor.x = 0.5;
        sprite2.anchor.y = 0.5;
        sprite2.position = new PIXI.Point(i * len, j * len + len / 2);
        sprite2.angle = 45;
        this.addChild(sprite2);
      }
    }
  }
}

import * as PIXI from 'pixi.js';
import gsap from 'gsap';

import {View} from '../../../framework/view';
import Bottle from '../../../framework/bottle';
import Event from '../../../framework/event';
import {EVENT_PLAY_CLEAN_BACKGROUND} from '../../env/event';

export class BackView extends View {
  private gradientSprite: PIXI.Sprite;

  private layer1Len: number;
  private layer1ColumnCount: number;
  private layer1RowCount: number;

  private layer1Container: PIXI.Container;
  private layer2Container: PIXI.Container;

  private renderer;

  private timeline: gsap.core.Timeline;

  constructor() {
    super();
  }

  public init() {
    this.renderer = Bottle.get('renderer');
    this.timeline = gsap.timeline();

    this.drawBackground();
    this.drawRectLayer1();
    this.drawRectLayer2();

    Event.on(EVENT_PLAY_CLEAN_BACKGROUND, () => {
      this.clearRectLayer1();
      this.clearRectLayer2();
    });
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
    this.layer1Container = new PIXI.Container();

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
        this.layer1Container.addChild(sprite);

        const sprite2 = new PIXI.Sprite(texture);
        sprite2.anchor.x = 0.5;
        sprite2.anchor.y = 0.5;
        sprite2.position = new PIXI.Point(i * len + len / 2, j * len + len / 2);
        sprite2.angle = 45;
        this.layer1Container.addChild(sprite2);
      }
    }

    this.addChild(this.layer1Container);

    this.layer1Len = len;
    this.layer1ColumnCount = columnCount;
    this.layer1RowCount = rowCount;
  }

  clearRectLayer1() {
    this.timeline
      .to(this.layer1Container, {
        duration: 1,
        pixi: {
          alpha: 0,
        }
      }, 0);
  }

  drawRectLayer2() {
    this.layer2Container = new PIXI.Container();

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
        this.layer2Container.addChild(sprite);

        const sprite2 = new PIXI.Sprite(texture);
        sprite2.anchor.x = 0.5;
        sprite2.anchor.y = 0.5;
        sprite2.position = new PIXI.Point(i * len, j * len + len / 2);
        sprite2.angle = 45;
        this.layer2Container.addChild(sprite2);
      }
    }

    this.addChild(this.layer2Container);
  }

  clearRectLayer2() {
    this.timeline
      .to(this.layer2Container, {
        duration: 1,
        pixi: {
          alpha: 0,
        }
      }, 0);
  }
}

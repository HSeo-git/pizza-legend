import LowerImage from "../../images/maps/DemoLower.png";
import UpperImage from "../../images/maps/DemoUpper.png";
import KitchenLower from "../../images/maps/KitchenLower.png";
import KitchenUpper from "../../images/maps/KitchenUpper.png";
import Npc1 from "../../images/avatars/npc1.png";
import Npc2 from "../../images/avatars/npc2.png";
import GameObject from "./GameObject";
import utils from "../../utils/utils";
import { urlToHttpOptions } from "url";
import Person from "./Person";

class OverworldMap {
  private gameObjects: any;
  private lowerImage: HTMLImageElement;
  private upperImage: HTMLImageElement;
  private walls: any;
  constructor(config: any) {
    this.gameObjects = config.gameObjects;

    this.walls = config.walls || {};

    this.lowerImage = new Image(); //아바타 밑에 레이어
    this.lowerImage.src = config.lowerSrc;

    this.upperImage = new Image(); //아바타 위에 있어야하는 레이어
    this.upperImage.src = config.upperSrc;
  }
  drawLowerImage(ctx: any, cameraPerson: any) {
    //camera 이동 위한 offset
    const cameraOffsetX = utils.withGrid(10.5) - cameraPerson.x;
    const cameraOffsetY = utils.withGrid(6) - cameraPerson.y;
    ctx.drawImage(this.lowerImage, cameraOffsetX, cameraOffsetY);
  }
  drawUpperImage(ctx: any, cameraPerson: any) {
    const cameraOffsetX = utils.withGrid(10.5) - cameraPerson.x;
    const cameraOffsetY = utils.withGrid(6) - cameraPerson.y;
    ctx.drawImage(this.upperImage, cameraOffsetX, cameraOffsetY);
  }
  //향하는 곳에 Object가 있는지 확인
  isSpaceTaken(currentX: number, currentY: number, direction: string) {
    const { x, y } = utils.nextPosition(currentX, currentY, direction);
    return this.walls[`${x},${y}`] || false;
  }
}

window.OverworldMaps = {
  DemoRoom: {
    lowerSrc: LowerImage,
    upperSrc: UpperImage,
    gameObjects: {
      hero: new Person({
        isPlayerControlled: true,
        x: utils.withGrid(5),
        y: utils.withGrid(6),
      }),
      npc1: new Person({
        x: utils.withGrid(7),
        y: utils.withGrid(9),
        src: Npc1,
      }),
    },
    walls: {
      // "16,16": true
      [utils.asGridCoords(7, 6)]: true,
      [utils.asGridCoords(8, 6)]: true,
      [utils.asGridCoords(7, 7)]: true,
      [utils.asGridCoords(8, 7)]: true,
    },
  },
  Kitchen: {
    lowerSrc: KitchenLower,
    upperSrc: KitchenUpper,
    gameObjects: {
      hero: new Person({
        x: utils.withGrid(3),
        y: utils.withGrid(5),
      }),
      npcA: new Person({
        x: utils.withGrid(9),
        y: utils.withGrid(6),
        src: Npc1,
      }),
      npcB: new Person({
        x: utils.withGrid(10),
        y: utils.withGrid(8),
        src: Npc2,
      }),
    },
  },
};

export default OverworldMap;

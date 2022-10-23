import DemoMap from "../../images/maps/DemoLower.png";
import Hero from "../../images/avatars/hero.png";
import Shadow from "../../images/items/shadow.png";
import Npc1 from "../../images/avatars/npc1.png";
import GameObject from "./GameObject";
import OverworldMap from "./OverworldMap";
import gameObject from "./GameObject";
import DirectionInput from "./DirectionInput";

class Overworld {
  private element: any;
  private canvas: any;
  private ctx: any;
  private map: any;
  private directionInput: DirectionInput;
  constructor(config: any) {
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.map = null;
    this.directionInput = new DirectionInput();
  }

  startGameLoop() {
    const step = () => {
      //Clear off the canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      //Establish the camera person
      const cameraPerson = this.map.gameObjects.hero;

      //Update all objects
      Object.values(this.map.gameObjects).forEach((object) => {
        if (object instanceof gameObject) {
          object.update({
            arrow: this.directionInput.direction,
            map: this.map,
          });
        }
      });
      //Draw Lower Layer
      this.map.drawLowerImage(this.ctx, cameraPerson);

      //Draw Game Objects
      Object.values(this.map.gameObjects).forEach((object) => {
        if (object instanceof gameObject) {
          object.sprite.draw(this.ctx, cameraPerson);
        }
      });

      //Draw Upper Layer
      this.map.drawUpperImage(this.ctx, cameraPerson);

      requestAnimationFrame(() => {
        step();
      });
    };
    step();
  }

  init() {
    this.map = new OverworldMap(window.OverworldMaps.DemoRoom);
    this.map.mountObjects();
    this.directionInput.init();
    this.startGameLoop();
    // const image = new Image();
    // //browser memory에 image를 먼저 올려야함
    // image.onload = () => {
    //   this.ctx.drawImage(image, 0, 0);
    // };
    // image.src = DemoMap;
    //
    // //Place some Game Objects!
    // const hero = new GameObject({
    //   x: 5,
    //   y: 6,
    // });
    // const npc1 = new GameObject({
    //   x: 7,
    //   y: 9,
    //   src: Npc1,
    // });
    //
    // //image.onload시간 걸리니까 맞춰주려고 -> 나중에 game loop 돌릴 예정
    // setTimeout(() => {
    //   hero.sprite.draw(this.ctx);
    //   npc1.sprite.draw(this.ctx);
    // }, 200);

    // const x = 5;
    // const y = 6;
    // const cellSize = 16; //한 칸의 넓이&높이(grid based)
    // const adjustedWidth = 8; //캐릭터가 한 칸 안에 들어오도록(캐릭터 32px, cell 16px라 캐릭터가 칸 넘어감)
    // const adjustedHeight = 18;
    //
    // const shadow = new Image();
    // shadow.onload = () => {
    //   this.ctx.drawImage(
    //     shadow,
    //     0, //sprite cropping start지점 left cut
    //     0, // top cut
    //     32, //width of cut
    //     32, //height of cut
    //     x * cellSize - adjustedWidth, //캐릭터 위치
    //     y * cellSize - adjustedHeight, //캐릭터 위치
    //     32,
    //     32
    //   );
    // };
    // shadow.src = Shadow;
    //
    // const hero = new Image();
    // hero.onload = () => {
    //   this.ctx.drawImage(
    //     hero,
    //     0, //sprite cropping start지점 left cut
    //     0, // top cut
    //     32, //width of cut
    //     32, //height of cut
    //     x * cellSize - adjustedWidth, //캐릭터 위치
    //     y * cellSize - adjustedHeight, //캐릭터 위치
    //     32,
    //     32
    //   );
    // };
    // hero.src = Hero;
  }
}

export default Overworld;

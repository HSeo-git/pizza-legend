import Shadow from "../../images/items/shadow.png";
import utils from "../../utils/utils";

class Sprite {
  private animations: any;
  private currentAnimation: string;
  private currentAnimationFrame: number;
  private image: HTMLImageElement;
  private isLoaded: boolean;
  private gameObject: any;
  private shadow: HTMLImageElement;
  private isShadowLoaded: boolean;
  private useShadow: boolean;
  private animationFrameLimit: number;
  private animationFrameProgress: number;
  constructor(config: any) {
    //Set up the image
    this.image = new Image();
    this.image.src = config.src;
    this.isLoaded = false;
    this.isShadowLoaded = false;
    this.image.onload = () => {
      this.isLoaded = true;
    };

    //Shadow
    this.shadow = new Image();
    this.useShadow = true; //config.useShadow || false로 나중에 shadow 쓰는 거 선택 가능
    if (this.useShadow) {
      this.shadow.src = Shadow;
    }
    this.shadow.onload = () => {
      this.isShadowLoaded = true;
    };

    //Configure Animation & Initial State
    //동작에 따라 sprite의 어떤 이미지를 보여줄지
    this.animations = config.animations || {
      "idle-down": [[0, 0]],
      "idle-right": [[0, 1]],
      "idle-up": [[0, 2]],
      "idle-left": [[0, 3]],
      "walk-down": [
        [1, 0],
        [0, 0],
        [3, 0],
        [0, 0],
      ],
      "walk-right": [
        [1, 1],
        [0, 1],
        [3, 1],
        [0, 1],
      ],
      "walk-up": [
        [1, 2],
        [0, 2],
        [3, 2],
        [0, 2],
      ],
      "walk-left": [
        [1, 3],
        [0, 3],
        [3, 3],
        [0, 3],
      ],
    };
    this.currentAnimation = config.currentAnimation || "idle-down";
    this.currentAnimationFrame = 0; //animations의 동작 배열 원소 중에서 보여줄 것

    this.animationFrameLimit = config.animationFrameLimit || 16;
    this.animationFrameProgress = this.animationFrameLimit;

    //Reference the game object
    this.gameObject = config.gameObject;
  }

  get frame() {
    return this.animations[this.currentAnimation][this.currentAnimationFrame];
  }

  setAnimation(key: any) {
    if (this.currentAnimation !== key) {
      this.currentAnimation = key;
      this.currentAnimationFrame = 0;
      this.animationFrameProgress = this.animationFrameLimit;
    }
  }

  updateAnimationProgress() {
    //Downtick frame progress
    if (this.animationFrameProgress > 0) {
      this.animationFrameProgress -= 1;
      return;
    }

    //reset the counter
    this.animationFrameProgress = this.animationFrameLimit;
    this.currentAnimationFrame += 1;

    if (this.frame === undefined) {
      this.currentAnimationFrame = 0;
    }
  }

  draw(ctx: any, cameraPerson: any) {
    // const cellSize = 16; //한 칸의 넓이&높이(grid based)
    const adjustedWidth = 8; //캐릭터가 한 칸 안에 들어오도록(캐릭터 32px, cell 16px라 캐릭터가 칸 넘어감)
    const adjustedHeight = 18;
    //User중심 카메라 이동을 위해 게임화면 중앙에 오게하는 offset
    const cameraOffsetX = utils.withGrid(10.5) - cameraPerson.x;
    const cameraOffsetY = utils.withGrid(6) - cameraPerson.y;

    //위치 지정
    const x = this.gameObject.x - adjustedWidth + cameraOffsetX;
    const y = this.gameObject.y - adjustedHeight + cameraOffsetY;
    //canvas layering은 별도 처리가 있는 것이 아니라, 순서에 따라 차례로 쌓아나가는 것
    this.isShadowLoaded === true && ctx.drawImage(this.shadow, x, y);

    const [frameX, frameY] = this.frame;

    this.isLoaded === true &&
      ctx.drawImage(this.image, frameX * 32, frameY * 32, 32, 32, x, y, 32, 32);

    this.updateAnimationProgress();
  }
}

export default Sprite;

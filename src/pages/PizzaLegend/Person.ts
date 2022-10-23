import GameObject from "./GameObject";

class Person extends GameObject {
  private movingProgressRemaining: number;
  private directionUpdate: {
    left: (string | number)[];
    up: (string | number)[];
    right: (string | number)[];
    down: (string | number)[];
  };
  private isPlayerControlled: any;
  constructor(config: any) {
    super(config);
    this.movingProgressRemaining = 0;

    this.isPlayerControlled = config.isPlayerControlled || false;

    this.directionUpdate = {
      up: ["y", -1],
      down: ["y", 1],
      left: ["x", -1],
      right: ["x", 1],
    };
  }

  update(state: any) {
    if (this.movingProgressRemaining > 0) {
      this.updatePosition();
    } else {
      //more cases for starting to walk will come here
      //
      //Case: 사용자 input 가능 and have an arrow pressed
      if (this.isPlayerControlled && state.arrow) {
        this.startBehavior(state, {
          type: "walk",
          direction: state.arrow,
        });
      }
      this.updateSprite();
    }
  }
  startBehavior(state: any, behavior: any) {
    //Set Character direction to whatever behavior is
    this.direction = behavior.direction;
    if (behavior.type === "walk") {
      //stop if space is not free
      if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {
        return;
      }
      //ready to walk
      //wall이 움직이도록(움직이지 않으면 hero의 원래 위치에 wall이 있어서 거기로 못 감)
      state.map.moveWall(this.x, this.y, this.direction);
      this.movingProgressRemaining = 16;
    }
  }

  updatePosition() {
    // @ts-ignore
    const [property, change] = this.directionUpdate[this.direction];
    // @ts-ignore
    this[property] += change;
    this.movingProgressRemaining -= 1;
  }

  updateSprite() {
    if (this.movingProgressRemaining > 0) {
      this.sprite.setAnimation("walk-" + this.direction);
      return;
    }
    this.sprite.setAnimation("idle-" + this.direction);
  }
}

export default Person;

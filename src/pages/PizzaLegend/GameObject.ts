import Sprite from "./Sprite";
import Hero from "../../images/avatars/hero.png";

class GameObject {
  public x: number;
  public y: number;
  public sprite: any;
  public direction: string;
  constructor(config: any) {
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.direction = config.direction || "down";
    this.sprite = new Sprite({ gameObject: this, src: config.src || Hero });
  }

  update(param: {}) {}
}

export default GameObject;

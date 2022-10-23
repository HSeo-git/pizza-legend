class DirectionInput {
  private heldDirections: any[];
  private map: {
    ArrowLeft: string;
    ArrowUp: string;
    ArrowRight: string;
    ArrowDown: string;
  };
  constructor() {
    this.heldDirections = [];

    this.map = {
      ArrowUp: "up",
      ArrowDown: "down",
      ArrowLeft: "left",
      ArrowRight: "right",
    };
  }

  get direction() {
    return this.heldDirections[0];
  }

  init() {
    document.addEventListener("keydown", (e) => {
      // @ts-ignore
      const dir = this.map[e.code];
      if (dir && this.heldDirections.indexOf(dir) === -1) {
        this.heldDirections.unshift(dir);
      }
    });
    document.addEventListener("keyup", (e) => {
      // @ts-ignore
      const dir = this.map[e.code];
      const index = this.heldDirections.indexOf(dir);
      if (index > -1) {
        this.heldDirections.splice(index, 1);
      }
    });
  }
}

export default DirectionInput;

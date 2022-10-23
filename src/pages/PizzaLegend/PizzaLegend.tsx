import Overworld from "./Overworld";
import { useEffect, useRef } from "react";

const PizzaLegend = () => {
  const gameContainerRef = useRef(document.createElement("div"));

  useEffect(() => {
    const overworld = new Overworld({
      element: gameContainerRef.current,
    });
    overworld.init();
  }, [gameContainerRef]);

  return (
    <div
      className="relative w-[352px] h=[198px] border border-white m-auto scale-[2] translate-y-[60%]"
      ref={gameContainerRef}
    >
      <canvas className="game-canvas" width="352" height="198"></canvas>
    </div>
  );
};

export default PizzaLegend;

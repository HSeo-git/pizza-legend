import { useCallback, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import myImage from "../images/avatars/Ghost.png";
import { directionState } from "../recoil/atoms/direction";

const SimpleTest = () => {
  const canvasRef = useRef(document.createElement("canvas"));
  const [direction, setDirection] = useRecoilState(directionState);
  const draw = useCallback(() => {
    const img = new Image();
    img.src = myImage;
    const frameWidth = 32;
    const frameHeight = 32;
    let row = 0;
    //column 번호를 바꾸면서 sprite img의 모습을 순서대로 바꾸기 가능
    let column = 0;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    //종횡비 유지를 위해서는 너비와 높이를 같은 크기로 조정 필요
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    //잔상 없애줘야함 : ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      column * frameWidth,
      row * frameHeight,
      frameWidth,
      frameHeight,
      11,
      30,
      frameWidth,
      frameHeight
    );
  }, [canvasRef]);

  useEffect(() => {
    //이미지 요소가 소스 를 로드 하는 데 시간이 걸림
    //페이지와 모든 리소스가 완전히 로드될 때까지 기다리면 해결가능
    (window.onload = () => {
      draw();
    })();
  }, []);

  //37 L, 38 U, 39 R, 40 D
  const arrowKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!arrowKeys.includes(e.key)) return;
      setDirection(direction + 1);
      alert(direction);
      draw();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div className="">
      <canvas ref={canvasRef} width="150" height="200"></canvas>
    </div>
  );
};

export default SimpleTest;

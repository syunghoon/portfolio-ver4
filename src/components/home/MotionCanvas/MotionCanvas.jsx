// React의 useEffect와 useRef 훅을 가져옵니다.
import React, { useEffect, useRef } from "react";
// p5.js 라이브러리를 가져옵니다.
import p5 from "p5";
// matter-js 물리 엔진 라이브러리를 가져옵니다.
import Matter from "matter-js";
// 게시물 데이터를 가져옵니다.
import postsData from "../../../data/posts.json";

// Matter.js에서 필요한 모듈들을 구조 분해 할당으로 가져옵니다.
const { Engine, Composite, Bodies, Body } = Matter;

function MotionCanvas() {
  // p5.js 캔버스를 마운트할 DOM 요소를 참조하기 위해 useRef를 사용합니다.
  const canvasRef = useRef(null);

  // 컴포넌트가 마운트될 때 한 번만 실행되는 useEffect 훅입니다.
  useEffect(() => {
    // p5.js 스케치를 정의하는 함수입니다. p5 인스턴스를 인자로 받습니다.
    const sketch = (p) => {
      // posts.json에서 'type' 속성이 있는 게시물의 수를 계산합니다.
      const postsWithTypes = postsData.filter((post) => post.type);

      // 물리 엔진 세계에 추가될 상자(도형)들을 담을 배열입니다.
      const boxes = [];
      // Matter.js 물리 엔진 인스턴스입니다.
      let engine;
      // 바닥 역할을 할 정적 객체입니다.
      let ground;
      // 프레임 카운터를 저장하여 도형 생성 간격을 조절합니다.
      let frameCounter = 0;

      // p5.js의 setup 함수입니다. 스케치가 시작될 때 한 번 실행됩니다.
      p.setup = () => {
        // 윈도우 너비와 높이 200의 캔버스를 생성합니다.
        p.createCanvas(p.windowWidth, p.windowHeight/2);
        // 물리 엔진을 생성합니다.
        engine = Engine.create();
        // p5.js에서 사각형을 그릴 때 중앙을 기준으로 그리도록 설정합니다.
        p.rectMode(p.CENTER);

        // 바닥 객체를 생성합니다. isStatic: true는 움직이지 않는 고정 객체로 만듭니다.
        ground = Bodies.rectangle(p.width / 2, p.height, p.width, 20, {
          isStatic: true,
        });

        // 생성된 바닥 객체를 물리 엔진 세계에 추가합니다.
        Composite.add(engine.world, [ground]);

        // 브라우저 창 크기가 변경될 때 호출되는 p5.js 이벤트 함수입니다.
        p.windowResized = () => {
          // 캔버스 크기를 윈도우 너비에 맞게 조절합니다.
          p.resizeCanvas(p.windowWidth, 200);
          // 바닥 객체의 위치를 새 캔버스 크기에 맞게 재조정합니다.
          Body.setPosition(ground, { x: p.width / 2, y: p.height });
        };
      };

      // p5.js의 draw 함수입니다. 매 프레임마다 계속해서 실행됩니다.
      p.draw = () => {
        // 매 프레임마다 물리 엔진을 업데이트하여 물리 계산을 수행합니다.
        Engine.update(engine);
        // 캔버스 배경을 지정된 색으로 칠합니다.
        p.clear();

        // 30프레임마다(일정 시간 간격) 그리고 생성된 상자 수가 총 게시물 수보다 적을 때 새 상자를 추가합니다.
        if (frameCounter % 30 === 0 && boxes.length < postsWithTypes.length) {
          // 생성될 도형에 해당하는 게시물 정보를 가져옵니다.
          const post = postsWithTypes[boxes.length];
          // 캔버스 너비의 20% ~ 80% 사이에서 랜덤한 x 위치를 결정합니다.
          const x = p.random(p.width * 0.2, p.width * 0.8);
          // 새로운 사각형 객체를 생성합니다.
          const box = Bodies.rectangle(x, -30, 30, 30);
          // 생성된 도형 객체에 해당 게시물의 slug 정보를 추가합니다.
          box.slug = post.slug;
          // 상자에 약간의 회전력을 주어 더 자연스럽게 떨어지게 합니다.
          Body.setAngularVelocity(box, p.random(-0.1, 0.1));
          // 생성된 상자를 boxes 배열에 추가합니다.
          boxes.push(box);
          // 생성된 상자를 물리 엔진 세계에 추가합니다.
          Composite.add(engine.world, box);
        }

        // boxes 배열에 있는 모든 상자를 순회하며 화면에 그립니다.
        for (let i = 0; i < boxes.length; i++) {
          const box = boxes[i];
          const post = postsWithTypes[i];

          // p5.js의 현재 그리기 설정을 저장합니다.
          p.push();
          // Matter.js 객체의 위치로 p5.js 좌표계를 이동합니다.
          p.translate(box.position.x, box.position.y);

          // Matter.js 객체의 각도만큼 p5.js 좌표계를 회전합니다.
          p.rotate(box.angle);

          let size = 30;
          // 도형의 채우기 색상을 설정합니다.
          let fillColor = p.color(200);

          if (post.type === "Projects") {
            fillColor = p.color(255, 0, 0); // 빨간색
            size = 40;
          } else if (post.type === "Lab") {
            fillColor = p.color(255, 165, 0); // 주황색
            size = 30;
          } else if (post.type === "Blog") {
            fillColor = p.color(0, 255, 0); // 초록색
            size = 20;
          }

          // 도형의 테두리 색상을 설정합니다.
          p.stroke(150);

          p.fill(fillColor);
          // 이동 및 회전된 좌표계의 (0,0)에 사각형을 그립니다.
          p.rect(0, 0, size, size);
          // 저장했던 그리기 설정을 복원합니다.
          p.pop();
        }

        // 다음 도형 생성을 위해 프레임 카운터를 증가시킵니다.
        frameCounter++;
      };
    };

    // 기존 캔버스가 있다면 제거하여 중복 생성을 방지합니다.
    if (canvasRef.current) {
      canvasRef.current.innerHTML = "";
    }

    // 정의된 스케치로 새로운 p5 인스턴스를 생성하고, canvasRef.current에 연결합니다.
    const p5Instance = new p5(sketch, canvasRef.current);

    // 컴포넌트가 언마운트될 때 p5 인스턴스를 제거하여 메모리 누수를 방지합니다.
    return () => {
      p5Instance.remove();
    };
  }, []); // 빈 배열을 전달하여 이 useEffect가 컴포넌트 마운트 시 한 번만 실행되도록 합니다.

  // 렌더링될 JSX입니다. p5 캔버스가 이 div 내부에 생성됩니다.
  return <div ref={canvasRef} className="motion-canvas-container" />;
}

export default MotionCanvas;

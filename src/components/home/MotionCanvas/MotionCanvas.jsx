// React의 useEffect와 useRef 훅을 가져옵니다.
import { useEffect, useRef, useState } from "react";
// p5.js 라이브러리를 가져옵니다.
import p5 from "p5";
// matter-js 물리 엔진 라이브러리를 가져옵니다.
import Matter from "matter-js";
// 게시물 데이터를 가져옵니다.
import postsData from "../../../data/posts.json";
import { useNavigate } from "react-router-dom";

// Matter.js에서 필요한 모듈들을 구조 분해 할당으로 가져옵니다.
const { Engine, Composite, Bodies, Body, Query } = Matter;

function MotionCanvas() {
  // p5.js 캔버스를 마운트할 DOM 요소를 참조하기 위해 useRef를 사용합니다.
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const [hoveredPost, setHoveredPost] = useState(null);

  // 컴포넌트가 마운트될 때 한 번만 실행되는 useEffect 훅입니다.
  useEffect(() => {
    // p5.js 스케치를 정의하는 함수입니다. p5 인스턴스를 인자로 받습니다.
    const sketch = (p) => {
      // posts.json에서 'type' 속성이 있는 게시물의 수를 계산합니다.
      const postsWithTypes = postsData.filter((post) => post.type);

      // 물리 엔진 세계에 추가될 상자(도형)들을 담을 배열입니다.
      const shapes = [];
      // Matter.js 물리 엔진 인스턴스입니다.
      let engine;
      // 바닥 역할을 할 정적 객체입니다.
      let ground;
      // 벽 역할을 할 정적 객체입니다.
      let leftWall;
      let rightWall;
      // 프레임 카운터를 저장하여 도형 생성 간격을 조절합니다.
      let frameCounter = 0;

      // p5.js의 setup 함수입니다. 스케치가 시작될 때 한 번 실행됩니다.
      p.setup = () => {
        // 부모 컨테이너의 크기를 가져와서 캔버스를 생성합니다.
        const containerWidth = canvasRef.current?.offsetWidth || p.windowWidth / 2;
        const containerHeight = p.windowHeight / 1.5;
        p.createCanvas(containerWidth, containerHeight);
        // 물리 엔진을 생성합니다.
        engine = Engine.create();
        // p5.js에서 사각형을 그릴 때 중앙을 기준으로 그리도록 설정합니다.
        p.rectMode(p.CENTER);

        // 바닥 객체를 생성합니다. isStatic: true는 움직이지 않는 고정 객체로 만듭니다.
        ground = Bodies.rectangle(p.width / 2, p.height, p.width, 20, {
          isStatic: true,
        });
        
        // 왼쪽 벽 생성
        leftWall = Bodies.rectangle(0, p.height / 2, 20, p.height * 2, {
          isStatic: true,
        });

        // 오른쪽 벽 생성
        rightWall = Bodies.rectangle(p.width, p.height / 2, 20, p.height * 2, {
          isStatic: true,
        });

        // 생성된 바닥과 벽 객체를 물리 엔진 세계에 추가합니다.
        Composite.add(engine.world, [ground, leftWall, rightWall]);

        // 브라우저 창 크기가 변경될 때 호출되는 p5.js 이벤트 함수입니다.
        p.windowResized = () => {
          // 부모 컨테이너의 크기에 맞게 캔버스 크기를 조절합니다.
          const newWidth = canvasRef.current?.offsetWidth || p.windowWidth / 2;
          const newHeight = p.windowHeight / 1.5;
          p.resizeCanvas(newWidth, newHeight);
          // 바닥 객체의 위치를 새 캔버스 크기에 맞게 재조정합니다.
          Body.setPosition(ground, { x: p.width / 2, y: p.height });
          // 벽 위치 재조정
          Body.setPosition(leftWall, { x: 0, y: p.height / 2 });
          Body.setPosition(rightWall, { x: p.width, y: p.height / 2 });
        };
      };

      // p5.js의 draw 함수입니다. 매 프레임마다 계속해서 실행됩니다.
      p.draw = () => {
        // 매 프레임마다 물리 엔진을 업데이트하여 물리 계산을 수행합니다.
        Engine.update(engine);
        // 캔버스 배경을 지정된 색으로 칠합니다.
        p.clear();

        // 마우스 호버 감지
        const mousePosition = { x: p.mouseX, y: p.mouseY };
        const hoveredBodies = Query.point(shapes, mousePosition);

        if (hoveredBodies.length > 0) {
          p.cursor("pointer");
          const body = hoveredBodies[0];
          setHoveredPost({
            title: body.title,
            x: p.mouseX,
            y: p.mouseY,
          });
        } else {
          p.cursor("default");
          setHoveredPost(null);
        }

        // 30프레임마다(일정 시간 간격) 그리고 생성된 상자 수가 총 게시물 수보다 적을 때 새 상자를 추가합니다.
        if (frameCounter % 20 === 0 && shapes.length < postsWithTypes.length) {
          // 생성될 도형에 해당하는 게시물 정보를 가져옵니다.
          const post = postsWithTypes[shapes.length];
          // 캔버스 너비의 20% ~ 80%   랜덤한 x 위치를 결정합니다.
          const x = p.random(p.width * 0.1, p.width * 0.9);
          
          let size = 30;
          let sides = 4; // Default square

          if (post.type === "Projects") {
            size = 200;
            sides = 6; // Hexagon
          } else if (post.type === "Lab") {
            size = 150;
            sides = 5; // Pentagon
          } else if (post.type === "Blog") {
            size = 60;
            sides = 4; // Square
          }

          // 새로운 다각형 객체를 생성합니다. (x, y, sides, radius)
          const polygon = Bodies.polygon(x, -50, sides, size / 2, {
            restitution: 0.5, // 탄성 (0~1)
            friction: 0.01,   // 마찰
          });
          
          // 생성된 도형 객체에 해당 게시물의 slug와 type 정보를 추가합니다.
          polygon.slug = post.slug;
          polygon.title = post.title; // 툴팁용 제목
          polygon.postType = post.type; // 렌더링 시 색상 결정을 위해 저장
          polygon.sides = sides; // 렌더링 시 꼭짓점 개수
          polygon.radius = size / 2; // 렌더링 시 반지름
          
          // 생성된 상자를 shapes 배열에 추가합니다.
          shapes.push(polygon);
          // 생성된 상자를 물리 엔진 세계에 추가합니다.
          Composite.add(engine.world, polygon);
        }

        // shapes 배열에 있는 모든 상자를 순회하며 화면에 그립니다.
        for (let i = 0; i < shapes.length; i++) {
          const shape = shapes[i];
          const radius = shape.radius;
          const sides = shape.sides;

          // p5.js의 현재 그리기 설정을 저장합니다.
          p.push();
          // Matter.js 객체의 위치로 p5.js 좌표계를 이동합니다.
          p.translate(shape.position.x, shape.position.y);
          // Matter.js 객체의 각도만큼 p5.js 좌표계를 회전합니다.
          p.rotate(shape.angle);

          let fillColor = "#e5e7eb"; // Default
          if (shape.postType === "Projects") fillColor = "#3AEF86";
          else if (shape.postType === "Lab") fillColor = "#A09B88";
          else if (shape.postType === "Blog") fillColor = "#B9B6A7";

          p.fill(fillColor);
          p.noStroke();
          
          // 다각형 그리기
          p.beginShape();
          for (let j = 0; j < sides; j++) {
            const angle = p.TWO_PI / sides * j;
            const vx = p.cos(angle) * radius;
            const vy = p.sin(angle) * radius;
            p.vertex(vx, vy);
          }
          p.endShape(p.CLOSE);

          // 저장했던 그리기 설정을 복원합니다.
          p.pop();
        }

        // 다음 도형 생성을 위해 프레임 카운터를 증가시킵니다.
        frameCounter++;
      };

      p.mousePressed = () => {
        const mousePosition = { x: p.mouseX, y: p.mouseY };
        const clickedBodies = Query.point(shapes, mousePosition);

        if (clickedBodies.length > 0) {
          const body = clickedBodies[0];
          if (body.slug) {
            navigate(`/posts/${body.slug}`);
          }
        }
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
  }, [navigate]); // navigate가 변경될 때마다 useEffect 재실행 (사실상 마운트 시 1회)

  // 렌더링될 JSX입니다. p5 캔버스가 이 div 내부에 생성됩니다.
  return (
    <div ref={canvasRef} className="motion-canvas-container">
      {hoveredPost && (
        <div
          style={{
            position: "absolute",
            top: hoveredPost.y  -15, // 커서 약간 아래
            left: hoveredPost.x -15, // 커서 약간 오른쪽
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            color: "white",
            padding: "5px 10px",
            borderRadius: "4px",
            pointerEvents: "none", // 툴팁이 마우스 이벤트를 가로채지 않도록
            zIndex: 1000,
            fontSize: "12px",
            whiteSpace: "nowrap",
          }}
        >
          {hoveredPost.title}
        </div>
      )}
    </div>
  );
}

export default MotionCanvas;

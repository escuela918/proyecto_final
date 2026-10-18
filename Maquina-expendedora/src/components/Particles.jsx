import { useEffect, useRef } from "react";

function Particles() {

  const canvasRef = useRef(null);

  useEffect(() => {

    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");

    let particles = [];

    function resize() {

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

    }

    resize();

    window.addEventListener(
      "resize",
      resize
    );

    for (let i = 0; i < 100; i++) {

      particles.push({

        x: Math.random() * canvas.width,

        y: Math.random() * canvas.height,

        size: Math.random() * 1.5,

        speed: Math.random() * 0.3 + 0.05,

        opacity:
          Math.random() * 0.5 + 0.1,

      });

    }

    function animate() {

      ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      );

      particles.forEach((particle) => {

        particle.y -= particle.speed;

        if (particle.y < 0) {

          particle.y =
            canvas.height;

        }

        ctx.beginPath();

        ctx.arc(
          particle.x,
          particle.y,
          particle.size,
          0,
          Math.PI * 2
        );

        ctx.fillStyle =
          `rgba(220, 195, 135, ${particle.opacity})`;

        ctx.fill();

      });

      requestAnimationFrame(
        animate
      );

    }

    animate();

    return () => {

      window.removeEventListener(
        "resize",
        resize
      );

    };

  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="particles"
    />
  );

}

export default Particles;
import { useEffect, useRef } from "react";

export default function AboutWavesCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let w, h;
    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = canvas.parentElement.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let t = 0;

    const waves = [
      {
        amp: 90,
        freq: 0.0016,
        speed: 0.25,
        y: 0.45,
        color: ["rgba(80,255,200,0.35)", "rgba(80,255,200,0.05)"],
        width: 2.2,
      },
      {
        amp: 130,
        freq: 0.0012,
        speed: 0.18,
        y: 0.6,
        color: ["rgba(120,100,255,0.3)", "rgba(120,100,255,0.05)"],
        width: 2.6,
      },
      {
        amp: 60,
        freq: 0.0022,
        speed: 0.32,
        y: 0.72,
        color: ["rgba(0,160,255,0.3)", "rgba(0,160,255,0.05)"],
        width: 1.8,
      },
    ];

    const drawWave = (wave, offset) => {
      ctx.beginPath();

      for (let x = -50; x <= w + 50; x += 10) {
        const y =
          h * wave.y +
          Math.sin(x * wave.freq + t * wave.speed + offset) * wave.amp;
        ctx.lineTo(x, y);
      }

      const grad = ctx.createLinearGradient(0, 0, w, 0);
      grad.addColorStop(0, wave.color[1]);
      grad.addColorStop(0.5, wave.color[0]);
      grad.addColorStop(1, wave.color[1]);

      ctx.strokeStyle = grad;
      ctx.lineWidth = wave.width;
      ctx.lineCap = "round";
      ctx.shadowBlur = 35;
      ctx.shadowColor = wave.color[0];
      ctx.stroke();
      ctx.shadowBlur = 0;
    };

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      t += 0.008;
      waves.forEach((wave, i) => drawWave(wave, i * 2));
      requestAnimationFrame(animate);
    };

    animate();
    return () => window.removeEventListener("resize", resize);
  }, []);

  return <canvas ref={canvasRef} className="about-waves-canvas" />;
}

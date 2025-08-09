import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";

import styles from "./index.module.css";

interface SimulationConfig {
  achillesSpeed: number;
  tortoiseSpeed: number;
  initialDistance: number;
  achillesInitialX: number;
  tortoiseInitialX: number;
}

const config: SimulationConfig = {
  achillesSpeed: 100,
  tortoiseSpeed: 10,
  initialDistance: 500,
  achillesInitialX: 50,
  tortoiseInitialX: 50 + 500,
};

export const Zenos: React.FC = () => {
  const [running, setRunning] = useState<boolean>(false);
  const [achillesX, setAchillesX] = useState<number>(config.achillesInitialX);
  const [tortoiseX, setTortoiseX] = useState<number>(config.tortoiseInitialX);
  const [distanceRemaining, setDistanceRemaining] = useState<number>(
    config.initialDistance
  );
  const [step, setStep] = useState<number>(0);
  const [message, setMessage] = useState<string>(
    "Press 'Start' to see the race begin"
  );
  const [totalTime, setTotalTime] = useState<number>(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastTimestampRef = useRef<number | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = canvas;
    const scale = width / 900;

    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = "#f9fafb";
    ctx.fillRect(0, 0, width, height);
    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 2 * scale;
    ctx.beginPath();
    ctx.moveTo(0, height - 50 * scale);
    ctx.lineTo(width, height - 50 * scale);
    ctx.stroke();

    ctx.fillStyle = "blue";
    ctx.fillRect(
      achillesX * scale,
      height - 80 * scale,
      80 * scale,
      80 * scale
    );
    ctx.fillStyle = "black";
    ctx.font = `${14 * scale}px Inter`;
    ctx.fillText("Aquiles", achillesX * scale, height - 85 * scale);

    ctx.fillStyle = "green";
    ctx.fillRect(
      tortoiseX * scale,
      height - 80 * scale,
      80 * scale,
      80 * scale
    );
    ctx.fillStyle = "black";
    ctx.font = `${14 * scale}px Inter`;
    ctx.fillText("Turtle", tortoiseX * scale, height - 85 * scale);
  }, [achillesX, tortoiseX]);

  const update = useCallback(
    (timestamp: number) => {
      if (!running) {
        if (animationFrameIdRef.current) {
          cancelAnimationFrame(animationFrameIdRef.current);
        }
        return;
      }

      if (lastTimestampRef.current === null) {
        lastTimestampRef.current = timestamp;
      }

      const deltaTime = (timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;

      // Lógica do paradoxo
      const timeToReachTortoiseOldPos =
        distanceRemaining / config.achillesSpeed;
      const newAchillesX =
        achillesX + (distanceRemaining / timeToReachTortoiseOldPos) * deltaTime;
      const newTortoiseX = tortoiseX + config.tortoiseSpeed * deltaTime;
      const newDistanceRemaining = newTortoiseX - newAchillesX;

      // Atualizar o estado
      setAchillesX(newAchillesX);
      setTortoiseX(newTortoiseX);
      setDistanceRemaining(newDistanceRemaining);
      setStep((prevStep) => prevStep + 1);
      setTotalTime((prevTime) => prevTime + deltaTime);

      // Condição de parada
      if (newDistanceRemaining < 0.1) {
        setRunning(false);
        setMessage(
          `Paradox solved! Achilles overtook the tortoise in ${totalTime.toFixed(
            2
          )} seconds.`
        );
        if (animationFrameIdRef.current) {
          cancelAnimationFrame(animationFrameIdRef.current);
        }
        return;
      }

      draw();
      animationFrameIdRef.current = requestAnimationFrame(update);
    },
    [running, achillesX, tortoiseX, distanceRemaining, totalTime, draw]
  );

  useEffect(() => {
    if (running) {
      animationFrameIdRef.current = requestAnimationFrame(update);
      setMessage("The race is on! Achilles chases the tortoise.");
    } else {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    }
    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [running, update]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const resizeCanvas = () => {
      if (!canvas) return;
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth > 900 ? 900 : parent.clientWidth;
      canvas.height = (canvas.width * 9) / 16;
      draw();
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => window.removeEventListener("resize", resizeCanvas);
  }, [draw]);

  const handleStart = () => {
    if (!running) {
      setRunning(true);
    }
  };

  const handleReset = () => {
    setRunning(false);
    setAchillesX(config.achillesInitialX);
    setTortoiseX(config.tortoiseInitialX);
    setDistanceRemaining(config.initialDistance);
    setStep(0);
    setTotalTime(0);
    lastTimestampRef.current = null;
    setMessage("Press 'Start' to see the race begin");
    draw();
  };

  const disableStartButton = useMemo(
    () => running || distanceRemaining < 0.1,
    [running, distanceRemaining]
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Zeno's Paradox</h1>
      <p className={styles.description}>
        Achilles, the fastest, runs to catch up with a tortoise with a head
        start.
      </p>

      <canvas ref={canvasRef} className={styles.canvas}></canvas>

      <div className={styles.controls}>
        <button
          id="startButton"
          onClick={handleStart}
          disabled={disableStartButton}
          className={`${styles.button} ${
            disableStartButton ? styles.startButtonDisabled : styles.startButton
          }`}
        >
          Start
        </button>
        <button
          id="resetButton"
          onClick={handleReset}
          className={`${styles.button} ${styles.resetButton}`}
        >
          Restart
        </button>
        <div className={styles.info}>
          <p id="distanceDisplay" className="font-semibold text-lg">
            Remaining distance: {distanceRemaining.toFixed(2)}
          </p>
          <p id="stepDisplay" className="text-sm">
            Step: {step}
          </p>
        </div>
      </div>

      <div className={styles.messageBox}>
        <p id="messageArea" className="text-sm italic">
          {message}
        </p>
      </div>
    </div>
  );
};

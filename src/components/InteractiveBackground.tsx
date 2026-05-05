import { useEffect } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulse: number;
  pulseSpeed: number;
};

export function InteractiveBackground() {
  useEffect(() => {
    const navigatorWithConnection = navigator as Navigator & {
      connection?: {
        saveData?: boolean;
      };
    };

    const state = {
      canvas: null as HTMLCanvasElement | null,
      ctx: null as CanvasRenderingContext2D | null,
      animationFrame: 0,
      particles: [] as Particle[],
      lastTime: 0,
      palette: null as null | {
        link: string;
        node: string;
        accent: string;
      },
      mode: document.documentElement.dataset.colorMode || "light",
      reduceMotionQuery: window.matchMedia("(prefers-reduced-motion: reduce)"),
      desktopMotionQuery: window.matchMedia("(min-width: 900px)"),
      reducedMotion: false,
      dynamicEnabled: false,
      devicePixelRatio: Math.min(window.devicePixelRatio || 1, 1.25),
    };

    const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

    const syncPalette = () => {
      const styles = getComputedStyle(document.documentElement);
      state.mode = document.documentElement.dataset.colorMode || "light";
      state.palette = {
        link: styles.getPropertyValue("--portfolio-bg-link-rgb").trim() || "96, 165, 250",
        node: styles.getPropertyValue("--portfolio-bg-node-rgb").trim() || "52, 211, 153",
        accent: styles.getPropertyValue("--portfolio-bg-accent-rgb").trim() || "245, 158, 11",
      };
    };

    const canRunDynamicBackground = () => {
      const saveData = navigatorWithConnection.connection?.saveData === true;
      const lowPowerDevice =
        typeof navigator.hardwareConcurrency === "number" && navigator.hardwareConcurrency <= 4;

      return state.desktopMotionQuery.matches && !saveData && !lowPowerDevice && !state.reducedMotion;
    };

    const syncBackgroundMode = () => {
      state.dynamicEnabled = canRunDynamicBackground();
      document.documentElement.dataset.backgroundMode = state.dynamicEnabled ? "dynamic" : "static";
    };

    const particleCountForViewport = () => {
      const area = window.innerWidth * window.innerHeight;
      if (area < 540000) return 22;
      if (area < 980000) return 34;
      return 48;
    };

    const createParticle = (): Particle => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      radius: 0.9 + Math.random() * 1.65,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.0016 + Math.random() * 0.0028,
    });

    const seedParticles = () => {
      state.particles = Array.from({ length: particleCountForViewport() }, createParticle);
    };

    const resizeCanvas = () => {
      if (!state.canvas || !state.ctx) return;

      state.devicePixelRatio = Math.min(window.devicePixelRatio || 1, 1.25);
      state.canvas.width = Math.floor(window.innerWidth * state.devicePixelRatio);
      state.canvas.height = Math.floor(window.innerHeight * state.devicePixelRatio);
      state.canvas.style.width = `${window.innerWidth}px`;
      state.canvas.style.height = `${window.innerHeight}px`;
      state.ctx.setTransform(state.devicePixelRatio, 0, 0, state.devicePixelRatio, 0, 0);

      if (!state.particles.length || state.particles.length !== particleCountForViewport()) {
        seedParticles();
      }
    };

    const clearCanvas = () => {
      state.ctx?.clearRect(0, 0, window.innerWidth, window.innerHeight);
    };

    const renderFrame = (time: number) => {
      if (!state.dynamicEnabled || !state.ctx || !state.canvas || !state.palette) return;

      const delta = Math.min(time - state.lastTime || 16, 40);
      state.lastTime = time;
      clearCanvas();

      const connectionDistance = Math.min(Math.max(window.innerWidth * 0.14, 126), 194);

      for (const particle of state.particles) {
        particle.x += particle.vx * delta * 0.05;
        particle.y += particle.vy * delta * 0.05;
        particle.pulse += particle.pulseSpeed * delta;

        if (particle.x < -24) particle.x = window.innerWidth + 24;
        if (particle.x > window.innerWidth + 24) particle.x = -24;
        if (particle.y < -24) particle.y = window.innerHeight + 24;
        if (particle.y > window.innerHeight + 24) particle.y = -24;
      }

      for (let i = 0; i < state.particles.length; i += 1) {
        const particle = state.particles[i];

        for (let j = i + 1; j < state.particles.length; j += 1) {
          const other = state.particles[j];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.hypot(dx, dy);

          if (distance > connectionDistance) continue;

          const alpha = (1 - distance / connectionDistance) * (state.mode === "dark" ? 0.14 : 0.09);
          state.ctx.strokeStyle = `rgba(${state.palette.link}, ${alpha})`;
          state.ctx.lineWidth = distance < connectionDistance * 0.42 ? 0.95 : 0.65;
          state.ctx.beginPath();
          state.ctx.moveTo(particle.x, particle.y);
          state.ctx.lineTo(other.x, other.y);
          state.ctx.stroke();
        }
      }

      for (const particle of state.particles) {
        const radius = particle.radius + Math.sin(particle.pulse) * 0.26;

        state.ctx.fillStyle = `rgba(${state.palette.accent}, ${state.mode === "dark" ? 0.06 : 0.04})`;
        state.ctx.beginPath();
        state.ctx.arc(particle.x, particle.y, clamp(radius * 2.2, 2.2, 6.2), 0, Math.PI * 2);
        state.ctx.fill();

        state.ctx.fillStyle = `rgba(${state.palette.node}, ${state.mode === "dark" ? 0.8 : 0.62})`;
        state.ctx.beginPath();
        state.ctx.arc(particle.x, particle.y, clamp(radius, 0.85, 2.8), 0, Math.PI * 2);
        state.ctx.fill();
      }

      state.animationFrame = window.requestAnimationFrame(renderFrame);
    };

    const stop = () => {
      if (state.animationFrame) {
        window.cancelAnimationFrame(state.animationFrame);
        state.animationFrame = 0;
      }
    };

    const start = () => {
      if (!state.dynamicEnabled) {
        stop();
        clearCanvas();
        return;
      }

      if (state.animationFrame) {
        return;
      }

      state.lastTime = 0;
      state.animationFrame = window.requestAnimationFrame(renderFrame);
    };

    const syncMotionPreference = () => {
      state.reducedMotion = state.reduceMotionQuery.matches;
      document.documentElement.dataset.motionPreference = state.reducedMotion ? "reduced" : "full";
      syncBackgroundMode();
      start();
    };

    const handleResize = () => {
      syncBackgroundMode();
      resizeCanvas();
      start();
    };

    state.canvas = document.querySelector(".portfolio-background__canvas");
    state.ctx = state.canvas?.getContext("2d") ?? null;

    if (!state.canvas || !state.ctx) return undefined;

    syncPalette();
    syncBackgroundMode();
    resizeCanvas();
    start();

    const onVisibilityChange = () => {
      if (document.hidden) {
        stop();
      } else {
        syncPalette();
        syncBackgroundMode();
        resizeCanvas();
        start();
      }
    };

    const themeObserver = new MutationObserver(() => {
      syncPalette();
      syncBackgroundMode();
      start();
    });

    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "data-color-mode"],
    });

    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", onVisibilityChange);

    if (state.reduceMotionQuery.addEventListener) {
      state.reduceMotionQuery.addEventListener("change", syncMotionPreference);
    } else {
      state.reduceMotionQuery.addListener(syncMotionPreference);
    }

    if (state.desktopMotionQuery.addEventListener) {
      state.desktopMotionQuery.addEventListener("change", handleResize);
    } else {
      state.desktopMotionQuery.addListener(handleResize);
    }

    return () => {
      stop();
      themeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);

      if (state.reduceMotionQuery.removeEventListener) {
        state.reduceMotionQuery.removeEventListener("change", syncMotionPreference);
      } else {
        state.reduceMotionQuery.removeListener(syncMotionPreference);
      }

      if (state.desktopMotionQuery.removeEventListener) {
        state.desktopMotionQuery.removeEventListener("change", handleResize);
      } else {
        state.desktopMotionQuery.removeListener(handleResize);
      }
    };
  }, []);

  return (
    <div className="portfolio-background" aria-hidden="true" data-portfolio-background>
      <canvas className="portfolio-background__canvas"></canvas>
      <div className="portfolio-background__dots"></div>
      <div className="portfolio-background__grid"></div>
      <div className="portfolio-background__halo"></div>
      <div className="portfolio-background__spotlight"></div>
      <div className="portfolio-background__noise"></div>
    </div>
  );
}

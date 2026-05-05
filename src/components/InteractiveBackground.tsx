import { useEffect } from "react";

export function InteractiveBackground() {
  useEffect(() => {
    const restingPointer = () => ({
      x: window.innerWidth * 0.68,
      y: window.innerHeight * 0.28,
    });

    const navigatorWithConnection = navigator as Navigator & {
      connection?: {
        saveData?: boolean;
      };
    };

    const pointer = {
      currentX: restingPointer().x,
      currentY: restingPointer().y,
      targetX: restingPointer().x,
      targetY: restingPointer().y,
      active: false,
    };

    const state = {
      canvas: null as HTMLCanvasElement | null,
      ctx: null as CanvasRenderingContext2D | null,
      animationFrame: 0,
      idleTimer: 0,
      particles: [] as Array<{
        x: number;
        y: number;
        vx: number;
        vy: number;
        radius: number;
        pulse: number;
        pulseSpeed: number;
      }>,
      lastTime: 0,
      mode: document.documentElement.dataset.colorMode || "light",
      palette: null as null | {
        link: string;
        node: string;
        accent: string;
        cursor: string;
      },
      reduceMotionQuery: window.matchMedia("(prefers-reduced-motion: reduce)"),
      desktopMotionQuery: window.matchMedia("(min-width: 1024px) and (pointer: fine) and (hover: hover)"),
      reducedMotion: false,
      dynamicEnabled: false,
      devicePixelRatio: Math.min(window.devicePixelRatio || 1, 1.25),
    };

    const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

    const setPointerVars = () => {
      const width = window.innerWidth || 1;
      const height = window.innerHeight || 1;
      const shiftX = ((pointer.currentX / width) - 0.5) * 16;
      const shiftY = ((pointer.currentY / height) - 0.5) * 12;

      document.documentElement.style.setProperty("--portfolio-pointer-x", `${pointer.currentX}px`);
      document.documentElement.style.setProperty("--portfolio-pointer-y", `${pointer.currentY}px`);
      document.documentElement.style.setProperty("--portfolio-parallax-shift-x", `${shiftX.toFixed(2)}px`);
      document.documentElement.style.setProperty("--portfolio-parallax-shift-y", `${shiftY.toFixed(2)}px`);
    };

    const syncPalette = () => {
      const styles = getComputedStyle(document.documentElement);
      state.mode = document.documentElement.dataset.colorMode || "light";
      state.palette = {
        link: styles.getPropertyValue("--portfolio-bg-link-rgb").trim() || "52, 211, 153",
        node: styles.getPropertyValue("--portfolio-bg-node-rgb").trim() || "125, 211, 252",
        accent: styles.getPropertyValue("--portfolio-bg-accent-rgb").trim() || "245, 158, 11",
        cursor: styles.getPropertyValue("--portfolio-bg-cursor-rgb").trim() || "96, 165, 250",
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
      if (area < 480000) return 8;
      if (area < 920000) return 12;
      return 16;
    };

    const createParticle = () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.12,
      radius: 1 + Math.random() * 1.8,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.002 + Math.random() * 0.004,
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

    const drawCursorField = () => {
      if (!state.ctx || !state.palette) return;

      const cursorRadius = 150;
      const gradient = state.ctx.createRadialGradient(
        pointer.currentX,
        pointer.currentY,
        0,
        pointer.currentX,
        pointer.currentY,
        cursorRadius
      );

      gradient.addColorStop(0, `rgba(${state.palette.cursor}, ${state.mode === "dark" ? 0.09 : 0.06})`);
      gradient.addColorStop(0.45, `rgba(${state.palette.link}, ${state.mode === "dark" ? 0.04 : 0.025})`);
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      state.ctx.save();
      state.ctx.globalCompositeOperation = "lighter";
      state.ctx.fillStyle = gradient;
      state.ctx.beginPath();
      state.ctx.arc(pointer.currentX, pointer.currentY, cursorRadius, 0, Math.PI * 2);
      state.ctx.fill();
      state.ctx.restore();
    };

    const renderFrame = (time: number) => {
      if (!state.dynamicEnabled || !state.ctx || !state.canvas || !state.palette) return;

      const delta = Math.min(time - state.lastTime || 16, 40);
      state.lastTime = time;

      pointer.currentX += (pointer.targetX - pointer.currentX) * 0.09;
      pointer.currentY += (pointer.targetY - pointer.currentY) * 0.09;
      setPointerVars();

      clearCanvas();
      drawCursorField();

      const connectionDistance = 122;
      const cursorDistance = 136;

      for (const particle of state.particles) {
        particle.x += particle.vx * delta * 0.08;
        particle.y += particle.vy * delta * 0.08;
        particle.pulse += particle.pulseSpeed * delta;

        if (particle.x < -24) particle.x = window.innerWidth + 24;
        if (particle.x > window.innerWidth + 24) particle.x = -24;
        if (particle.y < -24) particle.y = window.innerHeight + 24;
        if (particle.y > window.innerHeight + 24) particle.y = -24;

        const cursorDx = particle.x - pointer.currentX;
        const cursorDy = particle.y - pointer.currentY;
        const cursorDist = Math.hypot(cursorDx, cursorDy) || 1;

        if (cursorDist < cursorDistance) {
          const influence = (cursorDistance - cursorDist) / cursorDistance;
          particle.x += (cursorDx / cursorDist) * influence * 0.5;
          particle.y += (cursorDy / cursorDist) * influence * 0.5;
        }
      }

      for (let i = 0; i < state.particles.length; i += 1) {
        const particle = state.particles[i];

        for (let j = i + 1; j < state.particles.length; j += 1) {
          const other = state.particles[j];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.hypot(dx, dy);

          if (distance > connectionDistance) continue;

          const alpha = (1 - distance / connectionDistance) * (state.mode === "dark" ? 0.15 : 0.1);
          state.ctx.strokeStyle = `rgba(${state.palette.link}, ${alpha})`;
          state.ctx.lineWidth = 1;
          state.ctx.beginPath();
          state.ctx.moveTo(particle.x, particle.y);
          state.ctx.lineTo(other.x, other.y);
          state.ctx.stroke();
        }

        const cursorDx = particle.x - pointer.currentX;
        const cursorDy = particle.y - pointer.currentY;
        const cursorDist = Math.hypot(cursorDx, cursorDy);

        if (cursorDist < cursorDistance) {
          const cursorAlpha = (1 - cursorDist / cursorDistance) * (state.mode === "dark" ? 0.2 : 0.14);
          state.ctx.strokeStyle = `rgba(${state.palette.cursor}, ${cursorAlpha})`;
          state.ctx.lineWidth = 1;
          state.ctx.beginPath();
          state.ctx.moveTo(particle.x, particle.y);
          state.ctx.lineTo(pointer.currentX, pointer.currentY);
          state.ctx.stroke();
        }

        const radius = particle.radius + Math.sin(particle.pulse) * 0.28;
        state.ctx.fillStyle = `rgba(${state.palette.node}, ${state.mode === "dark" ? 0.72 : 0.56})`;
        state.ctx.beginPath();
        state.ctx.arc(particle.x, particle.y, clamp(radius, 0.8, 2.8), 0, Math.PI * 2);
        state.ctx.fill();

        state.ctx.fillStyle = `rgba(${state.palette.accent}, ${state.mode === "dark" ? 0.09 : 0.06})`;
        state.ctx.beginPath();
        state.ctx.arc(particle.x, particle.y, clamp(radius * 2.1, 2, 6), 0, Math.PI * 2);
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

    const scheduleIdleStop = () => {
      window.clearTimeout(state.idleTimer);

      if (!state.dynamicEnabled) return;

      state.idleTimer = window.setTimeout(() => {
        stop();
      }, 1400);
    };

    const start = () => {
      if (!state.dynamicEnabled) {
        stop();
        clearCanvas();
        return;
      }

      if (state.animationFrame) {
        scheduleIdleStop();
        return;
      }

      state.lastTime = 0;
      state.animationFrame = window.requestAnimationFrame(renderFrame);
      scheduleIdleStop();
    };

    const syncMotionPreference = () => {
      state.reducedMotion = state.reduceMotionQuery.matches;
      document.documentElement.dataset.motionPreference = state.reducedMotion ? "reduced" : "full";
      syncBackgroundMode();
      start();
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointer.active = true;
      pointer.targetX = event.clientX;
      pointer.targetY = event.clientY;

      if (!state.dynamicEnabled) {
        pointer.currentX = event.clientX;
        pointer.currentY = event.clientY;
        setPointerVars();
        return;
      }

      start();
    };

    const handlePointerLeave = () => {
      const resting = restingPointer();
      pointer.active = false;
      pointer.targetX = resting.x;
      pointer.targetY = resting.y;

      if (!state.dynamicEnabled) {
        pointer.currentX = resting.x;
        pointer.currentY = resting.y;
        setPointerVars();
        return;
      }

      start();
    };

    const handlePointerOut = (event: PointerEvent) => {
      if (!event.relatedTarget) {
        handlePointerLeave();
      }
    };

    const handleResize = () => {
      syncBackgroundMode();
      resizeCanvas();

      if (!pointer.active) {
        handlePointerLeave();
      }

      start();
    };

    state.canvas = document.querySelector(".portfolio-background__canvas");
    state.ctx = state.canvas?.getContext("2d") ?? null;

    if (!state.canvas || !state.ctx) return undefined;

    syncPalette();
    syncBackgroundMode();
    resizeCanvas();
    setPointerVars();
    start();

    const onVisibilityChange = () => {
      if (document.hidden) {
        stop();
        window.clearTimeout(state.idleTimer);
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

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("resize", handleResize);
    window.addEventListener("blur", handlePointerLeave);
    document.addEventListener("visibilitychange", onVisibilityChange);
    document.addEventListener("pointerout", handlePointerOut, { passive: true });

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
      window.clearTimeout(state.idleTimer);
      themeObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("blur", handlePointerLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      document.removeEventListener("pointerout", handlePointerOut);

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
      <div className="portfolio-background__grid"></div>
      <div className="portfolio-background__halo"></div>
      <div className="portfolio-background__spotlight"></div>
      <div className="portfolio-background__noise"></div>
    </div>
  );
}

import { useEffect, useRef } from "react";

type NetworkNode = {
  baseX: number;
  baseY: number;
  driftX: number;
  driftY: number;
  radius: number;
  opacity: number;
  phase: number;
  speed: number;
  accent: boolean;
};

type NetworkLink = {
  a: number;
  b: number;
  alpha: number;
  accent: boolean;
};

export function InteractiveBackground() {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const navigatorWithConnection = navigator as Navigator & {
      connection?: {
        saveData?: boolean;
      };
    };

    const state = {
      scene: null as HTMLDivElement | null,
      background: backgroundRef.current,
      canvas: null as HTMLCanvasElement | null,
      ctx: null as CanvasRenderingContext2D | null,
      animationFrame: 0,
      nodes: [] as NetworkNode[],
      links: [] as NetworkLink[],
      lastTime: 0,
      sceneHeight: 0,
      palette: null as null | {
        link: string;
        node: string;
        accent: string;
      },
      mode: document.documentElement.dataset.colorMode || "light",
      reduceMotionQuery: window.matchMedia("(prefers-reduced-motion: reduce)"),
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

      return !saveData && !lowPowerDevice && !state.reducedMotion;
    };

    const syncBackgroundMode = () => {
      state.dynamicEnabled = canRunDynamicBackground();
      document.documentElement.dataset.backgroundMode = state.dynamicEnabled ? "dynamic" : "static";
    };

    const getSceneHeight = () =>
      Math.max(
        window.innerHeight,
        state.scene?.scrollHeight ?? 0,
        state.scene?.offsetHeight ?? 0,
        document.documentElement.scrollHeight,
        document.body.scrollHeight
      );

    const seedNetwork = () => {
      const width = window.innerWidth;
      const height = state.sceneHeight;
      const spacingX = clamp(width / 16, 72, 104);
      const spacingY = spacingX * 0.72;
      const cols = Math.ceil(width / spacingX) + 3;
      const rows = Math.ceil(height / spacingY) + 3;

      const grid: Array<Array<number | null>> = [];
      const nodes: NetworkNode[] = [];

      for (let row = 0; row < rows; row += 1) {
        grid[row] = [];

        for (let col = 0; col < cols; col += 1) {
          const skipChance = row > 0 && row < rows - 1 && col > 0 && col < cols - 1 ? 0.12 : 0;
          if (Math.random() < skipChance) {
            grid[row][col] = null;
            continue;
          }

          const staggerOffset = row % 2 === 0 ? 0 : spacingX * 0.5;
          const jitterX = (Math.random() - 0.5) * spacingX * 0.22;
          const jitterY = (Math.random() - 0.5) * spacingY * 0.22;

          const node: NetworkNode = {
            baseX: col * spacingX + staggerOffset + jitterX - spacingX * 0.5,
            baseY: row * spacingY + jitterY - spacingY * 0.5,
            driftX: 2 + Math.random() * 5,
            driftY: 2 + Math.random() * 5,
            radius: 1.35 + Math.random() * 1.8,
            opacity: 0.34 + Math.random() * 0.5,
            phase: Math.random() * Math.PI * 2,
            speed: 0.00045 + Math.random() * 0.0006,
            accent: Math.random() < 0.09,
          };

          grid[row][col] = nodes.length;
          nodes.push(node);
        }
      }

      const links: NetworkLink[] = [];

      const maybeConnect = (
        fromIndex: number | null | undefined,
        toIndex: number | null | undefined,
        alpha: number,
        accent = false
      ) => {
        if (fromIndex == null || toIndex == null) return;

        links.push({
          a: fromIndex,
          b: toIndex,
          alpha,
          accent,
        });
      };

      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          const current = grid[row][col];
          if (current == null) continue;

          const right = grid[row]?.[col + 1];
          const down = grid[row + 1]?.[col];
          const downLeft = grid[row + 1]?.[col - (row % 2 === 0 ? 1 : 0)];
          const downRight = grid[row + 1]?.[col + (row % 2 === 0 ? 0 : 1)];
          const rightTwo = grid[row]?.[col + 2];

          maybeConnect(current, right, 0.42);
          maybeConnect(current, down, 0.2);
          maybeConnect(current, downLeft, 0.28);
          maybeConnect(current, downRight, 0.28);

          if (Math.random() < 0.18) {
            maybeConnect(current, rightTwo, 0.12, true);
          }
        }
      }

      state.nodes = nodes;
      state.links = links;
    };

    const resizeCanvas = () => {
      if (!state.background || !state.canvas || !state.ctx) return;

      state.sceneHeight = getSceneHeight();
      state.devicePixelRatio = Math.min(window.devicePixelRatio || 1, 1.25);
      state.background.style.height = `${state.sceneHeight}px`;
      state.canvas.width = Math.floor(window.innerWidth * state.devicePixelRatio);
      state.canvas.height = Math.floor(state.sceneHeight * state.devicePixelRatio);
      state.canvas.style.width = `${window.innerWidth}px`;
      state.canvas.style.height = `${state.sceneHeight}px`;
      state.ctx.setTransform(state.devicePixelRatio, 0, 0, state.devicePixelRatio, 0, 0);

      seedNetwork();
    };

    const clearCanvas = () => {
      state.ctx?.clearRect(0, 0, window.innerWidth, state.sceneHeight);
    };

    const drawFrame = (time: number) => {
      if (!state.ctx || !state.canvas || !state.palette) return;

      clearCanvas();

      const positions = state.nodes.map((node) => ({
        x: node.baseX + Math.sin(time * node.speed + node.phase) * node.driftX,
        y: node.baseY + Math.cos(time * node.speed * 0.9 + node.phase) * node.driftY,
      }));

      for (const link of state.links) {
        const from = positions[link.a];
        const to = positions[link.b];
        if (!from || !to) continue;

        const pulse = 0.8 + Math.sin(time * 0.00035 + state.nodes[link.a].phase) * 0.2;
        const alpha = link.alpha * pulse * (state.mode === "dark" ? 0.48 : 0.34);
        const color = link.accent ? state.palette.accent : state.palette.link;

        state.ctx.strokeStyle = `rgba(${color}, ${alpha})`;
        state.ctx.lineWidth = link.accent ? 0.9 : 0.72;
        state.ctx.beginPath();
        state.ctx.moveTo(from.x, from.y);
        state.ctx.lineTo(to.x, to.y);
        state.ctx.stroke();
      }

      for (let index = 0; index < state.nodes.length; index += 1) {
        const node = state.nodes[index];
        const position = positions[index];
        const pulse = 0.82 + Math.sin(time * node.speed * 1.8 + node.phase) * 0.26;
        const radius = clamp(node.radius * pulse, 1.1, 3.6);
        const opacity = clamp(node.opacity * pulse, 0.24, 0.92);

        if (node.accent) {
          state.ctx.fillStyle = `rgba(${state.palette.accent}, ${state.mode === "dark" ? 0.16 : 0.1})`;
          state.ctx.beginPath();
          state.ctx.arc(position.x, position.y, radius * 2.35, 0, Math.PI * 2);
          state.ctx.fill();
        }

        state.ctx.fillStyle = `rgba(${state.palette.node}, ${opacity})`;
        state.ctx.beginPath();
        state.ctx.arc(position.x, position.y, radius, 0, Math.PI * 2);
        state.ctx.fill();
      }
    };

    const renderFrame = (time: number) => {
      if (!state.dynamicEnabled) return;

      const delta = Math.min(time - state.lastTime || 16, 40);
      state.lastTime = time;

      drawFrame(time + delta);
      state.animationFrame = window.requestAnimationFrame(renderFrame);
    };

    const stop = () => {
      if (state.animationFrame) {
        window.cancelAnimationFrame(state.animationFrame);
        state.animationFrame = 0;
      }
    };

    const start = () => {
      stop();

      if (!state.dynamicEnabled) {
        drawFrame(0);
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

    state.scene = document.querySelector("[data-portfolio-scene]");
    state.background = backgroundRef.current;
    state.canvas = canvasRef.current;
    state.ctx = state.canvas?.getContext("2d") ?? null;

    if (!state.scene || !state.background || !state.canvas || !state.ctx) return undefined;

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
    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });

    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "data-color-mode"],
    });
    resizeObserver.observe(state.scene);
    resizeObserver.observe(document.body);

    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", onVisibilityChange);

    if (state.reduceMotionQuery.addEventListener) {
      state.reduceMotionQuery.addEventListener("change", syncMotionPreference);
    } else {
      state.reduceMotionQuery.addListener(syncMotionPreference);
    }

    return () => {
      stop();
      themeObserver.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);

      if (state.reduceMotionQuery.removeEventListener) {
        state.reduceMotionQuery.removeEventListener("change", syncMotionPreference);
      } else {
        state.reduceMotionQuery.removeListener(syncMotionPreference);
      }
    };
  }, []);

  return (
    <div ref={backgroundRef} className="portfolio-background" aria-hidden="true" data-portfolio-background>
      <canvas ref={canvasRef} className="portfolio-background__canvas"></canvas>
      <div className="portfolio-background__wash"></div>
      <div className="portfolio-background__vignette"></div>
    </div>
  );
}

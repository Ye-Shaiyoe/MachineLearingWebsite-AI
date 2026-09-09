"use client";

import React, { useEffect, useRef } from "react";

export interface GalaxyCanvasController {
  setScrollProgress: (progress: number) => void;
  setActiveSection: (index: number) => void;
}

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  baseAlpha: number;
  colorIndex: number;
  twinkleSpeed: number;
  twinklePhase: number;
  isCore?: boolean;
}

interface ConstellationNode {
  name: string;
  code: string;
  x: number;
  y: number;
  z: number;
  color: string;
}

export function GalaxyCanvas({
  onControllerReady,
}: {
  onControllerReady?: (controller: GalaxyCanvasController) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const scrollRef = useRef<{ targetProgress: number; currentProgress: number }>({
    targetProgress: 0,
    currentProgress: 0,
  });

  const mouseRef = useRef<{
    x: number;
    y: number;
    targetX: number;
    targetY: number;
  }>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Pre-render star sprites onto offscreen canvases for blazing-fast drawImage calls
    const SPRITE_SIZE = 48;
    const starColors = [
      { r: 235, g: 245, b: 255 }, // 0: Blue-White
      { r: 255, g: 255, b: 255 }, // 1: Pure White
      { r: 254, g: 243, b: 199 }, // 2: Warm Gold
      { r: 252, g: 211, b: 77 },  // 3: Amber
      { r: 186, g: 230, b: 253 }, // 4: Soft Cyan
    ];

    const starSprites: HTMLCanvasElement[] = starColors.map((c) => {
      const offCanvas = document.createElement("canvas");
      offCanvas.width = SPRITE_SIZE;
      offCanvas.height = SPRITE_SIZE;
      const offCtx = offCanvas.getContext("2d");
      if (!offCtx) return offCanvas;

      const half = SPRITE_SIZE / 2;

      // Soft glow gradient
      const glow = offCtx.createRadialGradient(half, half, 0, half, half, half);
      glow.addColorStop(0, `rgba(${c.r}, ${c.g}, ${c.b}, 1)`);
      glow.addColorStop(0.2, `rgba(${c.r}, ${c.g}, ${c.b}, 0.8)`);
      glow.addColorStop(0.55, `rgba(${c.r}, ${c.g}, ${c.b}, 0.25)`);
      glow.addColorStop(1, `rgba(${c.r}, ${c.g}, ${c.b}, 0)`);

      offCtx.fillStyle = glow;
      offCtx.fillRect(0, 0, SPRITE_SIZE, SPRITE_SIZE);

      // Solid central core
      offCtx.beginPath();
      offCtx.arc(half, half, 2.2, 0, Math.PI * 2);
      offCtx.fillStyle = "#ffffff";
      offCtx.fill();

      return offCanvas;
    });

    // Resize handler
    const handleResize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      const halfW = width / 2;
      const halfH = height / 2;
      mouseRef.current.targetX = (e.clientX - halfW) / halfW;
      mouseRef.current.targetY = (e.clientY - halfH) / halfH;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Generate Optimized Galaxy Particles (850 high-precision stars)
    const stars: Star[] = [];
    const NUM_ARMS = 2;
    const ARM_SPREAD = 0.52;
    const GALAXY_RADIUS = 850;

    // 1. Core Bulge
    for (let i = 0; i < 280; i++) {
      const r = Math.pow(Math.random(), 2.3) * 200;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI * 0.65;

      stars.push({
        x: r * Math.cos(theta) * Math.cos(phi),
        y: r * Math.sin(phi) * 0.45,
        z: r * Math.sin(theta) * Math.cos(phi),
        size: Math.random() * 2.0 + 1.0,
        baseAlpha: Math.random() * 0.5 + 0.5,
        colorIndex: Math.floor(Math.random() * starColors.length),
        twinkleSpeed: Math.random() * 0.025 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2,
        isCore: true,
      });
    }

    // 2. Spiral Arms
    for (let i = 0; i < 450; i++) {
      const arm = i % NUM_ARMS;
      const armOffset = (arm * 2 * Math.PI) / NUM_ARMS;
      const distance = 110 + Math.pow(Math.random(), 1.15) * (GALAXY_RADIUS - 110);
      const angle = 2.3 * Math.log(distance / 55) + armOffset;

      const spread = (Math.random() - 0.5) * distance * ARM_SPREAD;
      const heightSpread = (Math.random() - 0.5) * 75 * Math.exp(-distance / 750);

      stars.push({
        x: Math.cos(angle) * distance + Math.sin(angle) * spread,
        y: heightSpread,
        z: Math.sin(angle) * distance - Math.cos(angle) * spread,
        size: Math.random() * 1.8 + 0.8,
        baseAlpha: Math.random() * 0.4 + 0.45,
        colorIndex: Math.floor(Math.random() * starColors.length),
        twinkleSpeed: Math.random() * 0.02 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }

    // 3. Ambient Deep Space
    for (let i = 0; i < 150; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 1500 + Math.random() * 350;

      stars.push({
        x: r * Math.sin(phi) * Math.cos(theta),
        y: (r * Math.sin(phi) * Math.sin(theta)) * 0.6,
        z: r * Math.cos(phi),
        size: Math.random() * 1.2 + 0.5,
        baseAlpha: Math.random() * 0.35 + 0.25,
        colorIndex: 1, // Pure white
        twinkleSpeed: Math.random() * 0.015 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }

    // Constellation Nodes
    const constellationNodes: ConstellationNode[] = [
      {
        name: "OX-ALPHA",
        code: "stealth/ox-alpha",
        x: -240,
        y: -30,
        z: 220,
        color: "#34d399",
      },
      {
        name: "MINIMAX-M3",
        code: "minimax/minimax-m3:free",
        x: 220,
        y: 40,
        z: 160,
        color: "#38bdf8",
      },
      {
        name: "GROK-4.3",
        code: "x-ai/grok-4.3",
        x: -160,
        y: 65,
        z: -190,
        color: "#fbbf24",
      },
      {
        name: "GROK-IMAGINE",
        code: "x-ai/grok-imagine",
        x: 280,
        y: -50,
        z: -240,
        color: "#f472b6",
      },
    ];

    let rotationAngle = 0;
    const FOV = 550;

    // Ultra-smooth 60-120fps render loop
    const render = () => {
      // 1. Mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;

      // 2. Continuous smooth scroll progress lerp (prevents stuttering/patah-patah)
      const targetP = scrollRef.current.targetProgress;
      scrollRef.current.currentProgress +=
        (targetP - scrollRef.current.currentProgress) * 0.08;
      const progress = scrollRef.current.currentProgress;

      rotationAngle += 0.0012;

      const cameraPitch = 0.56 - progress * 0.35 + mouseRef.current.y * 0.1;
      const cameraYaw = rotationAngle + progress * 1.6 + mouseRef.current.x * 0.15;
      const cameraZOffset = -progress * 520 + (1 - Math.cos(progress * Math.PI)) * 100;
      const cameraYOffset = progress * 90;

      // Deep obsidian void clear
      ctx.fillStyle = "#030408";
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      const cosP = Math.cos(cameraPitch);
      const sinP = Math.sin(cameraPitch);
      const cosY = Math.cos(cameraYaw);
      const sinY = Math.sin(cameraYaw);

      // Draw all stars using pre-rendered GPU sprites
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        const x1 = star.x * cosY - star.z * sinY;
        const z1 = star.x * sinY + star.z * cosY;

        const y2 = star.y * cosP - z1 * sinP + cameraYOffset;
        const z2 = star.y * sinP + z1 * cosP + 680 + cameraZOffset;

        if (z2 < 30) continue;

        const scale = FOV / z2;
        const screenX = centerX + x1 * scale;
        const screenY = centerY + y2 * scale;

        if (screenX < -20 || screenX > width + 20 || screenY < -20 || screenY > height + 20) {
          continue;
        }

        star.twinklePhase += star.twinkleSpeed;
        const twinkle = (Math.sin(star.twinklePhase) + 1) * 0.25 + 0.5;
        const alpha = Math.min(
          star.baseAlpha * twinkle * Math.min(1, (z2 - 30) / 90),
          1
        );

        const drawSize = Math.max(
          star.size * scale * (star.isCore ? 14 : 10),
          4
        );

        ctx.globalAlpha = alpha;
        ctx.drawImage(
          starSprites[star.colorIndex],
          screenX - drawSize / 2,
          screenY - drawSize / 2,
          drawSize,
          drawSize
        );
      }

      ctx.globalAlpha = 1;

      // Draw Constellation Nodes and Vectors
      const projectedNodes: { x: number; y: number; z: number; node: ConstellationNode; scale: number }[] = [];

      for (let i = 0; i < constellationNodes.length; i++) {
        const node = constellationNodes[i];
        const x1 = node.x * cosY - node.z * sinY;
        const z1 = node.x * sinY + node.z * cosY;
        const y2 = node.y * cosP - z1 * sinP + cameraYOffset;
        const z2 = node.y * sinP + z1 * cosP + 680 + cameraZOffset;

        if (z2 < 30) continue;

        const scale = FOV / z2;
        const screenX = centerX + x1 * scale;
        const screenY = centerY + y2 * scale;

        projectedNodes.push({
          x: screenX,
          y: screenY,
          z: z2,
          node,
          scale,
        });
      }

      // Constellation connector vectors
      if (projectedNodes.length > 1) {
        ctx.beginPath();
        for (let i = 0; i < projectedNodes.length; i++) {
          for (let j = i + 1; j < projectedNodes.length; j++) {
            const p1 = projectedNodes[i];
            const p2 = projectedNodes[j];
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
          }
        }
        ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 5]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Constellation node marks
      for (let i = 0; i < projectedNodes.length; i++) {
        const p = projectedNodes[i];
        const radius = Math.max(3.5 * p.scale, 2.5);

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = `${p.node.color}25`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = p.node.color;
        ctx.fill();

        if (p.scale > 0.65) {
          ctx.font = "10px monospace";
          ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
          ctx.fillText(`NODE // ${p.node.name}`, p.x + radius + 8, p.y + 3);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    if (onControllerReady) {
      onControllerReady({
        setScrollProgress: (p: number) => {
          scrollRef.current.targetProgress = p;
        },
        setActiveSection: () => {},
      });
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [onControllerReady]);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ transform: "translateZ(0)", willChange: "transform" }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block w-full h-full"
      />
      {/* Cinematic subtle vignette overlay via CSS */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(3,4,8,0) 20%, rgba(3,4,8,0.5) 70%, rgba(3,4,8,0.92) 100%)",
        }}
      />
      {/* Architectural subtle coordinate grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
    </div>
  );
}

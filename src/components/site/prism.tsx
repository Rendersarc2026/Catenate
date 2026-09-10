"use client";

import { Mesh, Program, Renderer, Triangle } from "ogl";
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Prism — a raymarched prism of refracted light, from React Bits (reactbits.dev).
 *
 * The shader is carried over as published. The React side is this project's,
 * and follows the orb: the canvas is sized from its container rather than the
 * window, the pixel ratio is capped the way the globe caps it, the loop idles
 * while the prism is off screen, and reduced motion gets a single still frame
 * instead of the animation.
 */

export interface PrismProps {
  /** Apex height of the prism, in world units. */
  height?: number;
  /** Total base width across X/Z, in world units. */
  baseWidth?: number;
  /** Shader wobble, pointer-driven tilt, or a full 3D tumble. */
  animationType?: "rotate" | "hover" | "3drotate";
  /** Glow/bleed intensity multiplier. */
  glow?: number;
  /** Pixel offset within the canvas (x → right, y → down). */
  offset?: { x?: number; y?: number };
  /** Film-grain amount added to the final colour; 0 disables it. */
  noise?: number;
  /** Give the canvas an alpha channel, so it composites over what is behind. */
  transparent?: boolean;
  /** Overall screen-space scale of the prism. */
  scale?: number;
  /** Hue rotation applied to the final colour, in radians. */
  hueShift?: number;
  /** Frequency of the internal sine bands that drive the colour variation. */
  colorFrequency?: number;
  /** Sensitivity of the hover tilt, for `animationType="hover"`. */
  hoverStrength?: number;
  /** Easing factor for the hover tilt (0..1, higher is snappier). */
  inertia?: number;
  /** Extra bloom layered on top of the glow. */
  bloom?: number;
  /** Global time multiplier (0 freezes the animation). */
  timeScale?: number;
  /**
   * Fraction of the display resolution the shader actually draws at, upscaled
   * by the compositor to fill the box.
   *
   * The prism is a soft field of light with no edge to soften, so it survives
   * being drawn at well under native and stretched — and the raymarch costs
   * the square of this number, which is the single biggest lever there is.
   */
  renderScale?: number;
  /** Raymarch iterations per pixel. The other half of the cost. */
  steps?: number;
  /**
   * Ceiling on redraws per second.
   *
   * The wobble takes seconds to travel; drawing it 60 times a second spends
   * the whole frame budget on motion nobody can see. Half that leaves room for
   * the scroll, which is the thing that has to stay smooth.
   */
  maxFps?: number;
  /** Composite the prism as ink on white rather than light on black. */
  lightMode?: boolean;
  /**
   * Hold the loop after a single primed frame.
   *
   * A full-screen raymarch is the most expensive thing on the page, and the
   * hero keeps the prism mounted but hidden behind the landing wordmark for
   * the first screen of scroll. Pausing costs nothing to resume: the shader is
   * already compiled and the frame already drawn.
   */
  paused?: boolean;
  className?: string;
}

/** Matches the orb and the globe: past this, the shader costs more than it shows. */
const MAX_DPR = 1.5;

const vertex = /* glsl */ `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const buildFragment = (steps: number) => /* glsl */ `
  precision highp float;

  uniform vec2  iResolution;
  uniform float iTime;

  uniform float uHeight;
  uniform float uBaseHalf;
  uniform mat3  uRot;
  uniform int   uUseBaseWobble;
  uniform float uGlow;
  uniform vec2  uOffsetPx;
  uniform float uNoise;
  uniform float uSaturation;
  uniform float uScale;
  uniform float uHueShift;
  uniform float uColorFreq;
  uniform float uBloom;
  uniform float uCenterShift;
  uniform float uInvBaseHalf;
  uniform float uInvHeight;
  uniform float uMinAxis;
  uniform float uPxScale;
  uniform float uTimeScale;
  uniform float uLightMode;

  vec4 tanh4(vec4 x){
    vec4 e2x = exp(2.0*x);
    return (e2x - 1.0) / (e2x + 1.0);
  }

  float rand(vec2 co){
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  float sdOctaAnisoInv(vec3 p){
    vec3 q = vec3(abs(p.x) * uInvBaseHalf, abs(p.y) * uInvHeight, abs(p.z) * uInvBaseHalf);
    float m = q.x + q.y + q.z - 1.0;
    return m * uMinAxis * 0.5773502691896258;
  }

  float sdPyramidUpInv(vec3 p){
    float oct = sdOctaAnisoInv(p);
    float halfSpace = -p.y;
    return max(oct, halfSpace);
  }

  mat3 hueRotation(float a){
    float c = cos(a), s = sin(a);
    mat3 W = mat3(
      0.299, 0.587, 0.114,
      0.299, 0.587, 0.114,
      0.299, 0.587, 0.114
    );
    mat3 U = mat3(
       0.701, -0.587, -0.114,
      -0.299,  0.413, -0.114,
      -0.300, -0.588,  0.886
    );
    mat3 V = mat3(
       0.168, -0.331,  0.500,
       0.328,  0.035, -0.500,
      -0.497,  0.296,  0.201
    );
    return W + U * c + V * s;
  }

  void main(){
    vec2 f = (gl_FragCoord.xy - 0.5 * iResolution.xy - uOffsetPx) * uPxScale;

    float z = 5.0;
    float d = 0.0;

    vec3 p;
    vec4 o = vec4(0.0);

    float centerShift = uCenterShift;
    float cf = uColorFreq;

    mat2 wob = mat2(1.0);
    if (uUseBaseWobble == 1) {
      float t = iTime * uTimeScale;
      float c0 = cos(t + 0.0);
      float c1 = cos(t + 33.0);
      float c2 = cos(t + 11.0);
      wob = mat2(c0, c1, c2, c0);
    }

    const int STEPS = ${steps};
    for (int i = 0; i < STEPS; i++) {
      p = vec3(f, z);
      p.xz = p.xz * wob;
      p = uRot * p;
      vec3 q = p;
      q.y += centerShift;
      d = 0.1 + 0.2 * abs(sdPyramidUpInv(q));
      z -= d;
      o += (sin((p.y + z) * cf + vec4(0.0, 1.0, 2.0, 3.0)) + 1.0) / d;
    }

    o = tanh4(o * o * (uGlow * uBloom) / 1e5);

    vec3 col = o.rgb;
    if(uNoise > 0.0001){
      float n = rand(gl_FragCoord.xy + vec2(iTime));
      col += (n - 0.5) * uNoise;
    }
    col = clamp(col, 0.0, 1.0);

    float L = dot(col, vec3(0.2126, 0.7152, 0.0722));
    col = clamp(mix(vec3(L), col, uSaturation), 0.0, 1.0);

    if(abs(uHueShift) > 0.0001){
      col = clamp(hueRotation(uHueShift) * col, 0.0, 1.0);
    }

    if (uLightMode > 0.5) {
      float peak = max(col.r, max(col.g, col.b));
      vec3 chroma = pow(clamp(col / max(peak, 0.0001), 0.0, 1.0), vec3(1.14));
      gl_FragColor = vec4(mix(vec3(1.0), chroma, o.a * 0.94), 1.0);
    } else {
      gl_FragColor = vec4(col, o.a);
    }
  }
`;

const setMat3FromEuler = (
  yawY: number,
  pitchX: number,
  rollZ: number,
  out: Float32Array
) => {
  const cy = Math.cos(yawY);
  const sy = Math.sin(yawY);
  const cx = Math.cos(pitchX);
  const sx = Math.sin(pitchX);
  const cz = Math.cos(rollZ);
  const sz = Math.sin(rollZ);

  out[0] = cy * cz + sy * sx * sz;
  out[1] = cx * sz;
  out[2] = -sy * cz + cy * sx * sz;
  out[3] = -cy * sz + sy * sx * cz;
  out[4] = cx * cz;
  out[5] = sy * sz + cy * sx * cz;
  out[6] = sy * cx;
  out[7] = -sx;
  out[8] = cy * cx;
  return out;
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export function Prism({
  height = 3.5,
  baseWidth = 5.5,
  animationType = "rotate",
  glow = 1,
  offset,
  noise = 0,
  transparent = true,
  scale = 3.6,
  hueShift = 0,
  colorFrequency = 1,
  hoverStrength = 2,
  inertia = 0.05,
  bloom = 1,
  timeScale = 0.5,
  renderScale = 0.6,
  steps = 64,
  maxFps = 30,
  lightMode = false,
  paused = false,
  className,
}: PrismProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const offsetX = offset?.x ?? 0;
  const offsetY = offset?.y ?? 0;

  /* Read by the loop rather than closed over, so pausing does not tear the
     WebGL context down and build it again. */
  const pausedRef = React.useRef(paused);
  React.useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const H = Math.max(0.001, height);
    const BASE_HALF = Math.max(0.001, baseWidth) * 0.5;
    const SCALE = Math.max(0.001, scale);
    const TS = Math.max(0, timeScale);
    const HOVER_STRENGTH = Math.max(0, hoverStrength);
    const INERTIA = Math.min(1, Math.max(0, inertia));

    const RENDER_SCALE = Math.min(1, Math.max(0.25, renderScale));
    const FRAME_INTERVAL = maxFps > 0 ? 1000 / maxFps : 0;

    const renderer = new Renderer({ alpha: transparent, antialias: false });
    const gl = renderer.gl;
    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.CULL_FACE);
    gl.disable(gl.BLEND);
    gl.clearColor(0, 0, 0, 0);
    Object.assign(gl.canvas.style, {
      position: "absolute",
      inset: "0",
      display: "block",
    });
    container.appendChild(gl.canvas);

    const resolution = new Float32Array(2);
    const offsetPx = new Float32Array(2);
    const rotation = new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]);

    const program = new Program(gl, {
      vertex,
      fragment: buildFragment(Math.max(8, Math.round(steps))),
      uniforms: {
        iResolution: { value: resolution },
        iTime: { value: 0 },
        uHeight: { value: H },
        uBaseHalf: { value: BASE_HALF },
        uUseBaseWobble: { value: animationType === "rotate" ? 1 : 0 },
        uRot: { value: rotation },
        uGlow: { value: Math.max(0, glow) },
        uOffsetPx: { value: offsetPx },
        uNoise: { value: Math.max(0, noise) },
        /* Over a transparent ground the prism is composited, not blended, so
           it needs the extra saturation to read as light. */
        uSaturation: { value: transparent ? 1.5 : 1 },
        uScale: { value: SCALE },
        uHueShift: { value: hueShift },
        uColorFreq: { value: Math.max(0, colorFrequency) },
        uBloom: { value: Math.max(0, bloom) },
        uCenterShift: { value: H * 0.25 },
        uInvBaseHalf: { value: 1 / BASE_HALF },
        uInvHeight: { value: 1 / H },
        uMinAxis: { value: Math.min(BASE_HALF, H) },
        uPxScale: { value: 1 },
        uTimeScale: { value: TS },
        uLightMode: { value: lightMode ? 1 : 0 },
      },
    });

    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

    /* Redraws the still frame after anything that changes what it should
       look like, since the reduced-motion path is not running a loop. */
    let stillFrameDue = true;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduced = motionQuery.matches;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const { clientWidth: width, clientHeight: height } = container;
      if (width === 0 || height === 0) return;

      renderer.setSize(width * dpr * RENDER_SCALE, height * dpr * RENDER_SCALE);
      gl.canvas.style.width = `${width}px`;
      gl.canvas.style.height = `${height}px`;
      resolution[0] = gl.drawingBufferWidth;
      resolution[1] = gl.drawingBufferHeight;
      offsetPx[0] = offsetX * dpr * RENDER_SCALE;
      offsetPx[1] = offsetY * dpr * RENDER_SCALE;
      program.uniforms.uPxScale.value =
        1 / ((gl.drawingBufferHeight || 1) * 0.1 * SCALE);
      stillFrameDue = true;
    };

    /* The container is sized by layout, not by the window, so watch the box
       itself. */
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    /* Nothing to draw while the section is out of view. */
    let visible = true;
    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
      },
      { rootMargin: "100px", threshold: 0 }
    );
    visibilityObserver.observe(container);

    /* Each mount tumbles on its own rates, so two prisms never lock step. */
    const yawRate = 0.2 + Math.random() * 0.7;
    const pitchRate = 0.3 + Math.random() * 0.6;
    const rollRate = 0.1 + Math.random() * 0.5;
    const pitchPhase = Math.random() * Math.PI * 2;
    const rollPhase = Math.random() * Math.PI * 2;

    let yaw = 0;
    let pitch = 0;
    let roll = 0;
    const pointer = { x: 0, y: 0, inside: false };

    const onPointerMove = (event: PointerEvent) => {
      const width = Math.max(1, window.innerWidth);
      const height = Math.max(1, window.innerHeight);
      pointer.x = Math.min(1, Math.max(-1, (event.clientX / width - 0.5) * 2));
      pointer.y = Math.min(1, Math.max(-1, (event.clientY / height - 0.5) * 2));
      pointer.inside = true;
    };

    const onPointerOut = () => {
      pointer.inside = false;
    };

    const onMotionChange = () => {
      reduced = motionQuery.matches;
      stillFrameDue = true;
    };

    /* The tilt tracks the pointer across the whole window, not just the box it
       is drawn in, so these listeners are the one thing that has to be global —
       and only in the mode that uses them. */
    if (animationType === "hover") {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("mouseleave", onPointerOut);
      window.addEventListener("blur", onPointerOut);
    }
    motionQuery.addEventListener("change", onMotionChange);

    const start = performance.now();

    /* Draw once even while paused: it compiles the shader and leaves a frame
       in the buffer, so the reveal has nothing left to pay for. */
    let primed = false;
    let lastDraw = -Infinity;

    let frame = requestAnimationFrame(function update(now) {
      frame = requestAnimationFrame(update);
      if (!visible) return;
      if (pausedRef.current && primed) return;
      if (primed && now - lastDraw < FRAME_INTERVAL) return;
      lastDraw = now;
      primed = true;

      const time = (now - start) * 0.001;

      if (reduced) {
        /* One still frame: the prism, lit and held, not turning. */
        if (!stillFrameDue) return;
        stillFrameDue = false;
        program.uniforms.iTime.value = 0;
        program.uniforms.uUseBaseWobble.value = 0;
        program.uniforms.uRot.value = setMat3FromEuler(0, 0, 0, rotation);
        renderer.render({ scene: mesh });
        return;
      }

      program.uniforms.iTime.value = time;
      program.uniforms.uUseBaseWobble.value = animationType === "rotate" ? 1 : 0;

      if (animationType === "hover") {
        const maxTilt = 0.6 * HOVER_STRENGTH;
        yaw = lerp(yaw, (pointer.inside ? -pointer.x : 0) * maxTilt, INERTIA);
        pitch = lerp(pitch, (pointer.inside ? pointer.y : 0) * maxTilt, INERTIA);
        roll = lerp(roll, 0, 0.1);
        program.uniforms.uRot.value = setMat3FromEuler(yaw, pitch, roll, rotation);
      } else if (animationType === "3drotate") {
        const t = time * TS;
        yaw = t * yawRate;
        pitch = Math.sin(t * pitchRate + pitchPhase) * 0.6;
        roll = Math.sin(t * rollRate + rollPhase) * 0.5;
        program.uniforms.uRot.value = setMat3FromEuler(yaw, pitch, roll, rotation);
      }

      renderer.render({ scene: mesh });
    });

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      if (animationType === "hover") {
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("mouseleave", onPointerOut);
        window.removeEventListener("blur", onPointerOut);
      }
      motionQuery.removeEventListener("change", onMotionChange);
      gl.canvas.remove();
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [
    height,
    baseWidth,
    animationType,
    glow,
    offsetX,
    offsetY,
    noise,
    transparent,
    scale,
    hueShift,
    colorFrequency,
    hoverStrength,
    inertia,
    bloom,
    timeScale,
    renderScale,
    steps,
    maxFps,
    lightMode,
  ]);

  return (
    <div
      ref={containerRef}
      className={cn("relative size-full", className)}
      aria-hidden="true"
    />
  );
}

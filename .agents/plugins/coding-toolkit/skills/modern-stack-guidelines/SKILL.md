---
name: modern-stack-guidelines
description: Architectural rules and best practices for Next.js 16, React 19, Tailwind CSS v4, and Three.js memory management.
---

# Modern Web Stack Coding Guidelines

## 1. Next.js 16 & Server Components
* In Next.js 16, `params` and `searchParams` in Page and Layout props are **Promises**. Always `await params` or use `React.use(params)`.
* Keep Server Components as the default. Add `'use client'` only at leaf components requiring interactivity, state, or browser APIs.
* Never use deprecated routing patterns or synchronous cookie/header access.

## 2. React 19 Features
* Use the new `useActionState` instead of deprecated `useFormState`.
* Use `useOptimistic` for instant UI feedback.
* Pass `ref` directly as a prop in functional components (`forwardRef` is no longer needed in React 19).

## 3. Tailwind CSS v4
* Tailwind v4 uses CSS-first configuration via `@import "tailwindcss";` and `@theme` blocks in CSS.
* Avoid creating legacy `tailwind.config.js` files unless required for backward compatibility.

## 4. Three.js in React & Performance
* Always clean up WebGL renderers, scene graphs, geometries, materials, and textures in `useEffect` cleanup return functions to prevent memory leaks.
* Handle window resize events cleanly and throttle animations with `requestAnimationFrame`.

"use client";

import { useCallback, useRef } from "react";

// Deterministic wooden interactions rendered into short buffers (no variation, no ambience).
function createHoverTouchBuffer(ctx: AudioContext) {
  const duration = 0.04; // 40 ms, light touch
  const sampleRate = ctx.sampleRate;
  const length = Math.floor(sampleRate * duration);
  const buffer = ctx.createBuffer(1, length, sampleRate);
  const data = buffer.getChannelData(0);

  const f1 = 260;
  const f2 = 520;
  const decay = 28; // very fast decay for a faint touch
  const attack = 0.001; // sharp onset

  for (let i = 0; i < length; i++) {
    const t = i / sampleRate;
    const env = Math.exp(-decay * t);
    const hit = Math.min(1, t / attack);
    const sample = hit * env * (0.7 * Math.sin(2 * Math.PI * f1 * t) + 0.3 * Math.sin(2 * Math.PI * f2 * t));
    data[i] = sample;
  }

  return buffer;
}

function createTapBuffer(ctx: AudioContext) {
  const duration = 0.09; // short, dry tap
  const sampleRate = ctx.sampleRate;
  const length = Math.floor(sampleRate * duration);
  const buffer = ctx.createBuffer(1, length, sampleRate);
  const data = buffer.getChannelData(0);

  const f1 = 190; // body
  const f2 = 380; // overtone
  const decay = 20; // fast decay
  const attack = 0.0012; // sharp attack

  for (let i = 0; i < length; i++) {
    const t = i / sampleRate;
    const env = Math.exp(-decay * t);
    const hit = Math.min(1, t / attack); // quick ramp to avoid click
    const sample = hit * env * (0.72 * Math.sin(2 * Math.PI * f1 * t) + 0.28 * Math.sin(2 * Math.PI * f2 * t));
    data[i] = sample;
  }

  return buffer;
}

function playBufferedTap(ctx: AudioContext, buffer: AudioBuffer, gainValue: number) {
  const source = ctx.createBufferSource();
  source.buffer = buffer;

  const gain = ctx.createGain();
  const now = ctx.currentTime;
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.linearRampToValueAtTime(gainValue, now + 0.0025);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + buffer.duration);

  source.connect(gain).connect(ctx.destination);
  source.start(now);
  source.stop(now + buffer.duration + 0.02);
}

export function useSystemAudio() {
  const ctxRef = useRef<AudioContext | null>(null);
  const hoverBufferRef = useRef<AudioBuffer | null>(null);
  const tapBufferRef = useRef<AudioBuffer | null>(null);
  const navTapBufferRef = useRef<AudioBuffer | null>(null);

  const ensure = useCallback(() => {
    if (ctxRef.current) return ctxRef.current;
    const Ctor = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new Ctor();
    ctxRef.current = ctx;
    return ctx;
  }, []);

  const playHover = useCallback(() => {
    const ctx = ensure();
    if (!hoverBufferRef.current) {
      hoverBufferRef.current = createHoverTouchBuffer(ctx);
    }
    playBufferedTap(ctx, hoverBufferRef.current, 0.025); // very light touch
  }, [ensure]);

  const playClick = useCallback(() => {
    const ctx = ensure();
    if (!tapBufferRef.current) {
      tapBufferRef.current = createTapBuffer(ctx);
    }
    playBufferedTap(ctx, tapBufferRef.current, 0.05); // single wooden tap
  }, [ensure]);

  const playNav = useCallback(() => {
    const ctx = ensure();
    if (!navTapBufferRef.current) {
      navTapBufferRef.current = createTapBuffer(ctx);
    }
    playBufferedTap(ctx, navTapBufferRef.current, 0.042); // same tap, slightly lower volume
  }, [ensure]);

  return { playHover, playClick, playNav };
}

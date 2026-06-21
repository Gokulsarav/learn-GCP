import React, { useState, useEffect } from 'react';

function useCountUp(target: number, durationMs: number, trigger: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let rafId: number;
    const startTime = performance.now();
    function tick(now: number) {
      const progress = Math.min((now - startTime) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [trigger, target, durationMs]);
  return value;
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  suffix?: string;
  delay: number;
  accent: string;
}

export function StatCard({ icon, label, value, suffix = '', delay, accent }: StatCardProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  
  const count = useCountUp(value, 1100, mounted);
  
  return (
    <div className="ftl-stat" style={{ animationDelay: `${delay}ms`, '--accent': accent } as React.CSSProperties}>
      <div className="ftl-stat-icon">{icon}</div>
      <div>
        <div className="ftl-stat-value">{count}{suffix}</div>
        <div className="ftl-stat-label">{label}</div>
      </div>
    </div>
  );
}

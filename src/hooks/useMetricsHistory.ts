import { useState, useCallback, useRef } from "react";
import { VpsData } from "@/types/vps";

export interface MetricPoint {
  time: string;
  cpu: number;
  ram: number;
}

export interface ServiceEvent {
  time: string;
  name: string;
  port: number;
  status: "running" | "stopped";
  prevStatus?: "running" | "stopped";
}

const MAX_POINTS = 30;

export const useMetricsHistory = () => {
  const [history, setHistory] = useState<MetricPoint[]>([]);
  const [serviceEvents, setServiceEvents] = useState<ServiceEvent[]>([]);
  const prevServicesRef = useRef<Map<number, string>>(new Map());

  const pushData = useCallback((data: VpsData) => {
    const now = new Date().toLocaleTimeString("ar-EG", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    setHistory((prev) => {
      const next = [...prev, { time: now, cpu: data.cpu_percent, ram: data.ram_percent }];
      return next.length > MAX_POINTS ? next.slice(-MAX_POINTS) : next;
    });

    // Track service status changes
    const prevMap = prevServicesRef.current;
    const newEvents: ServiceEvent[] = [];

    for (const svc of data.services) {
      const prev = prevMap.get(svc.port);
      if (prev && prev !== svc.status) {
        newEvents.push({
          time: now,
          name: svc.name,
          port: svc.port,
          status: svc.status,
          prevStatus: prev as "running" | "stopped",
        });
      }
      prevMap.set(svc.port, svc.status);
    }

    if (newEvents.length > 0) {
      setServiceEvents((prev) => [...prev, ...newEvents].slice(-50));
    }
  }, []);

  return { history, serviceEvents, pushData };
};

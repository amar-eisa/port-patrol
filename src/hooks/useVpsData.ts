import { useState, useEffect, useCallback } from "react";
import { VpsData, mockVpsData } from "@/types/vps";

export const useVpsData = (refreshInterval = 30) => {
  const [data, setData] = useState<VpsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setError(null);
      // TODO: Replace with actual edge function call
      // For now, use mock data with slight random variation
      await new Promise((r) => setTimeout(r, 500));
      const varied = {
        ...mockVpsData,
        cpu_percent: Math.max(5, Math.min(95, mockVpsData.cpu_percent + (Math.random() - 0.5) * 10)),
        ram_percent: Math.max(20, Math.min(90, mockVpsData.ram_percent + (Math.random() - 0.5) * 5)),
        services: mockVpsData.services.map((s) => ({
          ...s,
          cpu_percent: s.status === "running"
            ? Math.max(0, s.cpu_percent + (Math.random() - 0.5) * 3)
            : 0,
        })),
      };
      setData(varied);
      setLastUpdated(new Date());
    } catch (err: any) {
      setError(err.message || "فشل في جلب البيانات");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, refreshInterval * 1000);
    return () => clearInterval(interval);
  }, [fetchData, refreshInterval]);

  return { data, loading, error, lastUpdated, refresh: fetchData };
};

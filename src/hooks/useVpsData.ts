import { useState, useEffect, useCallback } from "react";
import { VpsData } from "@/types/vps";
import { supabase } from "@/integrations/supabase/client";
import { useMetricsHistory } from "./useMetricsHistory";

export const useVpsData = (refreshInterval = 30) => {
  const [data, setData] = useState<VpsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const { history, serviceEvents, pushData } = useMetricsHistory();

  const fetchData = useCallback(async () => {
    try {
      setError(null);
      const { data: result, error: fnError } = await supabase.functions.invoke('server-monitor');
      
      if (fnError) {
        throw new Error(fnError.message || "فشل في الاتصال بالسيرفر");
      }
      
      if (result?.error) {
        throw new Error(result.error);
      }
      
      const vpsData = result as VpsData;
      setData(vpsData);
      setLastUpdated(new Date());
      pushData(vpsData);
    } catch (err: any) {
      setError(err.message || "فشل في جلب البيانات");
    } finally {
      setLoading(false);
    }
  }, [pushData]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, refreshInterval * 1000);
    return () => clearInterval(interval);
  }, [fetchData, refreshInterval]);

  return { data, loading, error, lastUpdated, refresh: fetchData, history, serviceEvents };
};

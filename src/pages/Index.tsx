import { useAuth } from "@/hooks/useAuth";
import { useVpsData } from "@/hooks/useVpsData";
import StatCard from "@/components/dashboard/StatCard";
import ResourceOverview from "@/components/dashboard/ResourceOverview";
import ServicesTable from "@/components/dashboard/ServicesTable";
import { Button } from "@/components/ui/button";
import { Network, Container, Wifi, WifiOff, RefreshCw, LogOut, Settings, Clock, Server } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const { signOut } = useAuth();
  const { data, loading, error, lastUpdated, refresh } = useVpsData();
  const navigate = useNavigate();

  const runningServices = data?.services.filter((s) => s.status === "running").length ?? 0;
  const totalPorts = data?.services.length ?? 0;
  const isConnected = !error && !!data;

  return (
    <div className="dark min-h-screen bg-background" dir="rtl">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur sticky top-0 z-10">
        <div className="container flex items-center justify-between h-14 px-4">
          <div className="flex items-center gap-3">
            <Server className="h-5 w-5 text-primary" />
            <h1 className="text-lg font-bold font-mono">VPS Monitor</h1>
            {data && (
              <span className="text-xs text-muted-foreground font-mono hidden sm:inline">
                {data.hostname}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={refresh} disabled={loading} title="تحديث">
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => navigate("/settings")} title="الإعدادات">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={signOut} title="تسجيل الخروج">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container px-4 py-6 space-y-6">
        {/* Last updated */}
        {lastUpdated && (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>آخر تحديث: {lastUpdated.toLocaleTimeString("ar-EG")}</span>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-destructive text-sm">
            {error}
          </div>
        )}

        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            title="البورتات المفتوحة"
            value={totalPorts}
            icon={Network}
            variant="default"
          />
          <StatCard
            title="الحاويات النشطة"
            value={`${runningServices} / ${totalPorts}`}
            icon={Container}
            variant="success"
          />
          <StatCard
            title="حالة الاتصال"
            value={isConnected ? "متصل" : "غير متصل"}
            icon={isConnected ? Wifi : WifiOff}
            variant={isConnected ? "success" : "destructive"}
            description={data?.uptime ? `Uptime: ${data.uptime}` : undefined}
          />
        </div>

        {/* Resource overview */}
        {data && (
          <ResourceOverview
            cpuPercent={data.cpu_percent}
            ramPercent={data.ram_percent}
            ramUsedMb={data.ram_used_mb}
            ramTotalMb={data.ram_total_mb}
          />
        )}

        {/* Services table */}
        {data && <ServicesTable services={data.services} />}

        {/* Loading skeleton */}
        {loading && !data && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 rounded-lg bg-card/50 animate-pulse" />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;

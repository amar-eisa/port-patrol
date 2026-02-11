import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cpu, MemoryStick } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResourceBarProps {
  label: string;
  value: number;
  icon: typeof Cpu;
  detail?: string;
}

const getColor = (value: number) => {
  if (value < 50) return "bg-success";
  if (value < 80) return "bg-warning";
  return "bg-destructive";
};

const ResourceBar = ({ label, value, icon: Icon, detail }: ResourceBarProps) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {detail && <span className="text-xs text-muted-foreground">{detail}</span>}
        <span className={cn("text-sm font-mono font-bold", value >= 80 ? "text-destructive" : value >= 50 ? "text-warning" : "text-success")}>
          {value.toFixed(1)}%
        </span>
      </div>
    </div>
    <div className="relative h-3 w-full overflow-hidden rounded-full bg-secondary">
      <div
        className={cn("h-full rounded-full transition-all duration-500", getColor(value))}
        style={{ width: `${Math.min(value, 100)}%` }}
      />
    </div>
  </div>
);

interface ResourceOverviewProps {
  cpuPercent: number;
  ramPercent: number;
  ramUsedMb: number;
  ramTotalMb: number;
}

const ResourceOverview = ({ cpuPercent, ramPercent, ramUsedMb, ramTotalMb }: ResourceOverviewProps) => (
  <Card className="bg-card/80 border-border/50">
    <CardHeader className="pb-3">
      <CardTitle className="text-base">استهلاك الموارد</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <ResourceBar label="CPU" value={cpuPercent} icon={Cpu} />
      <ResourceBar
        label="RAM"
        value={ramPercent}
        icon={MemoryStick}
        detail={`${ramUsedMb} / ${ramTotalMb} MB`}
      />
    </CardContent>
  </Card>
);

export default ResourceOverview;

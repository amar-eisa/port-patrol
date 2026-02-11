import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HardDrive } from "lucide-react";
import { DiskInfo } from "@/types/vps";
import { cn } from "@/lib/utils";

interface DiskUsageProps {
  disks: DiskInfo[];
}

const getColor = (value: number) => {
  if (value < 50) return "bg-success";
  if (value < 80) return "bg-warning";
  return "bg-destructive";
};

const DiskUsage = ({ disks }: DiskUsageProps) => (
  <Card className="bg-card/80 border-border/50">
    <CardHeader className="pb-3">
      <CardTitle className="text-base flex items-center gap-2">
        <HardDrive className="h-4 w-4 text-muted-foreground" />
        استهلاك القرص
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      {disks.map((disk) => (
        <div key={disk.mount} className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-mono">{disk.mount}</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                {disk.used_gb.toFixed(1)} / {disk.total_gb.toFixed(1)} GB
              </span>
              <span className={cn("text-sm font-mono font-bold", disk.percent >= 80 ? "text-destructive" : disk.percent >= 50 ? "text-warning" : "text-success")}>
                {disk.percent.toFixed(1)}%
              </span>
            </div>
          </div>
          <div className="relative h-3 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className={cn("h-full rounded-full transition-all duration-500", getColor(disk.percent))}
              style={{ width: `${Math.min(disk.percent, 100)}%` }}
            />
          </div>
        </div>
      ))}
    </CardContent>
  </Card>
);

export default DiskUsage;

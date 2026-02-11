import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { History, ArrowUp, ArrowDown } from "lucide-react";
import type { ServiceEvent } from "@/hooks/useMetricsHistory";

interface ServiceTimelineProps {
  events: ServiceEvent[];
}

const ServiceTimeline = ({ events }: ServiceTimelineProps) => {
  if (events.length === 0) {
    return (
      <Card className="bg-card/80 border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <History className="h-4 w-4 text-primary" />
            سجل تغييرات الخدمات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-6">
            لا توجد تغييرات بعد — سيتم تسجيل أي تغيير في حالة الخدمات هنا
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card/80 border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <History className="h-4 w-4 text-primary" />
          سجل تغييرات الخدمات
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 max-h-[250px] overflow-y-auto">
          {[...events].reverse().map((event, i) => (
            <div
              key={i}
              className="flex items-center justify-between gap-3 p-2 rounded-md bg-secondary/50 text-sm"
            >
              <div className="flex items-center gap-2 min-w-0">
                {event.status === "running" ? (
                  <ArrowUp className="h-3.5 w-3.5 text-success shrink-0" />
                ) : (
                  <ArrowDown className="h-3.5 w-3.5 text-destructive shrink-0" />
                )}
                <span className="font-mono truncate">{event.name}</span>
                <span className="text-muted-foreground text-xs">:{event.port}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Badge
                  variant={event.status === "running" ? "default" : "destructive"}
                  className="text-[10px] px-1.5 py-0"
                >
                  {event.status === "running" ? "تشغيل" : "توقف"}
                </Badge>
                <span className="text-[10px] text-muted-foreground font-mono">{event.time}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceTimeline;

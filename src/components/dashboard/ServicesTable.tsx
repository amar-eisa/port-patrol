import { useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ServiceInfo } from "@/types/vps";
import { cn } from "@/lib/utils";

interface ServicesTableProps {
  services: ServiceInfo[];
}

function groupByRange(services: ServiceInfo[]) {
  const groups: Record<string, ServiceInfo[]> = {};
  for (const s of services) {
    const key = s.port < 1000 ? "0" : String(Math.floor(s.port / 1000) * 1000);
    if (!groups[key]) groups[key] = [];
    groups[key].push(s);
  }
  // Sort each group internally and sort keys
  const sorted = Object.entries(groups)
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([key, items]) => ({
      key,
      label: key === "0" ? "0 – 999" : `${key} – ${Number(key) + 999}`,
      services: items.sort((a, b) => a.port - b.port),
    }));
  return sorted;
}

const ServicesTable = ({ services }: ServicesTableProps) => {
  const groups = useMemo(() => groupByRange(services), [services]);
  const allKeys = useMemo(() => groups.map((g) => g.key), [groups]);

  return (
    <div className="rounded-lg border border-border/50 bg-card/80 overflow-hidden">
      <div className="p-4 border-b border-border/50">
        <h3 className="font-semibold">البورتات والخدمات</h3>
        <p className="text-xs text-muted-foreground mt-1">{services.length} خدمة مسجلة</p>
      </div>
      <Accordion type="multiple" defaultValue={allKeys} className="px-2">
        {groups.map((group) => {
          const running = group.services.filter((s) => s.status === "running").length;
          const stopped = group.services.length - running;
          return (
            <AccordionItem key={group.key} value={group.key} className="border-border/50">
              <AccordionTrigger className="px-2 py-3 text-sm hover:no-underline">
                <div className="flex items-center gap-3">
                  <span className="font-mono font-semibold text-primary">{group.label}</span>
                  <span className="text-xs text-muted-foreground">
                    {group.services.length} خدمة
                  </span>
                  {running > 0 && (
                    <Badge variant="outline" className="text-[10px] bg-success/15 text-success border-success/30">
                      {running} يعمل
                    </Badge>
                  )}
                  {stopped > 0 && (
                    <Badge variant="outline" className="text-[10px] bg-destructive/15 text-destructive border-destructive/30">
                      {stopped} متوقف
                    </Badge>
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-2">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-border/50">
                      <TableHead className="text-right">البورت</TableHead>
                      <TableHead className="text-right">الاسم</TableHead>
                      <TableHead className="text-right">PID</TableHead>
                      <TableHead className="text-right">الحالة</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {group.services.map((service) => (
                      <TableRow key={service.port} className="border-border/50">
                        <TableCell className="font-mono font-bold text-primary">{service.port}</TableCell>
                        <TableCell className="font-mono text-sm">{service.name}</TableCell>
                        <TableCell className="font-mono text-sm text-muted-foreground">
                          {service.pid ?? "—"}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={cn(
                              "text-xs",
                              service.status === "running"
                                ? "bg-success/15 text-success border-success/30 hover:bg-success/20"
                                : "bg-destructive/15 text-destructive border-destructive/30 hover:bg-destructive/20"
                            )}
                            variant="outline"
                          >
                            <span className={cn(
                              "inline-block w-1.5 h-1.5 rounded-full mr-1.5",
                              service.status === "running" ? "bg-success animate-pulse-glow" : "bg-destructive"
                            )} />
                            {service.status === "running" ? "يعمل" : "متوقف"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default ServicesTable;

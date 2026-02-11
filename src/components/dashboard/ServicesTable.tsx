import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ServiceInfo } from "@/types/vps";
import { cn } from "@/lib/utils";

interface ServicesTableProps {
  services: ServiceInfo[];
}

const ServicesTable = ({ services }: ServicesTableProps) => (
  <div className="rounded-lg border border-border/50 bg-card/80 overflow-hidden">
    <div className="p-4 border-b border-border/50">
      <h3 className="font-semibold">البورتات والخدمات</h3>
      <p className="text-xs text-muted-foreground mt-1">{services.length} خدمة مسجلة</p>
    </div>
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
        {services.map((service) => (
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
  </div>
);

export default ServicesTable;

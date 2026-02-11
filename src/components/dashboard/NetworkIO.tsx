import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownToLine, ArrowUpFromLine, Activity } from "lucide-react";
import { NetworkInfo } from "@/types/vps";

interface NetworkIOProps {
  network: NetworkInfo;
}

const NetworkIO = ({ network }: NetworkIOProps) => (
  <Card className="bg-card/80 border-border/50">
    <CardHeader className="pb-3">
      <CardTitle className="text-base flex items-center gap-2">
        <Activity className="h-4 w-4 text-muted-foreground" />
        استهلاك الشبكة
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
          <ArrowUpFromLine className="h-5 w-5 text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">مُرسل</p>
            <p className="text-lg font-bold font-mono">{network.bytes_sent_mb.toFixed(1)} MB</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
          <ArrowDownToLine className="h-5 w-5 text-success" />
          <div>
            <p className="text-xs text-muted-foreground">مُستقبل</p>
            <p className="text-lg font-bold font-mono">{network.bytes_recv_mb.toFixed(1)} MB</p>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default NetworkIO;

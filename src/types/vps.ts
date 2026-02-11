export interface VpsData {
  cpu_percent: number;
  ram_percent: number;
  ram_used_mb: number;
  ram_total_mb: number;
  uptime: string;
  hostname: string;
  services: ServiceInfo[];
}

export interface ServiceInfo {
  port: number;
  name: string;
  pid: number | null;
  status: "running" | "stopped";
}

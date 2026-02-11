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
  protocol: "TCP" | "UDP";
  service_name: string;
  container_name: string | null;
  status: "running" | "stopped";
  cpu_percent: number;
  ram_mb: number;
}

// Mock data for development
export const mockVpsData: VpsData = {
  cpu_percent: 34,
  ram_percent: 62,
  ram_used_mb: 2540,
  ram_total_mb: 4096,
  uptime: "14 days, 3 hours",
  hostname: "vps-prod-01",
  services: [
    { port: 80, protocol: "TCP", service_name: "nginx", container_name: "web-proxy", status: "running", cpu_percent: 2.1, ram_mb: 64 },
    { port: 443, protocol: "TCP", service_name: "nginx", container_name: "web-proxy", status: "running", cpu_percent: 1.8, ram_mb: 64 },
    { port: 3000, protocol: "TCP", service_name: "node", container_name: "app-frontend", status: "running", cpu_percent: 8.5, ram_mb: 256 },
    { port: 5432, protocol: "TCP", service_name: "postgresql", container_name: "db-postgres", status: "running", cpu_percent: 5.2, ram_mb: 512 },
    { port: 6379, protocol: "TCP", service_name: "redis", container_name: "cache-redis", status: "running", cpu_percent: 0.8, ram_mb: 48 },
    { port: 8080, protocol: "TCP", service_name: "api-server", container_name: "app-backend", status: "running", cpu_percent: 12.3, ram_mb: 384 },
    { port: 9090, protocol: "TCP", service_name: "prometheus", container_name: "monitoring", status: "stopped", cpu_percent: 0, ram_mb: 0 },
    { port: 3100, protocol: "TCP", service_name: "loki", container_name: "log-collector", status: "running", cpu_percent: 3.1, ram_mb: 128 },
  ],
};

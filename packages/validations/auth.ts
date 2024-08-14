export type HealthResponse = {
  status: "UP" | "DOWN";
  timestamp: string;
  uptime: number;
  environment: "development";
};

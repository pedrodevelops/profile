import { env } from "@web/env";

type HealthResponse = {
  status: "UP" | "DOWN";
  timestamp: string;
  uptime: number;
  environment: "development" | "production";
};

export class AppService {
  async fetchHealth(): Promise<HealthResponse> {
    const response = await fetch(env.API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch health");
    }

    return await response.json();
  }
}

export const appService = new AppService();

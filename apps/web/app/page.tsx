import { appService } from "@web/services/app.service";

export default async function Home() {
  const health = await appService.fetchHealth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="space-y-4 p-4 rounded bg-accent drop-shadow-md">
        <p className="font-bold text-xl text-center">Profile</p>
        <div>
          <p className="text-green-700 font-bold text-lg">Server response:</p>
          <div className="bg-zinc-800 rounded p-4 text-background font-bold">
            <p>status: {health.status}</p>
            <p>timestamp: {health.timestamp}</p>
            <p>uptime: {health.uptime}</p>
            <p>environment: {health.environment}</p>
          </div>
        </div>
      </div>
    </main>
  );
}

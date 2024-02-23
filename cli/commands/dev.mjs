export default class Dev {
  constructor() {
    this.spinners = new Spinnies({
      succeedColor: "white",
      failColor: "white",
    });
  }

  async run() {
    const startTime = process.hrtime();
    this.spinners.add("dev", {
      text: "Starting development server...",
    });

    await this.startServer();

    const endTime = process.hrtime(startTime);
    const time = endTime[0] + endTime[1] / 1e9;

    this.spinners.succeed("dev", {
      text: `Development server started (${time.toFixed(2)}s)`,
    });
  }

  async startServer() {
    const server = new Server();
    await server.start();
  }
}

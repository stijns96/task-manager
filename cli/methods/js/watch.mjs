import { watch } from "chokidar";

export default class WatchJs {
  constructor({ files } = { files: [""] }) {
    this.files = files;

    this.watchOptions = {
      ignored: /(^|[\/\\])\../,
      persistent: true,
    };
  }

  run() {
    watch(this.files, this.watchOptions)
      .on("all", (event, path) => console.log(`Watcher event: ${event} on ${path}`)
      // On error
      .on("error", (error) => console.log(`Watcher error: ${error}`))

      // On ready
      .on("ready", () => console.log("JS watcher is ready"))

      // On add
      .on("add", (path) => console.log(`File ${path} has been added`))

      // On change
      .on("change", (path) => console.log("File changed:", path))

      // On remove
      .on("unlink", (path) => console.log(`File ${path} has been removed`));
  }
}

import mongoose from "mongoose";
import { ServerLoader, ServerSettings } from "@tsed/common";
import * as Path from "path";
import { $log } from "ts-log-debug";
import authentication from "./middlewares/Authentication";
const cors = require("cors");

const rootDir = Path.resolve(__dirname);
require("dotenv-safe").config();
@ServerSettings({
  rootDir,
  acceptMimes: ["application/json"],
  port: 3000,
  debug: false,
  mount: {
    "/api": "${rootDir}/controllers/**/*.ts"
  }
})
export class Server extends ServerLoader {
  /**
   * This method lets you configure the middleware required for your application to work.
   * @returns {Server}
   */
  public $beforeRoutesInit(): void | Promise<any> {
    const bodyParser = require("body-parser");
    this.use(bodyParser.json())
      .use(
        bodyParser.urlencoded({
          extended: true
        })
      )
      .use(cors({ origin: true }))
      .use(authentication);

    const mongoUrl: string = process.env.mongoURL;
    mongoose.Promise = global.Promise;
    mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    return null;
  }
}

async function bootstrap() {
  try {
    console.log("Start server...");
    const server = await ServerLoader.bootstrap(Server);
    $log.level = "warn";

    await server.listen();
    console.log("Server initialized");
  } catch (er) {
    console.log(er);
  }
}

bootstrap();

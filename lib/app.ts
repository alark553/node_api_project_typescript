import * as express from "express";
import * as bodyParser from "body-parser";

import { Routes } from "./routes/crmRoutes";
import * as mongoose from "mongoose";

class App {
  public app: express.Application;
  public routerPrv: Routes = new Routes();
  public mongoUrl: string = "mongodb://localhost/CRMdb";

  constructor() {
    this.app = express();
    this.config();
    this.routerPrv.routes(this.app);
    this.mongoSetup();
  }

  private config(): void {
    //support application/json type post data
    this.app.use(bodyParser.json());

    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  private mongoSetup(): void {
    mongoose.Promise = global.Promise;
    mongoose.connect(this.mongoUrl);
  }
}

export default new App().app;

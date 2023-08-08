import express, { Router } from "express";

export default class UserRoutes {
  private router: Router = express.Router();

  constructor() {
    this.configRoutes();
  }

  private configRoutes = (): void => {
    this.router.get("/", (req, res) => {
      res.send("Hello World!");
    });
  };

  public getRouter = (): Router => {
    return this.router;
  };
}

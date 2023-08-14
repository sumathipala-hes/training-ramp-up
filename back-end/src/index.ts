import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { Routes } from "./routes/routes";
import { Student } from "./entity/Student";

AppDataSource.initialize()
  .then(async () => {
    // create express app
    const app = express();
    app.use(bodyParser.json());

    // register express routes from defined application routes
    Routes.forEach((route) => {
      (app as any)[route.method](
        route.route,
        (req: Request, res: Response, next: Function) => {
          const result = new (route.controller as any)()[route.action](
            req,
            res,
            next
          );
          if (result instanceof Promise) {
            result.then((result) =>
              result !== null && result !== undefined
                ? res.send(result)
                : undefined
            );
          } else if (result !== null && result !== undefined) {
            res.json(result);
          }
        }
      );
    });

    // setup express app here
    // ...

    // start express server
    app.listen(3001);

    //insert new users for test
    await AppDataSource.manager.save(
      AppDataSource.manager.create(Student, {
        name: "Phantom",
        age: 24,
        dof: "1996-01-01",
        gender: "Male",
        address: "colombo",
        mobile: "0771234567",
      })
    );

    // await AppDataSource.manager.save(
    //     AppDataSource.manager.create(Student, {
    //         firstName: "Phantom",
    //         lastName: "Assassin",
    //         age: 24
    //     })
    // )

    console.log(
      "Express server has started on port 3001. Open http://localhost:3001/students to see results"
    );
  })
  .catch((error) => console.log(error));

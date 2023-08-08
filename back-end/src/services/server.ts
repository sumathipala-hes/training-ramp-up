import express, {Express, Request, Response} from 'express';
import { DataSource } from 'typeorm';
import "reflect-metadata";

const app: Express = express();
const port = 3000;

app.get('/', (req: Request, res: Response)=>{
    res.send('Hello, p this is Express + TypeScript');
});

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "admin",
    database: "master",
    synchronize: true,
    logging: true
});

AppDataSource.initialize()
    .then(() => {
        console.log(`[Server]: Database Connected Successfully.`);
    })
    .catch((err) => console.log(`Error Connecting Database:${err}`))

app.listen(port, ()=> {
console.log(`[Server]: I am running at https://localhost:${port}`);
});
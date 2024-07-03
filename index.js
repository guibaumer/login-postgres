import express from 'express';
import homeRoutes from './routes/homeRouter.js';
import pigeonRouter from './routes/pigeonRouter.js';
import * as dotenv from 'dotenv';
dotenv.config();

class App {
    constructor() {
      this.app = express();
      this.middlewares();
      this.routes();
    }
  
  middlewares() {
    this.app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', ['http://localhost:3001']); 
      // res.setHeader('Access-Control-Allow-Origin', ['http://localhost:3001']); 
      // res.setHeader('Access-Control-Allow-Origin', ['https://login-next.netlify.app']); 
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
      res.setHeader('Access-Control-Allow-Headers', 'content-type');
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      next();
  });
    this.app.enable('trust proxy'),  
    this.app.options('*', (req, res) => {
      res.status(200).end();
    });
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

    routes() {
      this.app.use('/', homeRoutes);
      this.app.use('/pigeon', pigeonRouter);
    }

  }
  
  export default new App().app;



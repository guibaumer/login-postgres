import express from 'express';
import homeRoutes from './routes/homeRouter.js';
import userRoutes from './routes/userRouter.js';
import session from 'express-session';
import pgSession from 'connect-pg-simple';
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
      // res.setHeader('Access-Control-Allow-Origin', ['https://localhost:3001']); 
      // res.setHeader('Access-Control-Allow-Origin', ['http://localhost:3001']); 
      res.setHeader('Access-Control-Allow-Origin', ['https://login-next.netlify.app']); 
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
      res.setHeader('Access-Control-Allow-Headers', 'content-type');
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      next();
  });
    this.app.enable('trust proxy'),  
    this.app.options('*', (req, res) => {
      res.status(200).end(); // Correctly respond to preflight
    });
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(session({
      store: new (pgSession(session))({
        conString: process.env.DB_STRING,
        tableName: 'sessions'
      }),
      secret: process.env.SECRET,
      // resave: true,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // One week
        httpOnly: true,
        sameSite: 'none', 
        secure: true, 
      }
    }));
    this.app.use((req, res, next) => {
      req.locals = req.locals || {};
      next();
    });
  }

    routes() {
      this.app.use('/', homeRoutes);
      this.app.use('/user', userRoutes);
    }

  }
  
  export default new App().app;



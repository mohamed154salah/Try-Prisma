import { protect } from './modules/auth';
// create express server
import express ,{ Request, Response,Application} from 'express';
import router from './router';
import morgan from 'morgan';
import cors from 'cors';
import { createUser, loginUser } from './handlers/user';
const app:Application = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('static'));
app.use(cors());
app.use("/api",protect,router);
app.post('/signUp', createUser);
app.post('/signIn', loginUser);
// create a GET route


app.get('/', (_req: Request, res :Response) => {
  res.status(200).json({ message: 'hello' });
});
app.use((err:any,req: any, res: any,next: any) => {
  if (err.type === "auth") {
    return res.status(401).json({ message: "unauthorized" })
  } else if (err.type === "input") {
    return res.status(400).json({ message: "invalid input" })
  } else {
    return res.status(500).json({ message: "something went wrong" })
  }
});

export default app;

import { Router, Request, Response } from "express";
import { postRouter } from "./posts";

const router = Router();

router.use('/posts', postRouter)

router.get('/', (req: Request, res: Response) => {
  res.send('Hello, API!');
});

export default router;
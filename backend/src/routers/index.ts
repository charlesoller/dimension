import { Router, Request, Response } from "express";
import { postRouter } from "./posts";
import { authRouter } from "./auth";
import { restoreUser } from "../utils/auth";

const router = Router();

router.use(restoreUser);
router.use('/auth', authRouter);
router.use('/posts', postRouter);

router.get('/', (req: Request, res: Response) => {
  res.send('Hello, API!');
});

export default router;
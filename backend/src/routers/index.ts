import { Router, Request, Response } from "express";
import { postRouter } from "./posts";
import { sessionRouter } from "./session";
import { commentRouter } from "./comments";
import { restoreUser } from "../utils/auth";

const router = Router();

router.use(restoreUser);
router.use('/session', sessionRouter);
router.use('/posts', postRouter);
router.use('/comments', commentRouter);


router.get('/', (req: Request, res: Response) => {
  res.send('Hello, API!');
});

export default router;
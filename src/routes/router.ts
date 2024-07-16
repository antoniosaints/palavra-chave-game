import { Router, Request, Response } from 'express';
import { getHtml } from '../server';

const router = Router();

router.get('/jogar', (req: Request, res: Response) => {
  res.sendFile(getHtml("gameboard"));
});

export default router;

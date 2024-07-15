import { Router, Request, Response } from 'express';

const router = Router();

router.get('/board', (req: Request, res: Response) => {
  res.render('index', { title: 'Express' });
});

router.get('/hello', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

export default router;

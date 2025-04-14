// main-controller.ts
// controllers for main-route.ts

import { Request, Response } from 'express';

export const getIndex = (_req: Request, res: Response) => {
  res.render('index');
};

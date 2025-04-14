// not-found.ts
// middleware to handle any non-existent pages

import { Request, Response } from 'express';

const notFound = (_req: Request, res: Response) => {
  res.status(404);
  res.send('Page Not Found');
};

export default notFound;

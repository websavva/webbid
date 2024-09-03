import type { Handler } from 'express';

export const healthHandler: Handler = async (_, res) => {
  return res.status(200).send('ok');
};

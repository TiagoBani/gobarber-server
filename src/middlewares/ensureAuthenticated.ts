import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import config from '../config/auth';

interface TokenPayload {
  sub: string;
  exp: number;
  iat: number;
}

export default async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const { authorization } = request.headers;
  if (!authorization) {
    response.status(401).json({ message: 'JWT token is missing' });
    throw new Error('JWT token is missing');
  }

  const [, token] = authorization.split(' ');

  const { secret } = config.jwt;

  try {
    const decoded = verify(token, secret);
    const { sub } = decoded as TokenPayload;

    request.user = {
      id: sub,
    };
    next();
  } catch {
    response.status(401).json({ message: 'JWT token is invalid' });
    throw new Error('JWT token is invalid');
  }
}

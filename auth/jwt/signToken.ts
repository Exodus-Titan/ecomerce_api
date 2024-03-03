import jsonwebtoen from 'jsonwebtoken';
import { createPayload } from './createPayload';

export function signToken(id: string, role: Boolean){
  const secret = process.env.JWT_SECRET;

  const options = {
    expiresIn: '1d'
  }

  if (secret) {
    return jsonwebtoen.sign(createPayload(id, role), secret, options);
  } else {
    throw new Error('JWT secret is undefined');
  }
}

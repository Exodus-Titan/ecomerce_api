import jsonwebtoen from 'jsonwebtoken';

export function validateToken(token: string){
  const secret = process.env.JWT_SECRET;

  if (secret) {
    return jsonwebtoen.verify(token, secret);
  } else {
    throw new Error('JWT secret is undefined');
  }

};

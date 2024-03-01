import 'dotenv/config';

export const config = {
  env: process.env.NODE_ENV || 'dev',
  isProd: process.env.NODE_ENV || 'production',
  port: process.env.PORT || 3000,
  apiKeys: process.env.API_KEYS,
  jwtSecret: process.env.JWT_SECRET,
}

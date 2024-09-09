import dotenv from 'dotenv';

export function loadEnvironment() {
  if (process.env.NODE_ENV === 'production') {
    dotenv.config({ path: '.env.prod' });
  } else {
    dotenv.config({ path: '.env.dev' });
  }
}

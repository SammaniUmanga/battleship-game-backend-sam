export function getEnvPath(destination: string): string {
  const env: string | undefined = process.env.NODE_ENV;
  let envFile;

  if (env === 'DEV') {
    envFile = '.env.dev';
  } else if (env === 'PROD') {
    envFile = '.env.prod';
  } else {
    envFile = '.env';
  }

  return `${destination}/${envFile}`;
}

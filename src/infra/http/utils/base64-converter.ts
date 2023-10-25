import { LoginPayload } from '../dto/return/return-login-payload';

export const authorizationToBaseLoginPayload = (
  authorization: string,
): LoginPayload | undefined => {
  const authorizationSplitted = authorization.split('.');

  if (authorization.length < 3 || !authorizationSplitted[1]) {
    return undefined;
  }

  return JSON.parse(
    Buffer.from(authorizationSplitted[1], 'base64').toString('ascii'),
  );
};

import { User } from '@auth0/auth0-react';

const DOMAIN = import.meta.env.VITE_DOMAIN;
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;

export function getConfig() {
  return {
    domain: DOMAIN,
    clientId: CLIENT_ID,
  };
}

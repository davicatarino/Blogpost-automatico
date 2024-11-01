import fs from 'fs';
import path from 'path';

const TOKEN_PATH = path.join(process.cwd(), 'token.json');

export function getOAuthTokens() {
  if (fs.existsSync(TOKEN_PATH)) {
    const tokenData = fs.readFileSync(TOKEN_PATH, 'utf-8');
    return JSON.parse(tokenData);
  }
  return null;
}

export function setOAuthTokens(tokens: any) {
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
}

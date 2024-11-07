import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

const TOKEN_PATH = path.join(process.cwd(), 'token.json');

const oauth2Client = new google.auth.OAuth2(
  process.env.GG_CLIENT,
  process.env.GG_CLIENT_KEY,
  'http://localhost:3004/api/google-callback'
);

// Carrega tokens existentes, se houver
function loadTokens() {
  if (fs.existsSync(TOKEN_PATH)) {
    const tokenData = fs.readFileSync(TOKEN_PATH, 'utf-8');
    const tokens = JSON.parse(tokenData);
    oauth2Client.setCredentials(tokens);
    return tokens;
  }
  return null;
}

// Salva tokens em `token.json`
function saveTokens(tokens: any) {
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
  oauth2Client.setCredentials(tokens);
}

// Verifica e carrega os tokens na inicialização
loadTokens();

oauth2Client.on('tokens', (newTokens) => {
  if (newTokens.access_token) {
    const currentTokens = loadTokens() || {};
    const updatedTokens = { ...currentTokens, ...newTokens };
    saveTokens(updatedTokens);
  }
});

export function getClient() {
  return oauth2Client;
}

export function getAuthUrl() {
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/spreadsheets'],
  });
}

export async function getAccessToken(code: string) {
  const { tokens } = await oauth2Client.getToken(code);
  saveTokens(tokens);
  oauth2Client.setCredentials(tokens);
  return tokens;
}

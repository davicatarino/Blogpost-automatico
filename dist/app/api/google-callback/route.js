import { NextResponse } from 'next/server';
import { getAccessToken } from '@/lib/googleAuth';
import { setOAuthTokens } from '@/lib/authTokens';
export async function GET(request) {
    const url = new URL(request.url);
    const code = url.searchParams.get('code');
    if (!code) {
        return NextResponse.json({ error: 'Authorization code not found' }, { status: 400 });
    }
    try {
        const tokens = await getAccessToken(code);
        // Ajusta tokens para remover `null` antes de salvar
        setOAuthTokens({
            access_token: tokens.access_token ?? undefined,
            refresh_token: tokens.refresh_token ?? undefined,
        });
        return NextResponse.json({ message: 'Tokens armazenados com sucesso', tokens });
    }
    catch (error) {
        console.error('Erro ao obter o token de acesso:', error);
        return NextResponse.json({ error: 'Erro ao obter o token de acesso' }, { status: 500 });
    }
}

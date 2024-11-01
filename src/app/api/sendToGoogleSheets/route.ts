import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { getClient } from '@/lib/googleAuth';

export async function POST(request: Request) {
  const { cell } = await request.json();
  const spreadsheetId = '1ZuVlrBLZ89pIBCR8TI8t8aQHqtPqsvdT4V9oeqM7qQA'; // ID da sua planilha
  const sheetName = 'leads_cll'; // Nome da aba exata na planilha

  if (!cell) {
    return NextResponse.json({ message: 'Número de celular não fornecido.' }, { status: 400 });
  }

  try {
    const authClient = getClient();
    const sheets = google.sheets({ version: 'v4', auth: authClient });

    // Configura o range para a coluna A inteira para adicionar na próxima linha disponível
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `!A1`, // Define o range para toda a coluna A
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS', // Insere uma nova linha se necessário
      requestBody: {
        values: [[cell]], // Insere o número de celular
      },
    });

    if (response.status === 200) {
      return NextResponse.json({ message: 'Número de celular salvo com sucesso.' });
    } else {
      return NextResponse.json({ message: 'Erro ao salvar o número na planilha.' }, { status: 500 });
    }
  } catch (error) {
    console.error('Erro ao salvar o número na planilha:', error);
    return NextResponse.json({ message: 'Erro ao salvar o número na planilha.' }, { status: 500 });
  }
}

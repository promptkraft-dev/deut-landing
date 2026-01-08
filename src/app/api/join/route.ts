import { NextResponse } from 'next/server';
import { Pool } from '@neondatabase/serverless';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const client = await pool.connect();
    
    // Пытаемся сохранить. ON CONFLICT DO NOTHING значит, что дубликаты просто игнорируются (ошибки не будет)
    try {
      await client.query(
        'INSERT INTO superusers (email) VALUES ($1) ON CONFLICT (email) DO NOTHING',
        [email]
      );
    } finally {
      client.release();
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Database error:', error);
    // Даже если ошибка базы, юзеру можно показать "ок", чтобы не пугать. Но тут вернем 500 для отладки.
    return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
  }
}
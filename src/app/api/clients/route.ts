import { openDb } from '@/lib/db';

export async function GET() {
  const db = await openDb();
  const clientes = await db.all('SELECT * FROM clientes');
  return Response.json(clientes);
}

export async function POST(request: Request) {
  const { nome, telefone, email, etapa } = await request.json();
  const db = await openDb();
  const result = await db.run(
    'INSERT INTO clientes (nome, telefone, email, etapa) VALUES (?, ?, ?, ?)',
    [nome, telefone, email, etapa]
  );
  const cliente = await db.get('SELECT * FROM clientes WHERE id = ?', [
    result.lastID,
  ]);

  return Response.json(cliente, { status: 201 });
}

export async function PUT(request: Request) {
  const { id, nome, telefone, email, etapa } = await request.json();
  const db = await openDb();
  await db.run(
    'UPDATE clientes SET nome = ?, telefone = ?, email = ?, etapa = ? WHERE id = ?',
    [nome, telefone, email, etapa, id]
  );
  return Response.json({ mensagem: 'Cliente atualizado com sucesso' });
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  const db = await openDb();
  await db.run('DELETE FROM clientes WHERE id = ?', [id]);
  return Response.json({ mensagem: 'Cliente removido com sucesso' });
}

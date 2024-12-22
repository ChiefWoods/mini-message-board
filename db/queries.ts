import pool from './pool';

export async function getAllMessages() {
  const { rows } = await pool.query('SELECT * FROM messages');
  return rows;
}

export async function getMessage(id: number) {
  const { rows } = await pool.query('SELECT * FROM messages WHERE id = $1', [id]);
  return rows[0];
}

export async function addMessage(user: string, text: string) {
  await pool.query('INSERT INTO messages (text, "user", added) VALUES ($1, $2, DEFAULT)', [text, user]);
}
import { Client } from 'pg';

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  text TEXT NOT NULL,
  "user" TEXT NOT NULL,
  added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO messages (text, "user", added) 
VALUES
  ('Hello, world!', 'Bryan', DEFAULT), 
  ('Welcome to the message board!', 'Odin', DEFAULT),
  ('Howdy', 'Damon', DEFAULT);
`;

async function main() {
  console.log("Seeding...");
  const client = new Client({
    connectionString: process.env.DB_CONNECTION_URI,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("Done!");
}

main();
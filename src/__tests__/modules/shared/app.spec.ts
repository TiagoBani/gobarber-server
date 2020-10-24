import request from 'supertest';

import app from '@shared/infra/http/app';
import { Connection, createConnection, getConnection } from 'typeorm';

let connection: Connection;

describe('App', () => {
  beforeAll(async () => {
    connection = await createConnection();

    await connection.query('DROP TABLE IF EXISTS appointments');
    await connection.query('DROP TABLE IF EXISTS user_tokens');
    await connection.query('DROP TABLE IF EXISTS users');
    await connection.query('DROP TABLE IF EXISTS migrations');

    await connection.runMigrations();
  });

  beforeEach(async () => {
    await connection.query('DELETE FROM appointments');
    await connection.query('DELETE FROM user_tokens');
    await connection.query('DELETE FROM users');
  });

  afterAll(async () => {
    const mainConnection = getConnection();

    await connection.close();
    await mainConnection.close();
  });

  it('should to be able create user', async () => {
    const user = {
      name: 'John Doe',
      email: 'example@email.com',
      password: '123123',
    };
    const response = await request(app).post('/users').send(user);

    expect(response.body).toEqual(
      expect.objectContaining({ name: user.name, email: user.email }),
    );
  });
});

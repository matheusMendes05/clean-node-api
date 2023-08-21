import request from 'supertest';
import app from '../config/app';
import 'dotenv/config';
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper';

const uri = process.env.MONGO_URL;
describe('SignUp Routes', () => {
  beforeAll(async () => {
    if (uri !== undefined) await MongoHelper.connect(uri);
  }, 5000);

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection('accounts');
    accountCollection.deleteMany({});
  });

  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Matheus',
        email: 'matheus@gmail.com',
        password: '123',
        passwordConfirmation: '123',
      })
      .expect(200);
  });
});

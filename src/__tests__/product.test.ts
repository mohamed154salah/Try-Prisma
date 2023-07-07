import app from '../server';
import request from 'supertest';

describe('Test Product endpoints', () => {

  var token =  (async () => {
    await request(app)
      .post('/signIn')
      .send({ email: "mo@gmail.com", password: "123456" })
  })();

  it('should get all products', async () => {
  console.log(token)
    const server2: any = await request(app)
      .get('/api/product')
      .set('Authorization', `Bearer ${token}`)
      

      expect(server2.status).toBe(200);

  });

});

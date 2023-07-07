import app from '../server';
import request from 'supertest';


describe('Test User endpoints', () => {
  it('should SignIn with exists User', async () => {
    const server:any = await request(app)
      .post('/signIn')
      .send({email:"mo@gmail.com",password:"123456"})

    expect(server.status).toBe(200);
  });

  it("should't SignIn with not exists User", async () => {
    const server:any = await request(app)
      .post('/signIn')
      .send({email:"mohamedMont@gmail.com",password:"123456"})

    expect(server.status).toBe(401);
  });


});

const request = require('supertest');
const userRoutes = require('../../routes/userRoutes');

describe('Test userRoutes', () => {
  it('should get all users', async () => {
    const res = await request(userRoutes).get('/');

    expect(res.statusCode).toEqual(200);
    // expect(res.body).toHaveProperty('name');
  });

  // it('should get main route', async () => {
  //     const res = await request(userRoutes).post('/users').send({
  //         name: "",
  //         password: ""
  //     })
  // })
});

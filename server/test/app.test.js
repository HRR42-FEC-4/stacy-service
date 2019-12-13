const app = require('../index');
const request = require('supertest');


describe('GET /artists/:artistId', () => {
  afterAll(async () => {
    await new Promise(resolve => setTimeout(() => resolve(), 500));
  });

  it('It should get all artworks by an artist with input artist ID', async () => {
      const response = await request(app).get('/artists/4');
      expect(response.body.id).toBeDefined();
      expect(response.body.id).toBe(4);
      expect(response.statusCode).toBe(200);
  })
});

describe('GET /artists', () => {
  afterAll(async () => {
    await new Promise(resolve => setTimeout(() => resolve(), 500));
  });

  it('It should return all matching artists for a given last name if found. If none match, it should return all artists.', async () => {
    const response = await request(app).get('/artists');
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.statusCode).toBe(200);
  })
});
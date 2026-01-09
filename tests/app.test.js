// app.test.js
import request from 'supertest'
import { createApp } from '../app.js'

describe("GET /", () => {
  it("should greet the world", async () => {
    const app = createApp();

    const res = await request(app)
      .get("/")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(res.body.message).toBe("Hello, World!");
  });
});

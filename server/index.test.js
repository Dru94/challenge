const request = require("supertest");
const app = require("./index");

describe("Testing endpoints", () => {
    // tests hairtsyles endpoint
  it("GET /hairstyles ===> array hairstyles", () => {
    return request(app)
      .get("/hairstyles")
      .expect(200)
      .expect((res) => {
        res.body.length > 1;
      })
      .expect((res) => {
        res.body.includes("long braids");
      });
  });

  // tests makeup endpoint
  it("GET /makeup ===> array makeup", () => {
    return request(app)
      .get("/makeup")
      .expect(200)
      .expect((res) => {
        res.body.length > 1;
      })
      .expect((res) => {
        res.body.includes("Shinny");
      });
  });

    // tests type and tag endpoint
  it("GET /:type/:tag ===> array of tags for type", () => {
    return request(app)
      .get("/hairstyles/braids")
      .expect(200)
      .expect((res) => {
        res.body.length > 0;
      })
      .expect((res) => {
        for (e in res.body) {
          res.body.includes("braids");
        }
      })
      .expect((res) => {
        if (res.body.includes("braids") === false) {
          res.body.push("braids");
        }
      });
  });
});

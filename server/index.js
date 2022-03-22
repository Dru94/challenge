const express = require("express");
const cors = require("cors");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const db = require("./data.json");

const app = express();

const swagger_options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Challenge One API",
      description: "Simple express js API",
    },
    servers: [{ url: "http://localhost:8080" }],
  },
  apis: ["index.js"],
};

const specs = swaggerJsDoc(swagger_options);

app.use(cors());

app.listen(8080, () => console.log("listening on port 8080"));

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

/**
 * @swagger
 * /hairstyles:
 *  get:
 *    description: Use to request all haristyles
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.get("/hairstyles", (req, res) => {
  let hair = db.hairstyles;
  res.send(hair);
});

/**
 * @swagger
 * /makeup:
 *  get:
 *    description: Use to request all makeup
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.get("/makeup", (req, res) => {
  let makeup = db.makeup;
  res.send(makeup);
});

/**
 * @swagger
 * /{type}/{tag}:
 *  get:
 *    description: Use to request all tags. If tag does not exist. Add to tags
 *    parameters:
 *       - in: path
 *         name: type
 *       - in: path
 *         name: tag
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.get("/:type/:tag", (req, res) => {
  let type = req.params.type;
  let tag = req.params.tag;

  result = [];

  // check if type exists in database
  if (type in db) {
    // check if tag exists in database
    if (db[type].includes(tag) === false) {
      // add tag to database
      db[type].push(tag);
      console.log("added to db");
    } else {
      // do something
      console.log("Tag does exist");
    }

    // iterate to find matching tags in database
    for (element in db[type]) {
      if (db[type][element].includes(tag)) {
        // do something
        result.push(db[type][element]);
      }
    }

    res.send(result);
  } else {
    // do something
    console.log("Type does not exist");
    res.send("Type does not exist.");
  }
});

module.exports = app;

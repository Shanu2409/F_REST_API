const crypto = require("crypto"); // this is used to generate radnom UUID
const requestBodyParser = require("../util/body-parser");
const saveIntoFIle = require("../util/writeToFIle");

module.exports = async (req, res) => {
  if (req.url === "/api/movies") {
    try {
      let body = await requestBodyParser(req);
      body.id = crypto.randomUUID();
      req.movies.push(body);
      saveIntoFIle(req.movies);
      res.writeHead(201, { "countent-Type": "application/json" });
      res.end();
    } catch (error) {
      console.log(error);
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          title: "Validation failed",
          message: "Request body is not valid",
        })
      );
    }
  }
};

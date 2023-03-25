const requestBodyParser = require("../util/body-parser");
const writeToFIle = require("../util/writeToFIle");
module.exports = async (req, res) => {
  let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
  console.log(baseUrl);
  let id = req.url.split("/")[3];
  //this is used to extract the id from the end [3] is the index of the id

  let redexv4 = new RegExp(
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  );

  if (!redexv4.test(id)) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        title: "validtaion failed ",
        message: "UUID IS NOR VALID",
      })
    );
  } else if (baseUrl === "/api/movies/" && redexv4.test(id)) {
    try {
      let body = await requestBodyParser(req);
      const index = req.movies.findIndex((movie) => {
        return movie.id === id;
      });

      if (index === -1) {
        res.statusCode = 404;
        res.end(
          JSON.stringify({
            title: "Not Found",
            message: "The movie your are trying to Delete in not avilable",
          })
        );
      } else {
        req.movies[index] = { id, ...body };
        writeToFIle(req.movies);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(req.movies[index]));
      }
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

const writeToFile = require("../util/writeToFIle");

module.exports = (req, res) => {
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
    const index = req.movies.findIndex((movie) => {
      return movie.id === id;
    });

    if (index === -1) {
      res.statusCode = 404;
      res.end(
        JSON.stringify({
          title: " movie Not Found",
          message: "The movie your are trying to Delete in not avilable",
        })
      );
    } else {
      req.movies.splice(index, 1);
      writeToFile(req.movie);
      res.writeHead(204, { "Content-Type": "application/json" });
      res.end(JSON.stringify(req.movies));
    }
  }
};

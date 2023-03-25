module.exports = (req, res) => {
  let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
  console.log(baseUrl);
  let id = req.url.split("/")[3];
  //this is used to extract the id from the end [3] is the index of the id

  let redexv4 = new RegExp(
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  );

  //regex to verify UUID

  if (req.url == "/api/movies") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(req.movies));
    res.end();
  } else if (!redexv4.test(id)) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        title: "validtaion failed ",
        message: "UUID IS NOR VALID",
      })
    );
  } else if (baseUrl === "/api/movies/" && redexv4.test(id)) {
    res.setHeader("Content-Type", "application/json");
    let filteredMovie = req.movies.filter((movie) => {
      return movie.id === id;
    });

    if (filteredMovie.length > 0) {
      res.statusCode = 200;
      res.write(JSON.stringify(filteredMovie));
      res.end();
    } else {
      res.statusCode = 404;
      res.end(
        JSON.stringify({
          title: " movie Not Found",
          message: "The movie your are trying to access in not avilable",
        })
      );
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        title: "Not Found",
        message: "The page your are trying to access in not avilable",
      })
    );
  }
};

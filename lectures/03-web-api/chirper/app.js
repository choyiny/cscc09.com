import express from "express";
import bodyParser from "body-parser";

export const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("static"));

app.use(function (req, res, next) {
  console.log("HTTP request", req.method, req.url, req.body);
  next();
});

const Chirp = (function () {
  let id = 0;
  return function item(chirp) {
    this.id = id++;
    this.content = chirp.content;
  };
})();

// in memory collection of chirps
const chirps = [];

app.post("/chirps", function (req, res, next) {
  const chirp = new Chirp(req.body);
  chirps.unshift(chirp);
  return res.json(chirp);
});

app.get("/chirps", function (req, res, next) {
  return res.json({
    chirps,
  });
});

app.patch("/chirps/:id", function (req, res, next) {
  const index = chirps.findIndex(function (chirp) {
    return chirp.id === +req.params.id;
  });
  if (index === -1) {
    return res
      .status(404)
      .json({ error: "chirp id:" + req.params.id + " does not exist" });
  }
  const chirp = chirps[index];
  chirp.content = req.body.content;
  return res.json(chirp);
});

app.delete("/chirps/:id", function (req, res, next) {
  const index = chirps.findIndex(function (chirp) {
    return chirp.id === +req.params.id;
  });
  if (index === -1) {
    return res
      .status(404)
      .json({ error: "chirp id:" + req.params.id + " does not exists" });
  }
  const chirp = chirps[index];
  chirps.splice(index, 1);
  return res.json(chirp);
});

const PORT = 3000;

app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log("HTTP server on http://localhost:%s", PORT);
});

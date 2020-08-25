// implement your API here
const express = require("express");
//bring express into project
const db = require("./data/db");
// server.use(express.json());
//create a server object
const server = express();

server.get("/", (req, res) => {
  res.send("hello party people");
});

const port = 8000;
server.listen(port, () => {
  console.log("\n=== server listening on port 8000 ===\n");
});

server.post("/api/users", (req, res) => {
  const userInfo = req.body;
  const { name, bio } = userInfo;

  if (!name || !bio) {
    res.status(400).json({
      errorMessage: "Please provide name and bio for the user."
    });
  }

  db.insert(userInfo)
    .then(hub => {
      console.log(hub);
      res.status(201).json({ succuss: true, userInfo });
    })
    .catch(error => {
      console.log("error", error);
      res.status(500).json({ error: "failed to post data" });
    });
});

server.get("/api/users", (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log("error", error);
      res.status(500).json({
        error: "The users information could not be retrieved."
      });
    });
});

server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then(users => {
      if (!users) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      } else {
        res.status(200).json(users);
      }
    })
    .catch(error => {
      console.log("error", error);
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." });
    });
});

server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  console.log("yeah");

  db.remove(id)
    .then(deletedHub => {
      if (deletedHub) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      } else {
        res.status(204).json({ message: `User was with ${id} was deleted` });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The user could not be removed" });
    });
});

server.put("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const Info = req.body;
  const { name, bio } = Info;

  if (!name || !bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  }

  db.update(id, Info)
    .then(data => {
      console.log(data);
      if (data === 0) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      } else {
        res.status(200).json(info);
      }
    })
    .catch(err => {
      console.log("error", err);
      res
        .status(500)
        .json({ error: "The user information could not be modified." });
    });
});

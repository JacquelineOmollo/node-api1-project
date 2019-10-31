// implement your API here
const express = require("express");
//bring express into project
const db = require("./data/db");

//create a server object
const server = express();

const port = 8000;
server.listen(port, () => {
  console.log("\n=== server listening on port 8000 ===\n");
});

server.post("/apt/users", (req, res) => {
  const hubInfo = req.body;
  // console.log('body:', hubInfo);

  db.add(hubInfo)
    .then(hub => {
      res.status(201).json({ success: true, hub });
    })
    .catch(err => {
      res.status(400).json({
        errorMessage: "Please provide name and bio for the user.",
        success: false,
        err
      });
    });
});

server.get("/api/users", (req, res) => {
  db.find()
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(err => {
      res.status(500).json({
        error: "The users information could not be retrieved.",
        success: false,
        err
      });
    });
});

server.get("/api/users/:id", (req, res) => {
  db.find()
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(err => {
      res.status(400).json({ success: false, err });
    });
});

server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  console.log("yeah");

  db.remove(id)
    .then(deletedHub => {
      if (deletedHub) {
        res.status(204).end();
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The user could not be removed", success: false, err });
    });
});

server.put("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const hubInfo = req.body;

  db.update(id, hubInfo)
    .then(hub => {
      if (hub) {
        res.status(200).json({ success: true, hub });
      } else {
        res.status(404).json({
          success: false,
          message: "The user with the specified ID does not exist."
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: "The user information could not be modified.",
        success: false,
        err
      });
    });
});

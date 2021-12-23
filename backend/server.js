const express = require("express");
const app = express();
const db = require("./db");
const Todo = require("./Todo");
app.use(express.json());

// console.log(Todo)

app.get("/", (req, res) => {
  res.json("GET / IS WORKING");
});

app.get("/tasks", (req, res) => {
  Todo.find({}, (err, data) => {
    if (err) {
      console.log("ERROR", err);
    } else {
      res.json(data);
    }
  });
});

app.post("/tasks", (req, res) => {
  Todo.create(req.body, (err, newTask) => {
    if (err) {
      console.log("ERROR", err);
    } else {
      res.status(201).json(newTask);
    }
  });
});

app.delete("/tasks/:title", (req, res) => {
  Todo.deleteOne({ title:req.params.title},(err, deletObj) => {
    if (err) {
      console.log("ERROR", err);
      res.status(500).json("Ther Is Proplem DB ");
    } else {
      if (deletObj.deletedCount === 0) {
        res.status(404).json("User Not Found ");
      } else {
        res.status(200).json("Success Delete" + req.params.title);
      }
    }
  });
});

app.put("/tasks/title/:oldtitle", (req, res) => {
  Todo.updateOne({title:req.params.oldtitle},{title:req.body.newtitle},(err, updateObj) => {
    if (err) {
      console.log("ERROR", err);
      res.status(500).json("Ther Is Proplem DB ");
    } else {
      if (updateObj.matchedCount === 0) {
        res.status(404).json("User Not Found ");
      } else {
        res.status(200).json("Success update");
      }
    }
  })
});

app.listen(5000, () => {
  console.log("SERVER IS WORKING");
});

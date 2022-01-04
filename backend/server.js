const express = require("express");
const cors = require("cors");
const app = express();

const db = require("./db");
const Todo = require("./todo");
const Username = require("./Username");

// console.log(Todo);

app.use(express.json());
app.use(cors());

// // use uuid and array if mongoDB didn't work for you
// const arrServer = [
//   {
//     _id: "61c420a96096f17c23ba1ab7",
//     title: "444444444",
//     isCompleted: false,
//     __v: 0,
//   },
//   {
//     _id: "61c420ac6096f17c23ba1abd",
//     title: "5555555555555",
//     isCompleted: true,
//     __v: 0,
//   },
// ];

app.get("/", (req, res) => {
  res.json("GET / is Working");
});

// CRUD: Create, Read, Update, Delete

app.get("/tasks", (req, res) => {
  // use this if mongoDB didn't work for you
  // res.json(arrServer);

  Todo.find({}, (err, data) => {
    if (err) {
      console.log("ERROR: ", err);
    } else {
      res.json(data);
    }
  });
});

//              ?key=value&key=value
app.get("/filter", (req, res) => {
  // console.log(req.query);
  Todo.find({ isCompleted: req.query.isCompleted }, (err, data) => {
    if (err) {
      console.log("ERR", err);
    } else {
      // console.log(data);
      res.json(data);
    }
  });
});

app.post("/tasks", (req, res) => {
  // console.log('25:',req.body);

  Todo.create(req.body, (err, newTask) => {
    if (err) {
      console.log("ERROR: ", err);
    } else {
      res.status(201).json(newTask);
    }
  });
});

app.delete("/tasks/:id", (req, res) => {
  // console.log("37:", req.params.id);

  Todo.deleteOne({ _id: req.params.id }, (err, deleteObj) => {
    if (err) {
      console.log("ERROR: ", err);
    } else {
      deleteObj.deletedCount === 1
        ? res.json("Delete one todo successfully")
        : res.status(404).json("This todo is not found");
    }
  });
});

app.delete("/tasks", (req, res) => {
  // console.log("37:", req.params.id);

  Todo.deleteMany({ isCompleted: true }, (err, deleteObj) => {
    if (err) {
      console.log("ERROR: ", err);
    } else {
      console.log(deleteObj);
      deleteObj.deletedCount === 0
        ? res.status(404).json("There is no completed todo found")
        : res.json("Delete all completed todos successfully");
    }
  });
});

app.put("/tasks/:id", (req, res) => {
  // console.log("37:", req.params.id);
  Todo.updateOne(
    { _id: req.params.id },
    { title: req.body.newTitle },
    (err, updateObj) => {
      if (err) {
        // console.log("ERROR: ", err);
        res.status(400).json(err);
      } else {
        console.log(updateObj);
        updateObj.modifiedCount === 1
          ? res.json("Update one todo successfully")
          : res.status(404).json("This todo is not found");
      }
    }
  );
});

app.put("/tasks/:id/:isCompleted", (req, res) => {
  console.log("124:", req.params);
  Todo.updateOne(
    { _id: req.params.id },
    { isCompleted: req.params.isCompleted },
    (err, updateObj) => {
      if (err) {
        // console.log("ERROR: ", err);
        res.status(400).json(err);
      } else {
        console.log(updateObj);
        updateObj.modifiedCount === 1
          ? res.json("Update one todo successfully")
          : res.status(404).json("This todo is not found");
      }
    }
  );
});

app.post("/username/register", (req, res) => {
  Username.create(req.body, (err, newUser) => {
    if (err) {
      console.log("ERROR: ", err);
      res.status(400).json({
        message: " the email already taken",
      });
    } else {
      res.status(201).json({
        message: "Create new User successfully ",
      });
    }
  });
});

app.post("/username/login", (req, res) => {
  Username.find({ email: req.body.email }, (err, Arryuserfound) => {
    // console.log(Arryuserfound);
    if (err) {
      console.log("ERROR: ", err);
    } else {
      if (Arryuserfound.length === 1) {
        if (req.body.password === Arryuserfound[0].password) {
          res.status(200).json({
            message: "  login successfully ",
            username: Arryuserfound[0].username,
          });
        } else {
          res.status(400).json({
            message: " Wrong password",
          });
        }
      } else {
        res.status(404).json({
          message: "The email entered is not Register",
        });
      }
    }
    
  });
});

app.listen(5000, () => {
  console.log("SERVER IS WORKING ..");
});

/*
the up endpoint is replace to these two
app.get("/completed", (req, res) => {
  Todo.find({ isCompleted: true }, (err, data) => {
    if (err) {
      console.log("ERR", err);
    } else {
      // console.log(data);
      res.json(data);
    }
  });
});
app.get("/not_completed", (req, res) => {
  Todo.find({ isCompleted: false }, (err, data) => {
    if (err) {
      console.log("ERR", err);
    } else {
      // console.log(data);
      res.json(data);
    }
  });
});
*/

const express = require("express");
const app = express();
const db = require("./db");
const Todo = require("./Todo");
app.use(express.json());

// console.log(Todo)

app.get("/", (req, res) => {
  res.json("GET / IS WORKING");
});

app.get("/taasks/:Boolean", (req, res) => {
  Todo.find({isCompleted: req.params.Boolean}, (err, data) => {
    if (err) {
      console.log("ERROR", err);
    } else {
      res.status(200).json(data);
    }
  });

// نفسها 
// app.get("/completed", (req, res) => {
//   Todo.find({isCompleted:true},(err,data)=>{
//   if(err){
//     console.log("ERROR",err)
//   }else{
//     res.status(200).json(data)
//   }
//   })
// });
// app.get("/completed", (req, res) => {
//   Todo.find({isCompleted:true},(err,data)=>{
//   if(err){
//     console.log("ERROR",err)
//   }else{
//     res.status(200).json(data)
//   }
//   })
// });
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
  Todo.deleteOne({ title: req.params.title }, (err, deletObj) => {
    if (err) {
      console.log("ERROR", err);
      res.status(500).json(err);
    } else {
      // if (deletObj.deletedCount === 0) {
      //   res.status(404).json("User Not Found ");
      // } else {
      //   res.status(200).json("Success Delete" + req.params.title);
      // }

      deletObj.deletedCount === 0
        ? res.status(404).json("User Not Found ")
        : res.status(200).json("Success Delete" + req.params.title);
    }
  });
});

app.delete("/taskss/:id", (req, res) => {
  Todo.deleteOne({ _id: req.params.id }, (err, deleteObj) => {
    if (err) {
      console.log("ERROR", err);
      res.status(500).json(err);
    } else {
      // if (deletObj.deletedCount === 0) {
      //   res.status(404).json("User Not Found ");
      // } else {
      //   res.status(200).json("Success Delete" + req.params.title);
      // }
      deleteObj.deletedCount === 0
        ? res.status(404).json("User Not Found ")
        : res.status(200).json("Success Delete  " + req.params.id);
    }
  });
});

app.put("/tasks/title/:oldtitle", (req, res) => {
  //  Todo.findOneAndUpdateOne
  Todo.updateOne(
    { title: req.params.oldtitle },
    { title: req.body.newtitle },
    (err, updateObj) => {
      if (err) {
        console.log("ERROR", err);
        res.status(500).json("err");
      } else {
        // if (updateObj.matchedCount === 0) {
        //   res.status(404).json("User Not Found ");
        // } else {
        //   res.status(200).json("Success update");
        // }
        //      عدد الي تغيرو الي تحت
        updateObj.modifiedCount === 0
          ? res.status(404).json("User Not Found ")
          : res.status(200).json("Success update  " + req.body.newtitle);
      }
    }
  );
});

app.put("/taskss/:id", (req, res) => {
  Todo.updateOne(
    { _id: req.params.id },
    { title: req.body.neewtitle },
    (err, updaateObj) => {
      if (err) {
        console.log("ERROR", err);
        res.status(500).json(err);
      } else {
        updaateObj.modifiedCount === 0
          ? res.status(404).json("User Not Found ")
          : res.status(200).json("Success update  " + req.body.neewtitle);
      }
    }
  );
});

app.listen(5000, () => {
  console.log("SERVER IS WORKING");
});
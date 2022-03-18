const express = require("express");
const router = express.Router();
const db = require("../../db.js");

router.post("/create", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const ssn = req.body.ssn;
  const type = req.body.type;

  db.query(
    "INSERT INTO member(name, age, ssn, licence_type) VALUES (?, ?, ?, ?)",
    [name, age, ssn, type],
    (error, results) => {
      if (error) {
        throw error;
      } else {
        res.send("Data inserted");
      }
    }
  );
});

router.get("/", (req, res) => {
  db.query("SELECT * FROM member", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

router.put("/update", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  db.query(
    "UPDATE member SET name = ? WHERE id = ?",
    [name, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM member WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

module.exports = router;

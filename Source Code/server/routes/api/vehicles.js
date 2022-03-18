const express = require("express");
const router = express.Router();
const db = require("../../db.js");

router.post("/create", (req, res) => {
  const price = req.body.price;
  const model = req.body.model;
  const plate = req.body.licence_plate;
  const member_id = req.body.member_id;
  const type_id = req.body.type;
  console.log(req.body.type);

  db.query(
    `INSERT INTO vehicle(price, model, licence_plate, member_id, type_id)
    VALUES (?, ?, ?, ?, ?)`,
    [price, model, plate, member_id, type_id],
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
  db.query("SELECT * FROM vehicle", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

router.put("/update", (req, res) => {
  const id = req.body.id;
  const plate = req.body.plate;
  db.query(
    "UPDATE vehicle SET licence_plate = ? WHERE id = ?",
    [plate, id],
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
  db.query("DELETE FROM vehicle WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

module.exports = router;

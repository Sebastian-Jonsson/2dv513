const express = require("express");
const router = express.Router();
const db = require("../../db.js");

router.get("/owners", (req, res) => {
  db.query(
    `SELECT vehicle.id, vehicle.price, vehicle.model, 
    vehicle.licence_plate AS licence_plate, member.name AS owner, 
    vehicle_type.type 
    FROM vehicleSharing.vehicle 
    JOIN member ON vehicle.member_id = member.id 
    JOIN vehicle_type ON vehicle.type_id = vehicle_type.id`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

router.get("/owners/orderby", (req, res) => {
  db.query(
    `SELECT vehicle.id, vehicle.price, vehicle.model, 
    vehicle.licence_plate AS licence_plate, member.name AS owner, 
    vehicle_type.type 
    FROM vehicleSharing.vehicle
    JOIN member ON vehicle.member_id = member.id 
    JOIN vehicle_type ON vehicle.type_id = vehicle_type.id
    ORDER BY vehicle_type.type ASC`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

router.get("/memberlist", (req, res) => {
  db.query(
    `SELECT member.id, name, age, ssn, licence.type AS licence 
    FROM member 
    JOIN licence ON member.licence_type = licence.id`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

router.get("/memberlist/group", (req, res) => {
  db.query(
    `SELECT COUNT(member.id), licence.type AS licence
    FROM member
    JOIN licence ON member.licence_type = licence.id
    GROUP BY licence.type`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

/* 
CREATE VIEW cars AS
SELECT v.model, v.licence_plate, vt.type, v.type_id
FROM vehicle AS v INNER JOIN vehicle_type AS vt
WHERE v.type_id = 1 AND vt.type = "Car"
*/

router.get("/memberlist/cars", (req, res) => {
  db.query(`SELECT * FROM cars`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

module.exports = router;

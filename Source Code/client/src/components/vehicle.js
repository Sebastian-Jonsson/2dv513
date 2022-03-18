import logo from "../logo.svg";
import "../App.css";
import { useState } from "react";
import Axios from "axios";

function Vehicle() {
  const [price, setPrice] = useState(0);
  const [model, setModel] = useState("");
  const [licencePlate, setLicencePlate] = useState("");
  const [memberId, setMemberId] = useState(0);
  const [type, setType] = useState("1");
  const [visibleDiv, setVisibleDiv] = useState(true);

  const [vehicleList, setVehicleList] = useState([]);

  const [newPlate, setNewPlate] = useState("");

  const options = [
    {
      label: "Car",
      value: "1",
    },
    {
      label: "Truck",
      value: "2",
    },
    {
      label: "Large Truck",
      value: "3",
    },
    {
      label: "Motorcycle",
      value: "4",
    },
    {
      label: "Medium Motorcycle",
      value: "5",
    },
  ];
  console.log(type);

  const addVehicle = () => {
    Axios.post("http://localhost:3001/api/vehicles/create", {
      price: price,
      model: model,
      licence_plate: licencePlate,
      member_id: memberId,
      type: type,
    }).then(() => {
      setVehicleList([
        ...vehicleList,
        {
          price: price,
          model: model,
          licence_plate: licencePlate,
          member_id: memberId,
          type: type,
        },
      ]);
    });
  };

  const getVehicles = () => {
    if (visibleDiv) {
      Axios.get("http://localhost:3001/api/vehicles").then((response) => {
        setVehicleList(response.data);
      });
    }
  };

  const updateVehicle = (id) => {
    Axios.put("http://localhost:3001/api/vehicles/update", {
      plate: newPlate,
      id: id,
    }).then((response) => {
      setVehicleList(
        vehicleList.map((val) => {
          return val.id == id
            ? {
                id: val.id,
                date: val.date,
                price: val.price,
                model: val.model,
                licence_plate: newPlate,
                type_id: val.type_id,
                member_id: val.member_id,
              }
            : val;
        })
      );
    });
  };

  console.log(vehicleList);

  const deleteVehicle = (id) => {
    Axios.delete(`http://localhost:3001/api/vehicles/delete/${id}`).then(
      (response) => {
        setVehicleList(
          vehicleList.filter((val) => {
            return val.id != id;
          })
        );
      }
    );
  };

  const removeOnClose = () => {
    if (!visibleDiv) {
      setVehicleList([]);
    }
  };

  return (
    <div className="App">
      <div className="information">
        <div className="form">
          <label>Price:</label>
          <input
            type="number"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
          <label>Model:</label>
          <input
            type="text"
            placeholder="E.g. Audi A5 - 2020"
            onChange={(e) => {
              setModel(e.target.value);
            }}
          />
          <label>Licence Plate:</label>
          <input
            type="text"
            placeholder="E.g. AEH250"
            onChange={(e) => {
              setLicencePlate(e.target.value);
            }}
          />
          <label>Member ID:</label>
          <input
            type="text"
            placeholder="E.g. 1"
            onChange={(e) => {
              setMemberId(e.target.value);
            }}
          />
          <select
            onChange={(e) => {
              setType(e.target.value);
            }}
          >
            {options.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </select>
          <button onClick={addVehicle}>Add Vehicle</button>
        </div>
      </div>
      <div className="members">
        <button
          onClick={() => {
            getVehicles();
            setVisibleDiv(!visibleDiv);
            removeOnClose();
          }}
        >
          Show Vehicles
        </button>

        {vehicleList.map((value, key) => {
          return (
            <div className="member">
              <div>
                <h3>Created at: {value.date}</h3>
                <h3>Price: {value.price}</h3>
                <h3>Model: {value.model}</h3>
                <h3>Licence plate: {value.licence_plate}</h3>
                <h3>Vehicle Type: {value.type_id}</h3>
                <h3>Member: {value.member_id}</h3>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="New Licence plate.."
                  onChange={(e) => {
                    setNewPlate(e.target.value);
                  }}
                  required
                />
                <button
                  onClick={() => {
                    updateVehicle(value.id);
                  }}
                >
                  Update
                </button>
                <button
                  onClick={() => {
                    deleteVehicle(value.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Vehicle;

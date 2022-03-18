import logo from "../logo.svg";
import "../App.css";
import { useState } from "react";
import Axios from "axios";

function Member() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [ssn, setSsn] = useState(0);
  const [type, setType] = useState("1");
  const [visibleDiv, setVisibleDiv] = useState(true);

  const [memberList, setMemberList] = useState([]);

  const [newName, setNewName] = useState("");

  const options = [
    {
      label: "C",
      value: "1",
    },
    {
      label: "B",
      value: "2",
    },
    {
      label: "C1",
      value: "3",
    },
    {
      label: "A",
      value: "4",
    },
    {
      label: "A2",
      value: "5",
    },
  ];

  const addMember = () => {
    Axios.post("http://localhost:3001/api/members/create", {
      name: name,
      age: age,
      ssn: ssn,
      type: type,
    }).then(() => {
      setMemberList([
        ...memberList,
        {
          name: name,
          age: age,
          ssn: ssn,
          type: type,
        },
      ]);
    });
  };

  console.log(type);
  const getMembers = () => {
    if (visibleDiv) {
      Axios.get("http://localhost:3001/api/members").then((response) => {
        setMemberList(response.data);
      });
    }
  };

  const updateMember = (id) => {
    Axios.put("http://localhost:3001/api/members/update", {
      name: newName,
      id: id,
    }).then((response) => {
      setMemberList(
        memberList.map((val) => {
          return val.id == id
            ? {
                id: val.id,
                name: newName,
                age: val.age,
                ssn: val.ssn,
                licence_type: val.licence_type,
              }
            : val;
        })
      );
    });
  };

  const deleteMember = (id) => {
    Axios.delete(`http://localhost:3001/api/members/delete/${id}`).then(
      (response) => {
        setMemberList(
          memberList.filter((val) => {
            return val.id != id;
          })
        );
      }
    );
  };

  const removeOnClose = () => {
    if (!visibleDiv) {
      setMemberList([]);
    }
  };

  return (
    <div className="App">
      <div className="information">
        <div className="form">
          <label>Name:</label>
          <input
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <label>Age:</label>
          <input
            type="number"
            onChange={(e) => {
              setAge(e.target.value);
            }}
          />
          <label>SSN:</label>
          <input
            type="number"
            placeholder="YYMMDD"
            onChange={(e) => {
              setSsn(e.target.value);
            }}
          />
          <label>Licence:</label>
          <select
            onChange={(e) => {
              setType(e.target.value);
            }}
          >
            {options.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </select>
          <button onClick={addMember}>Add Member</button>
        </div>
      </div>
      <div className="members">
        <button
          onClick={() => {
            getMembers();
            setVisibleDiv(!visibleDiv);
            removeOnClose();
          }}
        >
          Show Members
        </button>

        {memberList.map((value, key) => {
          return (
            <div className="member">
              <div>
                <h3>Name: {value.name}</h3>
                <h3>Age: {value.age}</h3>
                <h3>SSN: {value.ssn}</h3>
                <h3>Licence type: {value.licence_type}</h3>
                <h3>ID: {value.id}</h3>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="name..."
                  onChange={(e) => {
                    setNewName(e.target.value);
                  }}
                  required
                />
                <button
                  onClick={() => {
                    updateMember(value.id);
                  }}
                >
                  Update
                </button>
                <button
                  onClick={() => {
                    deleteMember(value.id);
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

export default Member;

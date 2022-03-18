import logo from "../logo.svg";
import "../App.css";
import { useState } from "react";
import Axios from "axios";

function Lists() {
  const [combinedList, setCombinedList] = useState([]);
  const [memberList, setMemberList] = useState([]);
  const [groupMemberList, setGroupMemberList] = useState([]);
  const [carsList, setCarsList] = useState([]);
  const [visibleDiv, setVisibleDiv] = useState(true);

  const getLists = () => {
    if (visibleDiv) {
      Axios.get("http://localhost:3001/api/combined/owners").then(
        (response) => {
          console.log(response);
          setCombinedList(response.data);
        }
      );
    }
  };

  const getGrouped = () => {
    Axios.get("http://localhost:3001/api/combined/owners/orderby").then(
      (response) => {
        console.log(response);
        setCombinedList(response.data);
      }
    );
  };

  const getCars = () => {
    if (visibleDiv) {
      Axios.get("http://localhost:3001/api/combined/memberlist/cars").then(
        (response) => {
          console.log(response);
          setCarsList(response.data);
        }
      );
    }
  };

  const getMemberLists = () => {
    if (visibleDiv) {
      Axios.get("http://localhost:3001/api/combined/memberlist").then(
        (response) => {
          console.log(response);
          setMemberList(response.data);
        }
      );
    }
  };
  // console.log(visibleDiv);

  const getMembersGrouped = () => {
    if (visibleDiv) {
      Axios.get("http://localhost:3001/api/combined/memberlist/group").then(
        (response) => {
          console.log(response);
          setGroupMemberList(response.data);
        }
      );
    }
  };

  console.log(visibleDiv);
  const removeOnClose = () => {
    if (!visibleDiv) {
      setCarsList([]);
      setCombinedList([]);
      setMemberList([]);
      setGroupMemberList([]);
    }
  };

  return (
    <div className="App">
      <div className="containerList">
        <div className="members">
          <button
            onClick={() => {
              getLists();
              setVisibleDiv(!visibleDiv);
              removeOnClose();
            }}
          >
            Show Vehicle owner
          </button>
          <button onClick={getGrouped}>Group By Type</button>
          {combinedList.map((value, key) => {
            return (
              <div className="member">
                <div>
                  <h3>Name: {value.owner}</h3>
                  <h3>Vehicle Type: {value.type}</h3>
                  <h3>Model: {value.model}</h3>
                  <h3>Licence Plate: {value.licence_plate}</h3>
                  <h3>Price to rent: {value.price} SEK/day</h3>
                </div>
              </div>
            );
          })}
        </div>
        <div className="members">
          <button
            onClick={() => {
              getMemberLists();
              setVisibleDiv(!visibleDiv);
              removeOnClose();
            }}
          >
            Show Members info
          </button>
          {memberList.map((value, key) => {
            return (
              <div className="member">
                <div>
                  <h3>Name: {value.name}</h3>
                  <h3>Age: {value.age}</h3>
                  <h3>SSN: {value.ssn}</h3>
                  <h3>Licence: {value.licence}</h3>
                </div>
              </div>
            );
          })}
        </div>
        <div className="members">
          <button
            onClick={() => {
              setVisibleDiv(!visibleDiv);
              getMembersGrouped();
              removeOnClose();
            }}
          >
            Group Members/Type
          </button>
          {groupMemberList.map((value, key) => {
            return (
              <div className="member">
                <div>
                  <h3>Number of owners: {value["COUNT(member.id)"]}</h3>
                  <h3>Of licence type: {value.licence}</h3>
                </div>
              </div>
            );
          })}
        </div>
        <div className="members">
          <button
            onClick={() => {
              setVisibleDiv(!visibleDiv);
              getCars();
              removeOnClose();
            }}
          >
            Cars
          </button>
          {carsList.map((value, key) => {
            return (
              <div className="member">
                <div>
                  <h3>Licence Plate: {value.licence_plate}</h3>
                  <h3>Model: {value.model}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Lists;

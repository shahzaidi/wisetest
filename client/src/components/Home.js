import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const [eeditClient, setEeditClient] = useState(false);
  const [clients, setClients] = useState(null);
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [project, setProject] = useState("");

  const clearData = () => {
    setName("");
    setEmail("");
    setLastName("");
    setPhone("");
    setProject("");
    setEeditClient(false);
    setId("");
  };
  const getAllClients = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/getclients");
      setClients(res?.data?.clients);
      setLoading(false);
    } catch (error) {
      window.alert(error?.response?.data?.message);
    }
  };

  const createClient = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/v1/create", {
        name,
        lastname,
        email,
        phone,
        project,
      });
      if (res?.data?.success === true) {
        window.alert("Client Added Successfully");
      }

      clearData();
      getAllClients();

      console.log(res, "create");
    } catch (error) {
      //   console.log(error?.response?.data?.message, "error");
      window.alert(error?.response?.data?.message);
    }
  };

  const getClient = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/getclient/${id}`
      );

      console.log(res?.data?.client, "getC");
      setName(res?.data?.client?.name);
      setLastName(res?.data?.client?.lastname);
      setEmail(res?.data?.client?.email);
      setPhone(res?.data?.client?.phone);
      setProject(res?.data?.client?.project);
      setId(res?.data?.client?._id);
      setEeditClient(true);
    } catch (error) {
      window.alert(error?.response?.data?.message);
    }
  };

  const editClient = async (e, id) => {
    e.preventDefault();
    try {
      const res = axios.put(
        `http://localhost:8000/api/v1/client/update/${id}`,
        {
          name,
          lastname,
          email,
          phone,
          project,
        }
      );
      console.log(res, "editSucc");

      window.alert("Client Updated Successfully");

      clearData();
      getAllClients();
    } catch (error) {
      window.alert(error?.response?.data?.message);
    }
  };

  const deleteClient = async (id) => {
    let confirm = window.confirm(
      `Are You Sure wnat di delete Client with this id ${id}}`
    );
    if (confirm === true) {
      try {
        const res = await axios.delete(
          `http://localhost:8000/api/v1/client/delete/${id}`
        );
        if (res?.data?.success === true) {
          window.alert("Client Deleted Successfull");
          setId("");
          getAllClients();
        }
      } catch (error) {
        window.alert(error?.response?.data?.message);
      }
    } else {
      return;
    }
  };

  useEffect(() => {
    getAllClients();
  }, [name, lastname, email, phone, project]);
  console.log(name, "name");
  return (
    <>
      <Navbar />
      <div
        className=" row mb-3 "
        style={{ marginTop: "50px", marginLeft: "50px", marginRight: "50px" }}
      >
        <div className="col-8">
          <h1>Clients</h1>
          {clients?.length < 1 ? (
            <h6>No. data Available in the Data Base To show.</h6>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Mobile Number</th>
                  <th scope="col">Project</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              {loading === true ? (
                <>
                  <div className="spinner-border text-dark" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </>
              ) : (
                <tbody>
                  {clients?.map((client) => (
                    <tr>
                      <td>{client?.name}</td>
                      <td>{client?.lastname}</td>
                      <td>{client?.email}</td>
                      <td>{client?.phone}</td>
                      <td>{client?.project}</td>
                      <td>
                        <Link
                          onClick={(e) => {
                            getClient(client?._id);
                          }}
                        >
                          Edit
                        </Link>{" "}
                        |{" "}
                        <Link
                          onClick={() => {
                            deleteClient(client?._id);
                          }}
                        >
                          {" "}
                          Delete
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          )}
        </div>
        <div
          className="col-4"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <h1>Create Client</h1>
          <from>
            <label for="formGroupExampleInput" className="form-label">
              Name
            </label>
            <input
              value={name}
              type="text"
              name="name"
              className="form-control"
              id="formGroupExampleInput"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />

            <label for="formGroupExampleInput2" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              value={lastname}
              className="form-control"
              id="formGroupExampleInput2"
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
            />

            <label for="formGroupExampleInput2" className="form-label">
              Email
            </label>
            <input
              type="text"
              value={email}
              className="form-control"
              id="formGroupExampleInput2"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <label for="formGroupExampleInput2" className="form-label">
              Mobile No.
            </label>
            <input
              type="text"
              value={phone}
              className="form-control"
              id="formGroupExampleInput2"
              placeholder="Mobile No."
              onChange={(e) => setPhone(e.target.value)}
            />

            <label for="formGroupExampleInput2" className="form-label">
              Project
            </label>
            <input
              type="text"
              value={project}
              className="form-control"
              id="formGroupExampleInput2"
              placeholder="Project"
              onChange={(e) => setProject(e.target.value)}
            />
            {eeditClient === true ? (
              <div>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ marginTop: "20px" }}
                  onClick={(e) => {
                    editClient(e, id);
                  }}
                >
                  Edit Client
                </button>

                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ marginTop: "20px", marginLeft: "20px" }}
                  onClick={() => {
                    clearData();
                  }}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="btn btn-primary"
                style={{ marginTop: "20px" }}
                onClick={createClient}
              >
                Create Client
              </button>
            )}
          </from>
        </div>
      </div>
    </>
  );
};

export default Home;

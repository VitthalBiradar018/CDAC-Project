import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { Button, Modal } from "react-bootstrap";

const ViewServiceCenterAppointments = () => {
  const service_jwtToken = sessionStorage.getItem("service-jwtToken");
  const serviceCenter = JSON.parse(sessionStorage.getItem("active-service"));

  const [showModalViewResponse, setShowModalViewResponse] = useState(false);

  const handleCloseViewResponse = () => setShowModalViewResponse(false);
  const handleShowViewResponse = () => setShowModalViewResponse(true);

  const [showModalAddResponse, setShowModalAddResponse] = useState(false);

  const handleCloseAddResponse = () => setShowModalAddResponse(false);
  const handleShowAddResponse = () => setShowModalAddResponse(true);

  const [showModalUpdateStatus, setShowModalUpdateStatus] = useState(false);

  const handleCloseUpdateStatus = () => setShowModalUpdateStatus(false);
  const handleShowUpdateStatus = () => setShowModalUpdateStatus(true);

  const [jobCards, setJobCards] = useState([]);

  const [appointmentId, setAppointmentId] = useState("");
  const [status, setStatus] = useState("");

  const [jobCard, setJobCard] = useState({
    serviceAppointmentId: 0,
    name: "",
    description: "",
    amount: "",
  });

  const handleInput = (e) => {
    setJobCard({ ...jobCard, [e.target.name]: e.target.value });
  };

  const viewJobCard = (jobCards) => {
    setJobCards(jobCards);
    handleShowViewResponse();
  };

  const showAddJobCard = (appointmentId) => {
    setAppointmentId(appointmentId);
    handleShowAddResponse();
  };

  const showUpdateStatus = (appointmentId) => {
    setAppointmentId(appointmentId);
    handleShowUpdateStatus();
  };

  const [appointments, setAppointments] = useState([
    {
      service: {
        name: "",
        image1: "",
        category: {
          name: "",
        },
      },
      customer: {
        firstName: "",
        lastName: "",
        phoneNo: "",
      },
    },
  ]);

  useEffect(() => {
    const getAllServiceAppointments = async () => {
      const allServiceAppointments = await retrieveAllServiceAppointments();
      if (allServiceAppointments) {
        setAppointments(allServiceAppointments.appointments);
      }
    };

    getAllServiceAppointments();
  }, []);

  const retrieveAllServiceAppointments = async () => {
    const response = await axios.get(
      "http://13.60.229.97:8080/api/service/appointment/fetch/service-center-wise?serviceCenterId=" +
        serviceCenter.id
    );
    return response.data;
  };

  const formatDateFromEpoch = (epochTime) => {
    const date = new Date(Number(epochTime));
    const formattedDate = date.toLocaleString(); // Adjust the format as needed

    return formattedDate;
  };

  const cancelAppointment = (appointmentId) => {
    fetch(
      "http://13.60.229.97:8080/api/service/appointment/close?appointmentId=" +
        appointmentId,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          //   Authorization: "Bearer " + expert_jwtToken,
        },
      }
    )
      .then((result) => {
        result.json().then((res) => {
          if (res.success) {
            toast.success(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

            setTimeout(() => {
              window.location.reload(true);
            }, 1000); // Redirect after 3 seconds
          } else if (!res.success) {
            toast.error(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            // setTimeout(() => {
            //   window.location.reload(true);
            // }, 1000); // Redirect after 3 seconds
          }
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("It seems server is down", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // setTimeout(() => {
        //   window.location.reload(true);
        // }, 1000); // Redirect after 3 seconds
      });
  };

  const addAppointmentJob = (e) => {
    e.preventDefault();

    jobCard.serviceAppointmentId = appointmentId;

    fetch("http://13.60.229.97:8080/api/service/appointment/job/card/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        //   Authorization: "Bearer " + expert_jwtToken,
      },
      body: JSON.stringify(jobCard),
    })
      .then((result) => {
        result.json().then((res) => {
          if (res.success) {
            toast.success(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

            setTimeout(() => {
              window.location.reload(true);
            }, 1000); // Redirect after 3 seconds
          } else if (!res.success) {
            toast.error(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            // setTimeout(() => {
            //   window.location.reload(true);
            // }, 1000); // Redirect after 3 seconds
          }
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("It seems server is down", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // setTimeout(() => {
        //   window.location.reload(true);
        // }, 1000); // Redirect after 3 seconds
      });
  };

  const updateAppointmentServicingStatus = (e) => {
    e.preventDefault();

    fetch(
      "http://13.60.229.97:8080/api/service/appointment/service/status/update?appointmentId=" +
        appointmentId +
        "&status=" +
        status,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          //   Authorization: "Bearer " + expert_jwtToken,
        },
      }
    )
      .then((result) => {
        result.json().then((res) => {
          if (res.success) {
            toast.success(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

            setTimeout(() => {
              window.location.reload(true);
            }, 1000); // Redirect after 3 seconds
          } else if (!res.success) {
            toast.error(res.responseMessage, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            // setTimeout(() => {
            //   window.location.reload(true);
            // }, 1000); // Redirect after 3 seconds
          }
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("It seems server is down", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // setTimeout(() => {
        //   window.location.reload(true);
        // }, 1000); // Redirect after 3 seconds
      });
  };

  return (
    <div className="mt-3">
      <div
        className="card form-card ms-2 me-2 mb-5 shadow-lg"
        style={{
          height: "45rem",
        }}
      >
        <div
          className="card-header custom-bg-text text-center bg-color"
          style={{
            borderRadius: "1em",
            height: "50px",
          }}
        >
          <h2>Service Centers Appointments</h2>
        </div>
        <div
          className="card-body"
          style={{
            overflowY: "auto",
          }}
        >
          <div className="table-responsive">
            <table className="table table-hover text-color text-center">
              <thead className="table-bordered border-color bg-color custom-bg-text">
                <tr>
                  <th scope="col">Service</th>
                  <th scope="col">Service Name</th>
                  <th scope="col">Category</th>
                  <th scope="col">Customer Name</th>
                  <th scope="col">Customer Contact</th>
                  <th scope="col">Vehicle Name</th>
                  <th scope="col">Vehicle Reg No.</th>
                  <th scope="col">Issue Description</th>
                  <th scope="col">Appointment Time</th>
                  <th scope="col">Status</th>
                  <th scope="col">Servicing Status</th>
                  <th scope="col">Servicing Amount (&#8377;)</th>
                  <th scope="col">Job Card</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => {
                  return (
                    <tr>
                      <td>
                        <img
                          src={
                            "http://13.60.229.97:8080/api/service/" +
                            appointment.service.image1
                          }
                          class="img-fluid"
                          alt="service_pic"
                          style={{
                            maxWidth: "90px",
                          }}
                        />
                      </td>
                      <td>
                        <b>{appointment.service.name}</b>
                      </td>

                      <td>
                        <b>{appointment.service.category.name}</b>
                      </td>

                      <td>
                        <b>
                          {appointment.customer.firstName +
                            " " +
                            appointment.customer.lastName}
                        </b>
                      </td>
                      <td>
                        <b>{appointment.customer.phoneNo}</b>
                      </td>
                      <td>
                        <b>{appointment.vehicleName}</b>
                      </td>
                      <td>
                        <b>{appointment.vehicleRegistration}</b>
                      </td>
                      <td>
                        <b>{appointment.issue_description}</b>
                      </td>
                      <td>
                        <b>
                          {appointment.appointmentDate +
                            " " +
                            appointment.appointmentTime}
                        </b>
                      </td>
                      <td>
                        <b>{appointment.status}</b>
                      </td>
                      <td>
                        <b>{appointment.servicingStatus}</b>
                      </td>
                      <td>
                        <b>{appointment.serviceAmount}</b>
                      </td>
                      <td>
                        <button
                          onClick={() => viewJobCard(appointment.jobCards)}
                          className="btn btn-sm bg-color custom-bg-text ms-2 mt-2"
                        >
                          View
                        </button>
                      </td>
                      <td>
                        {(() => {
                          if (
                            appointment.status === "Booked" &&
                            appointment.serviceAmount === 0.0
                          ) {
                            return (
                              <button
                                onClick={() =>
                                  cancelAppointment(appointment.id)
                                }
                                className="btn btn-sm bg-color custom-bg-text ms-2 mt-2"
                              >
                                Close
                              </button>
                            );
                          }
                        })()}

                        {(() => {
                          if (appointment.status === "Booked") {
                            return (
                              <button
                                onClick={() => showAddJobCard(appointment.id)}
                                className="btn btn-sm bg-color custom-bg-text ms-2 mt-2"
                              >
                                Add Job
                              </button>
                            );
                          }
                        })()}

                        {(() => {
                          if (
                            appointment.status === "Booked" &&
                            appointment.serviceAmount > 0.0
                          ) {
                            return (
                              <button
                                onClick={() => showUpdateStatus(appointment.id)}
                                className="btn btn-sm bg-color custom-bg-text ms-2 mt-2"
                              >
                                Update Status
                              </button>
                            );
                          }
                        })()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal
        show={showModalViewResponse}
        onHide={handleCloseViewResponse}
        size="xl"
      >
        <Modal.Header closeButton className="bg-color custom-bg-text">
          <Modal.Title
            style={{
              borderRadius: "1em",
            }}
          >
            View Service Job Card
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="ms-3 mt-3 mb-3 me-3">
            <div className="table-responsive">
              <table className="table table-hover text-color text-center">
                <thead className="table-bordered border-color bg-color custom-bg-text">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Price (&#8377;)</th>
                  </tr>
                </thead>
                <tbody>
                  {jobCards.map((card) => {
                    return (
                      <tr>
                        <td>
                          <b>{card.name}</b>
                        </td>

                        <td>
                          <b>{card.description}</b>
                        </td>
                        <td>
                          <b>{card.amount}</b>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseViewResponse}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModalAddResponse} onHide={handleCloseAddResponse}>
        <Modal.Header closeButton className="bg-color custom-bg-text">
          <Modal.Title
            style={{
              borderRadius: "1em",
            }}
          >
            Add Service Job Card
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="ms-3 mt-3 mb-3 me-3">
            <form>
              <div class="mb-3">
                <label for="title" class="form-label">
                  <b>Job Name</b>
                </label>
                <input
                  type="text"
                  class="form-control"
                  name="name"
                  onChange={handleInput}
                  value={jobCard.name}
                  required
                />
              </div>
              <div class="mb-3">
                <label for="title" class="form-label">
                  <b>Job Description</b>
                </label>
                <textarea
                  type="text"
                  class="form-control"
                  name="description"
                  onChange={handleInput}
                  value={jobCard.description}
                  required
                />
              </div>
              <div class="mb-3">
                <label for="title" class="form-label">
                  <b>Amount (Inc. Labour Charge)</b>
                </label>
                <input
                  type="number"
                  class="form-control"
                  name="amount"
                  onChange={handleInput}
                  value={jobCard.amount}
                  required
                />
              </div>

              <div className="d-flex aligns-items-center justify-content-center mb-2">
                <button
                  type="submit"
                  onClick={addAppointmentJob}
                  class="btn bg-color custom-bg-text"
                >
                  Add Job
                </button>
                <ToastContainer />
              </div>

              <ToastContainer />
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddResponse}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModalUpdateStatus} onHide={handleCloseUpdateStatus}>
        <Modal.Header closeButton className="bg-color custom-bg-text">
          <Modal.Title
            style={{
              borderRadius: "1em",
            }}
          >
            Update Servicing Status
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="ms-3 mt-3 mb-3 me-3">
            <form>
              <div class="mb-3">
                <label for="title" class="form-label">
                  <b>Servicing Status</b>
                </label>
                <select
                  name="status"
                  onChange={(e) => setStatus(e.target.value)}
                  className="form-control"
                  required
                >
                  <option value="">Select Status</option>
                  <option value="Working">Working</option>
                  <option value="Done">Done</option>
                </select>
              </div>

              <div className="d-flex aligns-items-center justify-content-center mb-2">
                <button
                  type="submit"
                  onClick={updateAppointmentServicingStatus}
                  class="btn bg-color custom-bg-text"
                >
                  Update Status
                </button>
                <ToastContainer />
              </div>

              <ToastContainer />
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdateStatus}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ViewServiceCenterAppointments;

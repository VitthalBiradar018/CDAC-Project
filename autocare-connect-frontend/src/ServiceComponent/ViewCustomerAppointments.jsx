import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { Button, Modal } from "react-bootstrap";

const ViewCustomerAppointments = () => {
  const customer_jwtToken = sessionStorage.getItem("customer-jwtToken");
  const customer = JSON.parse(sessionStorage.getItem("active-customer"));

  const [showModalViewResponse, setShowModalViewResponse] = useState(false);

  const handleCloseViewResponse = () => setShowModalViewResponse(false);
  const handleShowViewResponse = () => setShowModalViewResponse(true);

  const [jobCards, setJobCards] = useState([]);

  const viewJobCard = (jobCards) => {
    setJobCards(jobCards);
    handleShowViewResponse();
  };

  const [appointments, setAppointments] = useState([
    {
      service: {
        name: "",
        image1: "",
        category: {
          name: "",
        },
        serviceCenter: {
          shopName: "",
          firstName: "",
          lastName: "",
          phoneNo: "",
        },
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
      "http://13.60.229.97:8080/api/service/appointment/fetch/customer-wise?customerId=" +
        customer.id
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

  const payAndConfirmServicing = (appointmentId, e) => {
    e.preventDefault();

    fetch(
      "http://13.60.229.97:8080/api/service/appointment/pay-and-confirm?appointmentId=" +
        appointmentId,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          //   Authorization: "Bearer " + customer_jwtToken,
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
          <h2>My Appointments</h2>
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
                  <th scope="col">Shop Name</th>
                  <th scope="col">Service Expert</th>
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
                        <b>{appointment.service.serviceCenter.shopName}</b>
                      </td>
                      <td>
                        <b>
                          {appointment.service.serviceCenter.firstName +
                            " " +
                            appointment.service.serviceCenter.lastName}
                        </b>
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
                          if (
                            appointment.servicingStatus === "Done" &&
                            appointment.status !== "Booked & Paid"
                          ) {
                            return (
                              <button
                                onClick={(e) =>
                                  payAndConfirmServicing(appointment.id, e)
                                }
                                className="btn btn-sm bg-color custom-bg-text ms-2 mt-2"
                              >
                                Pay
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
    </div>
  );
};

export default ViewCustomerAppointments;

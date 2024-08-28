import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import ServiceCarousel from "./ServiceCarousel";
import { Button, Modal } from "react-bootstrap";

const ServiceDetailPage = () => {
  const { serviceId } = useParams();

  const customer = JSON.parse(sessionStorage.getItem("active-customer"));
  const customer_jwtToken = sessionStorage.getItem("customer-jwtToken");

  const serviceCenter = JSON.parse(sessionStorage.getItem("active-service"));
  const service_jwtToken = sessionStorage.getItem("service-jwtToken");

  const navigate = useNavigate();

  const [service, setService] = useState({
    id: "",
    name: "",
    description: "",
    category: {
      id: "",
      name: "",
      description: "",
      status: "",
    },
    serviceCenter: {
      id: "",
      firstName: "",
      lastName: "",
      shopName: "",
      emailId: "",
      phoneNo: "",
      role: "",
      address: {
        id: "",
        street: "",
        city: "",
        pincode: "",
      },
      walletAmount: "",
      status: "",
    },
    addedTime: "",
    minPrice: "",
    deliveryTime: "",
    image1: "",
    image2: "",
    image3: "",
    status: "",
  });

  const [serviceRequest, setServiceRequest] = useState({
    serviceId: serviceId,
    customerId: customer ? customer.id : 0,
    issue_description: "",
    appointmentTime: "",
    appointmentDate: "",
    vehicleName: "",
    vehicleRegistration: "",
  });

  const handleInput = (e) => {
    setServiceRequest({ ...serviceRequest, [e.target.name]: e.target.value });
  };

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  useEffect(() => {
    const getService = async () => {
      const fetchServiceResponse = await retrieveService();
      if (fetchServiceResponse) {
        setService(fetchServiceResponse.services[0]);
      }
    };
    getService();
  }, []);

  const retrieveService = async () => {
    const response = await axios.get(
      "http://13.60.229.97:8080/api/service/fetch/id-wise?serviceId=" + serviceId
    );
    console.log(response.data);
    return response.data;
  };

  const formatDateFromEpoch = (epochTime) => {
    const date = new Date(Number(epochTime));
    const formattedDate = date.toLocaleString(); // Adjust the format as needed

    return formattedDate;
  };

  const showTakeAppointmentPage = (e) => {
    e.preventDefault();
    if (customer === null) {
      alert("Please login as customer to book an appointment!!!");
    } else {
      handleShow();
    }
  };

  const saveAppointment = (e) => {
    fetch("http://13.60.229.97:8080/api/service/appointment/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        //     Authorization: "Bearer " + customer_jwtToken,
      },
      body: JSON.stringify(serviceRequest),
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
              navigate("/home");
            }, 2000); // Redirect after 3 seconds
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
            setTimeout(() => {
              window.location.reload(true);
            }, 2000); // Redirect after 3 seconds
          } else {
            toast.error("It Seems Server is down!!!", {
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
            }, 2000); // Redirect after 3 seconds
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
        setTimeout(() => {
          window.location.reload(true);
        }, 1000); // Redirect after 3 seconds
      });
    e.preventDefault();
  };

  return (
    <div className="mb-3">
      <div className="col ml-5 mt-3 ms-5 me-5">
        {/* Company and Employer Details Card */}
        <div className="card rounded-card h-100 shadow-lg ">
          <h2 className="card-title text-center text-color ms-4">
            Service Detail
          </h2>

          <div className="row g-0">
            {/* Left side - Company Details Card */}
            <div className="col-md-6">
              <div className="card-body">
                <div className="row g-0">
                  {/* Left side - Company Logo */}
                  <div className="col-md-4 d-flex align-items-center justify-content-center">
                    <ServiceCarousel
                      item={{
                        image1: service.image1,
                        image2: service.image2,
                        image3: service.image3,
                      }}
                    />
                  </div>
                  {/* Right side - Job Details */}
                  <div className="col-md-8">
                    <div className="card-body text-color">
                      <h3 className="card-title d-flex justify-content-between text-color-second">
                        <div>
                          <b>{service.name}</b>
                        </div>
                      </h3>
                      <p className="card-text text-dark">
                        {service.description}
                      </p>

                      <b>
                        <span className="text-dark">
                          Service Center Expert:
                        </span>
                        <span className="text-color ms-2">
                          {service.serviceCenter.firstName +
                            " " +
                            service.serviceCenter.lastName}
                        </span>
                      </b>
                      <br />
                      <br />
                      <b>
                        <span className="text-dark">Shop Name:</span>
                        <span className="text-color ms-2">
                          {service.serviceCenter.shopName}
                        </span>
                      </b>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Employer Details Card */}
            <div className="col-md-6 text-dark">
              <div className="card-body">
                {/* Include the necessary details for the employer */}
                {/* Display First Name and Last Name in a row */}

                <div className="row mt-5">
                  <div className="col-md-6">
                    <p className="mb-2">
                      <b>Category:</b>

                      <span className="text-color">
                        {" "}
                        {service.category.name}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-md-6">
                    <p className="mb-2">
                      <b>Added Time:</b>

                      <span className="text-color">
                        {" "}
                        {formatDateFromEpoch(service.addedTime)}
                      </span>
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p className="mb-2">
                      <b>Delivery Time:</b>
                      <span className="text-color">
                        {" "}
                        {service.deliveryTime + " Days"}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-md-6">
                    <p className="mb-2">
                      <b>Minimum Price:</b>

                      <span className="text-color">
                        {" "}
                        &#8377; {service.minPrice}
                      </span>
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p className="mb-2">
                      <b>Shop Address:</b>
                      <span className="text-color">
                        {service.serviceCenter.address.street +
                          " " +
                          service.serviceCenter.address.city +
                          " " +
                          service.serviceCenter.address.pincode}{" "}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {(() => {
            if (service.status === "Active") {
              return (
                <div className="d-flex justify-content-center mt-4">
                  <button
                    type="button"
                    className="btn bg-color custom-bg-text mb-3"
                    onClick={(e) => showTakeAppointmentPage(e)}
                  >
                    <b> Take Appointment</b>
                  </button>
                  <ToastContainer />
                </div>
              );
            }
          })()}
        </div>
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton className="bg-color custom-bg-text">
          <Modal.Title
            style={{
              borderRadius: "1em",
            }}
          >
            Service Appointment
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="ms-3 mt-3 mb-3 me-3">
            <form>
              <div class="mb-3">
                <label for="title" class="form-label">
                  <b>Vehicle Name</b>
                </label>
                <input
                  type="text"
                  class="form-control"
                  name="vehicleName"
                  onChange={handleInput}
                  value={serviceRequest.vehicleName}
                  required
                />
              </div>
              <div class="mb-3">
                <label for="title" class="form-label">
                  <b>Vehicle Registration No.</b>
                </label>
                <input
                  type="text"
                  class="form-control"
                  name="vehicleRegistration"
                  onChange={handleInput}
                  value={serviceRequest.vehicleRegistration}
                  required
                />
              </div>

              <div class="mb-3">
                <label for="title" class="form-label">
                  <b>Issue Description</b>
                </label>
                <textarea
                  type="text"
                  class="form-control"
                  name="issue_description"
                  onChange={handleInput}
                  value={serviceRequest.issue_description}
                  placeholder="enter your issue description here...."
                  required
                />
              </div>

              <div class="mb-3">
                <label for="title" class="form-label">
                  <b>Appointment Date</b>
                </label>
                <input
                  type="date"
                  class="form-control"
                  name="appointmentDate"
                  onChange={handleInput}
                  value={serviceRequest.appointmentDate}
                  required
                />
              </div>

              <div class="mb-3">
                <label for="title" class="form-label">
                  <b>Appointment Time</b>
                </label>
                <select
                  name="appointmentTime"
                  onChange={handleInput}
                  className="form-control"
                  required
                >
                  <option value="">Select Time Slot</option>
                  <option value="09:00 - 10:00 am">09:00 - 10:00 am</option>
                  <option value="10:00 - 11:00 am">10:00 - 11:00 am</option>
                  <option value="11:00 - 12:00 pm">11:00 - 12:00 pm</option>
                  <option value="12:00 - 01:00 pm">12:00 - 01:00 pm</option>
                  <option value="01:00 - 02:00 pm">01:00 - 02:00 pm</option>
                  <option value="02:00 - 03:00 pm">02:00 - 03:00 pm</option>
                  <option value="03:00 - 04:00 pm">03:00 - 04:00 pm</option>
                  <option value="04:00 - 05:00 pm">04:00 - 05:00 pm</option>
                  <option value="05:00 - 06:00 pm">05:00 - 06:00 pm</option>
                  <option value="06:00 - 07:00 pm">06:00 - 07:00 pm</option>
                  <option value="07:00 - 08:00 pm">07:00 - 08:00 pm</option>
                  <option value="08:00 - 09:00 pm">08:00 - 09:00 pm</option>
                  <option value="09:00 - 10:00 pm">09:00 - 10:00 pm</option>
                </select>
              </div>

              <div className="d-flex aligns-items-center justify-content-center mb-2">
                <button
                  type="submit"
                  onClick={saveAppointment}
                  class="btn bg-color custom-bg-text"
                >
                  Take Appointment
                </button>
                <ToastContainer />
              </div>

              <ToastContainer />
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ServiceDetailPage;

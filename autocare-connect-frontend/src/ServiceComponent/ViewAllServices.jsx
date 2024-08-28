import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { ToastContainer, toast } from "react-toastify";

const ViewAllServices = () => {
  const admin_jwtToken = sessionStorage.getItem("admin-jwtToken");
  const admin = JSON.parse(sessionStorage.getItem("active-admin"));

  const [services, setServices] = useState([]);

  useEffect(() => {
    const getAllServices = async () => {
      const allServices = await retrieveAllServices();
      if (allServices) {
        setServices(allServices.services);
      }
    };

    getAllServices();
  }, []);

  const retrieveAllServices = async () => {
    const response = await axios.get(
      "http://13.60.229.97:8080/api/service/fetch/all"
    );
    return response.data;
  };

  const formatDateFromEpoch = (epochTime) => {
    const date = new Date(Number(epochTime));
    const formattedDate = date.toLocaleString(); // Adjust the format as needed

    return formattedDate;
  };

  const deleteExpertService = (serviceId, e) => {
    fetch("http://13.60.229.97:8080/api/service/delete?serviceId=" + serviceId, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        //   Authorization: "Bearer " + expert_jwtToken,
      },
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
            setTimeout(() => {
              window.location.reload(true);
            }, 1000); // Redirect after 3 seconds
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
          <h2>All Services</h2>
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
                  <th scope="col">Description</th>
                  <th scope="col">Shop Name</th>
                  <th scope="col">Service Center Expert</th>
                  <th scope="col">Category</th>
                  <th scope="col">Delivery Time</th>
                  <th scope="col">Min. Price</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => {
                  return (
                    <tr>
                      <td>
                        <img
                          src={
                            "http://13.60.229.97:8080/api/service/" +
                            service.image1
                          }
                          class="img-fluid"
                          alt="service_pic"
                          style={{
                            maxWidth: "90px",
                          }}
                        />
                      </td>
                      <td>
                        <b>{service.name}</b>
                      </td>
                      <td>
                        <b>{service.description}</b>
                      </td>
                      <td>
                        <b>{service.serviceCenter.shopName}</b>
                      </td>
                      <td>
                        <b>
                          {service.serviceCenter.firstName +
                            " " +
                            service.serviceCenter.lastName}
                        </b>
                      </td>
                      <td>
                        <b>{service.category.name}</b>
                      </td>

                      <td>
                        <b>{service.deliveryTime}</b>
                      </td>
                      <td>
                        <b>{service.minPrice}</b>
                      </td>
                      <td>
                        <b>{service.status}</b>
                      </td>
                      <td>
                        {(() => {
                          if (service.status === "Active") {
                            return (
                              <button
                                onClick={() => deleteExpertService(service.id)}
                                className="btn btn-sm bg-color custom-bg-text ms-2"
                              >
                                Delete
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
    </div>
  );
};

export default ViewAllServices;

import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UserRegister = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    shopName: "",
    emailId: "",
    password: "",
    phoneNo: "",
    street: "",
    city: "",
    pincode: "",
    role: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    shopName: "",
    emailId: "",
    password: "",
    phoneNo: "",
    street: "",
    city: "",
    pincode: "",
  });

  useEffect(() => {
    if (document.URL.indexOf("customer") !== -1) {
      setUser((prevUser) => ({ ...prevUser, role: "Customer" }));
    } else if (document.URL.indexOf("service-center") !== -1) {
      setUser((prevUser) => ({ ...prevUser, role: "Service Center" }));
    }
  }, []);

  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors = {
      firstName: "",
      lastName: "",
      shopName: "",
      emailId: "",
      password: "",
      phoneNo: "",
      street: "",
      city: "",
      pincode: "",
    };

    // Validate firstName
    if (!user.firstName.trim()) {
      newErrors.firstName = "First Name is required";
      isValid = false;
    }

    // Validate lastName
    if (!user.lastName.trim()) {
      newErrors.lastName = "Last Name is required";
      isValid = false;
    }

    // Validate emailId
    if (!user.emailId.trim()) {
      newErrors.emailId = "Email Id is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.emailId)) {
      newErrors.emailId = "Invalid email format";
      isValid = false;
    }

    // Validate password
    if (!user.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (user.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      isValid = false;
    }
    

    // Validate phoneNo
    if (!user.phoneNo.trim()) {
      newErrors.phoneNo = "Phone Number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(user.phoneNo)) {
      newErrors.phoneNo = "Phone Number must be exactly 10 digits";
      isValid = false;
    }

    // Validate street
    if (!user.street.trim()) {
      newErrors.street = "Street is required";
      isValid = false;
    }

    // Validate city
    if (!user.city.trim()) {
      newErrors.city = "City is required";
      isValid = false;
    }

    // Validate pincode
    if (!user.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
      isValid = false;
    } else if (!/^\d{6}$/.test(user.pincode)) {
      newErrors.pincode = "Pincode must be exactly 6 digits";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const saveUser = (e) => {
    e.preventDefault();

    if (validateForm()) {
      fetch("http://13.60.229.97:8080/api/user/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          // Authorization: "Bearer " + jwtToken,
        },
        body: JSON.stringify(user),
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
                navigate("/user/login");
              }, 1000);
            } else {
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
              }, 1000);
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
          }, 1000);
        });
    }
  };

  return (
    <div>
      <div className="mt-2 d-flex aligns-items-center justify-content-center ms-2 me-2 mb-2">
        <div
          className="form-card border-color text-color"
          style={{ width: "50rem" }}
        >
          <div className="container-fluid">
            <div
              className="card-header bg-color custom-bg-text mt-2 d-flex justify-content-center align-items-center"
              style={{
                borderRadius: "1em",
                height: "45px",
              }}
            >
              <h5 className="card-title">
                Register{" "}
                {document.URL.indexOf("service-center") !== -1
                  ? "Service Center"
                  : "Customer"}{" "}
                Here!!!
              </h5>
            </div>
            <div className="card-body mt-3">
              <form className="row g-3" onSubmit={saveUser}>
                <div className="col-md-6 mb-3 text-color">
                  <label htmlFor="firstName" className="form-label">
                    <b>First Name</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    onChange={handleUserInput}
                    value={user.firstName}
                  />
                  {errors.firstName && (
                    <div className="text-danger">{errors.firstName}</div>
                  )}
                </div>

                <div className="col-md-6 mb-3 text-color">
                  <label htmlFor="lastName" className="form-label">
                    <b>Last Name</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    onChange={handleUserInput}
                    value={user.lastName}
                  />
                  {errors.lastName && (
                    <div className="text-danger">{errors.lastName}</div>
                  )}
                </div>

                {document.URL.indexOf("service-center") !== -1 && (
                  <div className="col-md-6 mb-3 text-color">
                    <label htmlFor="shopName" className="form-label">
                      <b>Shop Name</b>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="shopName"
                      name="shopName"
                      onChange={handleUserInput}
                      value={user.shopName}
                    />
                    {errors.shopName && (
                      <div className="text-danger">{errors.shopName}</div>
                    )}
                  </div>
                )}

                <div className="col-md-6 mb-3 text-color">
                  <label htmlFor="emailId" className="form-label">
                    <b>Email Id</b>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="emailId"
                    name="emailId"
                    onChange={handleUserInput}
                    value={user.emailId}
                  />
                  {errors.emailId && (
                    <div className="text-danger">{errors.emailId}</div>
                  )}
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="password" className="form-label">
                    <b>Password</b>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    onChange={handleUserInput}
                    value={user.password}
                  />
                  {errors.password && (
                    <div className="text-danger">{errors.password}</div>
                  )}
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="phoneNo" className="form-label">
                    <b>Contact No</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="phoneNo"
                    name="phoneNo"
                    onChange={handleUserInput}
                    value={user.phoneNo}
                  />
                  {errors.phoneNo && (
                    <div className="text-danger">{errors.phoneNo}</div>
                  )}
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="street" className="form-label">
                    <b>Street</b>
                  </label>
                  <textarea
                    className="form-control"
                    id="street"
                    name="street"
                    rows="3"
                    onChange={handleUserInput}
                    value={user.street}
                  />
                  {errors.street && (
                    <div className="text-danger">{errors.street}</div>
                  )}
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="city" className="form-label">
                    <b>City</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    name="city"
                    onChange={handleUserInput}
                    value={user.city}
                  />
                  {errors.city && (
                    <div className="text-danger">{errors.city}</div>
                  )}
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="pincode" className="form-label">
                    <b>Pincode</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="pincode"
                    name="pincode"
                    onChange={handleUserInput}
                    value={user.pincode}
                  />
                  {errors.pincode && (
                    <div className="text-danger">{errors.pincode}</div>
                  )}
                </div>

                <div className="d-flex aligns-items-center justify-content-center">
                  <input
                    type="submit"
                    className="btn bg-color custom-bg-text"
                    value="Register User"
                  />
                </div>
                <ToastContainer />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;

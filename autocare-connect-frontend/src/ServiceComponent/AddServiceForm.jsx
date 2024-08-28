import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddServiceForm = () => {
  const serviceCenter = JSON.parse(sessionStorage.getItem("active-service"));
  const service_jwtToken = sessionStorage.getItem("service-jwtToken");

  const [categories, setCategories] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    const getAllCategories = async () => {
      const res = await retrieveAllCategories();
      if (res) {
        setCategories(res.categories);
      }
    };

    getAllCategories();
  }, []);

  const retrieveAllCategories = async () => {
    const response = await axios.get(
      "http://13.60.229.97:8080/api/category/fetch/all"
    );
    return response.data;
  };

  const [selectedImage1, setSelectImage1] = useState(null);
  const [selectedImage2, setSelectImage2] = useState(null);
  const [selectedImage3, setSelectImage3] = useState(null);

  const [service, setService] = useState({
    name: "",
    description: "",
    categoryId: "",
    serviceCenterId: serviceCenter.id,
    minPrice: "",
    deliveryTime: "",
  });

  const handleInput = (e) => {
    setService({ ...service, [e.target.name]: e.target.value });
  };

  const saveService = (e) => {
    e.preventDefault();
    if (service === null) {
      toast.error("invalid input!!!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return;
    }

    const formData = new FormData();
    formData.append("name", service.name);
    formData.append("description", service.description);
    formData.append("categoryId", service.categoryId);
    formData.append("serviceCenterId", service.serviceCenterId);
    formData.append("minPrice", service.minPrice);
    formData.append("deliveryTime", service.deliveryTime);
    formData.append("image1", selectedImage1);
    formData.append("image2", selectedImage2);
    formData.append("image3", selectedImage3);

    axios
      .post("http://13.60.229.97:8080/api/service/add", formData, {
        headers: {
          // Authorization: "Bearer " + service_jwtToken, // Replace with your actual JWT token
        },
      })
      .then((resp) => {
        let response = resp.data;

        if (response.success) {
          toast.success(response.responseMessage, {
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
        } else if (!response.success) {
          toast.error(response.responseMessage, {
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
          // }, 2000); // Redirect after 3 seconds
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
          // setTimeout(() => {
          //   window.location.reload(true);
          // }, 2000); // Redirect after 3 seconds
        }
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
        // }, 2000); // Redirect after 3 seconds
      });
  };

  const convertToEpochTime = (dateString) => {
    const selectedDate = new Date(dateString);
    const epochTime = selectedDate.getTime();
    return epochTime;
  };

  return (
    <div>
      <div class="mt-2 d-flex aligns-items-center justify-content-center mb-4 ms-3 me-3">
        <div class="card form-card shadow-lg">
          <div className="container-fluid">
            <div
              className="card-header bg-color custom-bg-text mt-2 text-center"
              style={{
                borderRadius: "1em",
                height: "45px",
              }}
            >
              <h5 class="card-title">Add Service</h5>
            </div>
            <div class="card-body text-color">
              <form className="row g-3">
                <div className="col-md-3 mb-3">
                  <label htmlFor="title" className="form-label">
                    <b>Service Name</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    onChange={handleInput}
                    value={service.name}
                  />
                </div>
                <div className="col-md-3 mb-3">
                  <label className="form-label">
                    <b>Service Description</b>
                  </label>
                  <textarea
                    class="form-control"
                    id="description"
                    name="description"
                    rows="2"
                    placeholder="enter description.."
                    onChange={handleInput}
                    value={service.description}
                  />
                </div>

                <div className="col-md-3 mb-3">
                  <label className="form-label">
                    <b>Service Category</b>
                  </label>

                  <select
                    name="categoryId"
                    onChange={handleInput}
                    className="form-control"
                  >
                    <option value="">Select Category</option>

                    {categories.map((category) => {
                      return (
                        <option value={category.id}> {category.name} </option>
                      );
                    })}
                  </select>
                </div>

                <div className="col-md-3 mb-3">
                  <label htmlFor="title" className="form-label">
                    <b>Delivery Time</b>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="deliveryTime"
                    name="deliveryTime"
                    onChange={handleInput}
                    value={service.deliveryTime}
                  />
                </div>

                <div className="col-md-3 mb-3">
                  <label htmlFor="pincode" className="form-label">
                    <b>Minimum Price</b>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="minPrice"
                    name="minPrice"
                    onChange={handleInput}
                    value={service.minPrice}
                  />
                </div>

                <div className="col-md-3 mb-3">
                  <label for="formFile" class="form-label">
                    <b> Select service Image 1</b>
                  </label>
                  <input
                    class="form-control"
                    type="file"
                    id="formFile"
                    name="image1"
                    onChange={(e) => setSelectImage1(e.target.files[0])}
                    required
                  />
                </div>
                <div className="col-md-3 mb-3">
                  <label for="formFile" class="form-label">
                    <b> Select service Image 2</b>
                  </label>
                  <input
                    class="form-control"
                    type="file"
                    id="formFile"
                    name="image2"
                    onChange={(e) => setSelectImage2(e.target.files[0])}
                    required
                  />
                </div>
                <div className="col-md-3 mb-3">
                  <label for="formFile" class="form-label">
                    <b> Select service Image 3</b>
                  </label>
                  <input
                    class="form-control"
                    type="file"
                    id="formFile"
                    name="image3"
                    onChange={(e) => setSelectImage3(e.target.files[0])}
                    required
                  />
                </div>

                <div className="d-flex aligns-items-center justify-content-center mb-2">
                  <button
                    type="submit"
                    class="btn bg-color custom-bg-text"
                    onClick={saveService}
                  >
                    Add Service
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddServiceForm;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Carousel from "./Carousel";
import Footer from "../NavbarComponent/Footer";
import { useNavigate } from "react-router-dom";
import ServiceCard from "../ServiceComponent/ServiceCard";

const HomePage = () => {
  const navigate = useNavigate();
  const [subCategories, setSubCategories] = useState([]);

  const [subCategoryId, setSubCategoryId] = useState("");

  const [tempSubCategoryId, setTempSubCategoryId] = useState("");

  const [services, setServices] = useState([]);

  useEffect(() => {
    const getAllServices = async () => {
      const allServices = await retrieveAllServices();
      if (allServices) {
        setServices(allServices.services);
      }
    };

    const getSearchedServices = async () => {
      const allServices = await searchServices();
      if (allServices) {
        setServices(allServices.services);
      }
    };

    const getAllCategories = async () => {
      const res = await retrieveAllCategories();
      if (res) {
        setSubCategories(res.categories);
      }
    };

    if (subCategoryId !== "") {
      getSearchedServices();
    } else {
      getAllServices();
    }

    getAllCategories();
  }, [subCategoryId]);

  const retrieveAllServices = async () => {
    const response = await axios.get(
      "http://13.60.229.97:8080/api/service/fetch/all"
    );
    return response.data;
  };

  const retrieveAllCategories = async () => {
    const response = await axios.get(
      "http://13.60.229.97:8080/api/category/fetch/all"
    );
    return response.data;
  };

  const searchServices = async () => {
    if (subCategoryId !== "" || subCategoryId !== "0") {
      const response = await axios.get(
        "http://13.60.229.97:8080/api/service/fetch/category-wise?subCategoryId=" +
          subCategoryId
      );
      return response.data;
    }
  };

  const searchServicesBySubCategory = (e) => {
    e.preventDefault();
    setSubCategoryId(tempSubCategoryId);
    setTempSubCategoryId("");
  };

  return (
    <div className="container-fluid mb-2">
      <Carousel />

      <div className="d-flex aligns-items-center justify-content-center">
        <div className="row">
          <div className="col">
            <div className="mt-3">
              <form class="row g-3">
                <div class="col-auto">
                  <select
                    name="tempSubCategoryId"
                    onChange={(e) => setTempSubCategoryId(e.target.value)}
                    className="form-control"
                    required
                  >
                    <option value="">Select Service Category</option>

                    {subCategories.map((category) => {
                      return (
                        <option value={category.id}> {category.name} </option>
                      );
                    })}
                  </select>
                </div>

                <div class="col-auto">
                  <button
                    type="submit"
                    class="btn bg-color custom-bg-text mb-3"
                    onClick={searchServicesBySubCategory}
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-12 mt-3 mb-5">
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {services.map((service) => {
            return <ServiceCard item={service} key={service.id} />;
          })}
        </div>
      </div>
      <hr />
      <Footer />
    </div>
  );
};

export default HomePage;

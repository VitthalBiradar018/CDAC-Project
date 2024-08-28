import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ServiceCenterHeader = () => {
  let navigate = useNavigate();

  const expert = JSON.parse(sessionStorage.getItem("active-service"));

  const guideLogout = () => {
    toast.success("logged out!!!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    sessionStorage.removeItem("active-service");
    sessionStorage.removeItem("service-jwtToken");

    setTimeout(() => {
      navigate("/home");
      window.location.reload(true);
    }, 2000); // Redirect after 3 seconds
  };

  const viewProfile = (e) => {
    navigate(`/user/${expert.id}/profile/detail`);
  };

  return (
    <ul class="navbar-nav ms-auto mb-2 mb-lg-0 me-5">
      <li class="nav-item dropdown">
        <a
          class="nav-link dropdown-toggle text-color"
          href="#"
          id="navbarDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <b> My Services</b>
        </a>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
          <li>
            <Link
              to="/service-center/service/add"
              class="nav-link active"
              aria-current="page"
            >
              <b className="text-color"> Add Service</b>
            </Link>
          </li>
          <li>
            <Link
              to="/service-center/service/all"
              class="nav-link active"
              aria-current="page"
            >
              <b className="text-color">View Services</b>
            </Link>
          </li>
        </ul>
      </li>

      <li class="nav-item dropdown">
        <a
          class="nav-link dropdown-toggle text-color"
          href="#"
          id="navbarDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <b> Appointments</b>
        </a>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
          <li>
            <Link
              to="/service-center/service/appointment/all"
              class="nav-link active"
              aria-current="page"
            >
              <b className="text-color"> View Appointments</b>
            </Link>
          </li>
        </ul>
      </li>

      <li class="nav-item dropdown">
        <a
          class="nav-link dropdown-toggle text-color"
          href="#"
          id="navbarDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <b> Profile</b>
        </a>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
          <li class="nav-item">
            <div class="nav-link active" aria-current="page">
              <b className="text-color" onClick={viewProfile}>
                View Profile
              </b>
              <ToastContainer />
            </div>
          </li>
        </ul>
      </li>

      <li class="nav-item">
        <Link
          to=""
          class="nav-link active"
          aria-current="page"
          onClick={guideLogout}
        >
          <b className="text-color">Logout</b>
        </Link>
        <ToastContainer />
      </li>
    </ul>
  );
};

export default ServiceCenterHeader;
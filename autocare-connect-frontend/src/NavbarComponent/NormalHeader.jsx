import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const NormalHeader = () => {
  let navigate = useNavigate();

  const navigateToForgetPasswordPage = () => {
    navigate("/customer/forgetPassword");
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
          <b> Register</b>
        </a>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
          <li class="nav-item">
            <Link
              to="/user/customer/register"
              class="nav-link active"
              aria-current="page"
            >
              <b className="text-color"> Customer</b>
            </Link>
          </li>

          <li class="nav-item">
            <Link
              to="/user/service-center/register"
              class="nav-link active"
              aria-current="page"
            >
              <b className="text-color"> Service Center</b>
            </Link>
          </li>
        </ul>
      </li>

      <li class="nav-item">
        <Link to="/user/login" class="nav-link active" aria-current="page">
          <b className="text-color">Login User</b>
        </Link>
      </li>
    </ul>
  );
};

export default NormalHeader;

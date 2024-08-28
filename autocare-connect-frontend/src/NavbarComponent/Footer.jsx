import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div>
      <div class="container my-5">
        <footer class="text-center text-lg-start text-color">
          <div class="container-fluid p-4 pb-0">
            <section class="">
              <div class="row">
                <div class="col-lg-4 col-md-6 mb-4 mb-md-0">
                  <h5 class="text-uppercase header-logo-color">
                  About us
                  </h5>

                  <p>
                    Welcome to Auto Care Connect, where expert vehicle servicing
                    meets exceptional care. Our dedicated team ensures your car
                    receives top-quality maintenance and repairs. Trust us for
                    reliable solutions and personalized service tailored to your
                    needs.
                  </p>
                </div>

                
              

                <div class="col-lg-4 col-md-6 mb-4 mb-md-0">
                  <h5 class="text-uppercase header-logo-color">Contact us</h5>

                  <ul class="list-unstyled mb-0">
                    <li>
                      Contact : +91 9021520735
                    </li>
                    <li>
                    Mail us : <a href="connectautocare@gmail.com" className="contact-link"class="text-color">connectautocare@gmail.com</a>
                    </li>
                    
                  </ul>
                </div>

                <div class="col-lg-4 col-md-6 mb-4 mb-md-0">
                  <h5 class="text-uppercase header-logo-color">Our Services</h5>

                  <ul class="list-unstyled mb-0">
                    <li>
                    Foam Wash
                    </li>
                    <li>
                    Bike Tyres
                    </li>
                    <li>
                    Engine Work
                    </li>
                    <li>
                      Oil Change
                    </li>
                    <li>
                      Break Pad
                    </li>
                  </ul>
                </div>

                
              </div>
            </section>

            <hr class="mb-4" />

            <section class="">
              <p class="d-flex justify-content-center align-items-center">
                <span class="me-3 header-logo-color">Login from here</span>
                <Link to="/user/login" class="active">
                  <button
                    type="button"
                    class="btn btn-outline-light btn-rounded bg-color custom-bg-text"
                  >
                    Log in
                  </button>
                </Link>
              </p>
            </section>

            <hr class="mb-4" />
          </div>

          <div class="text-center">
            © 2024 Copyright:
            <a class="text-color-3" href="#">
              autocareconnect.com
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
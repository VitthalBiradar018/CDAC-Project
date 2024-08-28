
const ServiceCarousel = (service) => {
  return (
    <div
      id="carouselExampleCaptions"
      class="carousel slide"
      data-bs-ride="false"
    >
      <div class="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="0"
          class="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img
            src={"http://13.60.229.97:8080/api/service/" + service.item.image1}
            class="d-block w-100"
            alt="..."
            style={{
              maxHeight: "250px",
            }}
          />
        </div>
        <div class="carousel-item">
          <img
            src={"http://13.60.229.97:8080/api/service/" + service.item.image2}
            class="d-block w-100"
            alt="..."
            style={{
              maxHeight: "250px",
            }}
          />
        </div>
        <div class="carousel-item">
          <img
            src={"http://13.60.229.97:8080/api/service/" + service.item.image3}
            class="d-block w-100"
            alt="..."
            style={{
              maxHeight: "250px",
            }}
          />
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default ServiceCarousel;
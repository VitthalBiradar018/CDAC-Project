import AdminHeader from "./AdminHeader";
import HeaderCustomer from "./HeaderCustomer";
import NormalHeader from "./NormalHeader";
import ServiceCenterHeader from "./ServiceCenterHeader";

const RoleNav = () => {
  const customer = JSON.parse(sessionStorage.getItem("active-customer"));
  const admin = JSON.parse(sessionStorage.getItem("active-admin"));
  const serviceCenter = JSON.parse(sessionStorage.getItem("active-service"));

  if (customer != null) {
    return <HeaderCustomer />;
  } else if (admin != null) {
    return <AdminHeader />;
  } else if (serviceCenter != null) {
    return <ServiceCenterHeader />;
  } else {
    return <NormalHeader />;
  }
};

export default RoleNav;

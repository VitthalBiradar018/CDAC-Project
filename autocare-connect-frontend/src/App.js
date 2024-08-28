import { Routes, Route } from "react-router-dom";
import Header from "./NavbarComponent/Header";
import AdminRegisterForm from "./UserComponent/AdminRegisterForm";
import UserLoginForm from "./UserComponent/UserLoginForm";
import UserRegister from "./UserComponent/UserRegister";
import HomePage from "./PageComponent/HomePage";
import ViewAllCustomers from "./UserComponent/ViewAllCustomers";
import AddCategoryForm from "./CategoryComponent/AddCategoryForm";
import ViewAllCategories from "./CategoryComponent/ViewAllCategories";
import UpdateCategoryForm from "./CategoryComponent/UpdateCategoryForm";
import MyWallet from "./UserComponent/MyWallet";
import UserProfilePage from "./UserComponent/UserProfilePage";
import AddServiceForm from "./ServiceComponent/AddServiceForm";
import ServiceDetailPage from "./ServiceComponent/ServiceDetailPage";
import ViewExpertServices from "./ServiceComponent/ViewExpertServices";
import ViewAllServices from "./ServiceComponent/ViewAllServices";
import ViewAllServiceCenters from "./UserComponent/ViewAllServiceCenters";
import ViewCustomerAppointments from "./ServiceComponent/ViewCustomerAppointments";
import ViewServiceCenterAppointments from "./ServiceComponent/ViewServiceCenterAppointments";
import ViewAllAppointments from "./ServiceComponent/ViewAllAppointments";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/user/admin/register" element={<AdminRegisterForm />} />
        <Route path="/user/login" element={<UserLoginForm />} />
        <Route path="/user/customer/register" element={<UserRegister />} />
        <Route
          path="/user/service-center/register"
          element={<UserRegister />}
        />
        <Route path="/admin/customer/all" element={<ViewAllCustomers />} />
        <Route
          path="/admin/service-center/all"
          element={<ViewAllServiceCenters />}
        />
        <Route path="/admin/category/add" element={<AddCategoryForm />} />
        <Route path="/admin/category/all" element={<ViewAllCategories />} />
        <Route path="/admin/category/update" element={<UpdateCategoryForm />} />
        <Route path="/customer/wallet" element={<MyWallet />} />
        <Route
          path="/user/:userId/profile/detail"
          element={<UserProfilePage />}
        />
        <Route
          path="/service-center/service/add"
          element={<AddServiceForm />}
        />
        <Route
          path="/service/:serviceId/detail"
          element={<ServiceDetailPage />}
        />
        <Route
          path="/service-center/service/all"
          element={<ViewExpertServices />}
        />
        <Route path="/admin/service/all" element={<ViewAllServices />} />
        <Route
          path="/customer/service/appointment/all"
          element={<ViewCustomerAppointments />}
        />
        <Route
          path="/service-center/service/appointment/all"
          element={<ViewServiceCenterAppointments />}
        />
        <Route
          path="/admin/service/appointment/all"
          element={<ViewAllAppointments />}
        />
      </Routes>
    </div>
  );
}

export default App;

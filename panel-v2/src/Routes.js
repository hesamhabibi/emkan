import { Route, Routes } from "react-router-dom";
import routesName from "./constants/routes";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
// import Users from "./pages/users";
import UserIndex from "./pages/users";
import Roles from "./pages/roles";
import ManageRole from "./pages/roles-management";

import Error404 from "./components/errors/error-404";
import BrandIndex from "./pages/Brands";
import ManageBrand from './pages/brands-management'

import ManageUser from "./pages/users-management"
// import Error500 from "./components/errors/error-500";
// import Error401 from "./components/errors/error-401";
// import Error403 from "./components/errors/error-403";
// import Error426 from "./components/errors/error-426";
// import Error429 from "./components/errors/error-429";

const Index = () => {
  return (
    <Routes>
      {/*start  roles routes*/}
      <Route path={routesName["roles"]} element={<Roles />} />

      <Route path={routesName["roles-management"]} element={<ManageRole />} />

      <Route
        path={routesName["roles-management-edit"]}
        element={<ManageRole />}
      />
      {/*end  roles routes*/}

      <Route path={routesName["users"]} element={<UserIndex />} />

      <Route path={routesName["login"]} element={<Login />} />

      <Route path={routesName["dashboard"]} element={<Dashboard/>} />

      <Route path={routesName["brands"]} element={<BrandIndex/>} />

      <Route path={routesName["brands-management"]} element={<ManageBrand/>} />
      <Route path={routesName["brands-management-edit"]} element={<ManageBrand/>} />

      <Route path={routesName["users-management"]} element={<ManageUser/>} />
      <Route path={routesName["users-management-edit"]} element={<ManageUser/>} />


      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default Index;

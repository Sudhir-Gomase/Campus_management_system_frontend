import Dashboard from "./Dashboard";
import Company from "./Company";
import Students from "./Students";
import PrivateRoute from "./PrivateRoutes";

export const routes = [
  {
    path: "/",
    element:
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ,
  },
  {
    path: "/student",
    element:
      <PrivateRoute>
        <Students />
      </PrivateRoute>
    ,
  },
  {
    path: "/company",
    element:
      <PrivateRoute>
        <Company />
      </PrivateRoute>
    ,
  },
]
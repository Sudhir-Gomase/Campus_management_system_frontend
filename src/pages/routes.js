import Dashboard from "./Dashboard";
import Company from "./Company";
import Students from "./Students";
import PrivateRoute from "./PrivateRoutes";
import Account from "./Account";
import StudentDashboard from "./StudentDashboard";
import UpdateStudentForm from "./UpdateStudentForm";
import StudentOngoingProcess from "./StudentOngoingProcess";

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
  {
    path: "/account",
    element:
      <PrivateRoute>
        <Account />
      </PrivateRoute>
    ,
  },
  {
    path: "/student-dashboard",
    element:
      <PrivateRoute>
        <StudentDashboard />
      </PrivateRoute>
    ,
  },
  {
    path: "/student-form",
    element:
      <PrivateRoute>
        <UpdateStudentForm />
      </PrivateRoute>
    ,
  },
  {
    path: "/student-ongoing",
    element:
      <PrivateRoute>
        <StudentOngoingProcess />
      </PrivateRoute>
    ,
  },
]
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignInContainer from "./containers/SignInPage";
import { Box } from "@chakra-ui/react";
import Dashboard from "./containers/Dashboard";
import Leaves from "./containers/Leaves";
import ReviewRegistrationReq from "./containers/ReviewRegistrationReq";
import ReviewLeaves from "./containers/ReviewLeaves";
import TimeSheets from "./containers/TimeSheets";
import ReviewTimeSheets from "./containers/ReviewTimeSheets";
import Schedules from "./containers/Schedules";
import ReviewSchedules from "./containers/ReviewSchedules";

const App: React.FC = () => {
  return (
    <Box p={4}>
      <Router>
        <Dashboard />
        <Routes>
          <Route path="/signIn" element={<SignInContainer />} />{" "}
          <Route path="/leaves" element={<Leaves />} />{" "}
          <Route
            path="/review-registrations"
            element={<ReviewRegistrationReq />}
          />{" "}
          <Route path="/review-leaves" element={<ReviewLeaves />} />{" "}
          <Route path="/timesheets" element={<TimeSheets />} />
          <Route path="/review-timesheets" element={<ReviewTimeSheets />} />
          <Route path="/schedules" element={<Schedules />} />
          <Route path="/review-schedules" element={<ReviewSchedules />} />
        </Routes>
      </Router>
    </Box>
  );
};

export default App;

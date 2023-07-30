import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignInContainer from "./containers/SignInPage";
import { Box } from "@chakra-ui/react";
import Dashboard from "./containers/Dashboard";
import Leaves from "./containers/Dashboard/Leaves";
import ReviewRegistrationReq from "./containers/ReviewRegistrationReq";

const App: React.FC = () => {
  return (
    <Box p={4}>
      <Router>
        <Dashboard />
        <Routes>
          <Route path="/signIn" element={<SignInContainer />} />{" "}
          <Route path="/leaves" element={<Leaves />} />{" "}
          <Route path="/review-registrations" element={<ReviewRegistrationReq />} />{" "}
        </Routes>
      </Router>
    </Box>
  );
};

export default App;

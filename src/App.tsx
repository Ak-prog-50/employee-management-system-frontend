import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignInContainer from "./containers/SignInPage";
import { Box } from "@chakra-ui/react";
import Dashboard from "./containers/Dashboard";
import Leaves from "./containers/Dashboard/Leaves";

const App: React.FC = () => {
  return (
    <Box p={4}>
      <Router>
        <Dashboard />
        <Routes>
          <Route path="/signIn" element={<SignInContainer />} />{" "}
          <Route path="/leaves" element={<Leaves />} />{" "}
        </Routes>
      </Router>
    </Box>
  );
};

export default App;

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SignInContainer from "./containers/SignInPage";
import { Box } from "@chakra-ui/react";
import Dashboard from "./containers/Dashboard";

const App: React.FC = () => {
  return (
    <Box p={4}>
      <Router>
        <nav>
          <ul>
            {/* <li>
              <Link to="/signIn">Sign In</Link>
            </li> */}
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/signIn" element={<SignInContainer />} />{" "}
        </Routes>
      </Router>
    </Box>
  );
};

export default App;

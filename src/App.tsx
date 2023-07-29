import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginContainer from "./containers/LoginPage";
import RegisterContainer from "./containers/RegisterPage";

const App: React.FC = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/login" element={<LoginContainer />} />
        <Route path="/register" element={<RegisterContainer />} />
      </Routes>
    </Router>
  );
};

export default App;

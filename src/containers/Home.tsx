import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const isLoggedIn = false;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/signIn");
    }
  }, [isLoggedIn, navigate]);

  return <p>Welcome</p>;
};

export default Home;

import React from "react";
import { Box } from "@chakra-ui/react";
import SignInForm from "../components/SignInForm";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

const SignInContainer: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = async (loginDetails: {
    email: string;
    password: string;
  }) => {
    try {
      const response = await fetch(`${BACKEND_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(loginDetails),
      });

      const data = await response.json();

      if (response.ok) {
        const user = {
          empId: data.data.empId,
          name: data.data.name,
          contactNo: data.data.contactNo,
          email: data.data.email,
          designation: data.data.designation,
          address: data.data.address,
          dob: data.data.dob,
          appDate: data.data.appDate,
          role: data.data.role,
          // entitLeaves: data.data.entitLeaves,
          // takenLeaves: data.data.takenLeaves,
          // leavesBalances: {
          //   casual: data.data.casualLeavesBalance,
          //   annual: data.data.annualLeavesBalance,
          //   sick: data.data.sickLeavesBalance,
          //   duty: data.data.dutyLeavesBalance,
          // },
        };

        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
      } else {
        const errorData = JSON.parse(data.message);

        if (errorData.message === "Incorrect email!") {
          alert("Incorrect email");
        } else if (errorData.message === "Incorrect password!") {
          alert("Incorrect password");
        } else {
          alert("Login failed due to an error");
        }
      }
    } catch (error) {
      console.error("login failed", error);
      alert("Login failed");
    }
  };

  interface RegistrantDetails {
    firstName: string;
    lastName: string;
    contactNo: string;
    email: string;
    designation: string;
    address: string;
    dob: string;
    appDate: string;
  }

  const handleRegistration = async (regDetails: RegistrantDetails) => {
    try {
      const response = await fetch(`${BACKEND_URL}/user/create-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          empIdOfCaller: null,
          registrantDetails: {
            ...regDetails,
            name: `${regDetails.firstName} ${regDetails.lastName}`,
          },
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration Request Sent! Please wait for approval.");
      } else {
        // Registration failed, handle error cases
        alert(data.message);
      }
    } catch (error) {
      console.error("Registration failed due to an error", error);
      alert("Registration failed");
    }
  };

  return (
    <Box>
      {/* <Heading as="h1" size="xl" mb={4}>
        Micro Credit Investments
      </Heading> */}
      <SignInForm
        onSubmit={{
          handleLogin: handleLogin,
          handleReg: handleRegistration,
        }}
      />
    </Box>
  );
};

export default SignInContainer;

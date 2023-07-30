import { UseToastOptions } from "@chakra-ui/react";

export const toastAlertErr = (message: string): UseToastOptions => {
  return {
    title: "Error",
    description: message,
    status: "error",
    duration: 5000,
    isClosable: true,
    position: "top-right",
  };
};

export const toastAlertSuccess = (message: string): UseToastOptions => {
  return {
    title: "Success",
    description: message,
    status: "success",
    duration: 5000,
    isClosable: true,
    position: "top-right",
  };
};

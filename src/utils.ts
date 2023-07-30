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

// Helper function to convert a string to an ArrayBuffer
export const s2ab = (s: any) => {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < s.length; i++) {
    view[i] = s.charCodeAt(i) & 0xff;
  }
  return buf;
};

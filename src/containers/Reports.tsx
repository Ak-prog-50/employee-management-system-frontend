import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  useToast,
} from "@chakra-ui/react";
import { AiOutlineDownload } from "react-icons/ai";
import { BACKEND_URL } from "../config";
import { utils, write } from "xlsx";
import { s2ab } from "../utils";

const Reports: React.FC = () => {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  // Function to fetch target reports for the user
  const fetchReports = async () => {
    try {
      const user = localStorage.getItem("user");
      const parsedUser = user ? JSON.parse(user) : null;
      if (!parsedUser) {
        throw new Error("User not logged in");
      }

      const response = await fetch(
        `${BACKEND_URL}/target-report/${parsedUser.empId}`,
        {
          credentials: "include",
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setReports(data);
      setLoading(false);
    } catch (error: any) {
      console.error("Error fetching reports:", error);
      toast({
        title: "Error",
        description: error?.message || "Failed to fetch reports.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // Function to download the target report as Excel
  const handleDownload = () => {
    if (reports.length === 0) {
      toast({
        title: "Error",
        description: "No reports available to download.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    // Create a new workbook and worksheet
    const wb = utils.book_new();
    const ws = utils.json_to_sheet(reports);

    // Add the worksheet to the workbook
    utils.book_append_sheet(wb, ws, "TargetReports");

    // Convert the workbook to a binary string
    const wbout = write(wb, { bookType: "xlsx", type: "binary" });

    // Convert the binary string to a Blob
    const blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });

    // Create a download link and trigger the file download
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "target_reports.xlsx";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };  

  return (
    <Box p={4}>
      <Table variant="striped" colorScheme="teal" size="sm">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Employee ID</Th>
            <Th>Collected Amount</Th>
            <Th>Scheduled Amount</Th>
            <Th>Target Coverage Percentage</Th>
          </Tr>
        </Thead>
        <Tbody>
          {loading ? (
            <Tr>
              <Td colSpan={5} textAlign="center">
                Loading...
              </Td>
            </Tr>
          ) : reports.length === 0 ? (
            <Tr>
              <Td colSpan={5} textAlign="center">
                No reports found.
              </Td>
            </Tr>
          ) : (
            reports.map((report, index) => (
              <Tr key={index}>
                <Td>{report.targetId}</Td>
                <Td>{report.empId}</Td>
                <Td>{report.collectedAmount}</Td>
                <Td>{report.scheduledAmount}</Td>
                <Td>{report.targetCoveragePercentage}</Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
      <Box mt={4}>
        <Button
          colorScheme="teal"
          variant="outline"
          onClick={handleDownload}
          leftIcon={<AiOutlineDownload />}
        >
          Download Reports
        </Button>
      </Box>
    </Box>
  );
};

export default Reports;

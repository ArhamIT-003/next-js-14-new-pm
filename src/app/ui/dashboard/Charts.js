import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Spinner } from "@nextui-org/react";

// Custom theme
const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#f50057" },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
  components: {
    MuiPieChart: {
      styleOverrides: {
        root: {
          backgroundColor: "#f0f0f0", // Chart background
        },
        slice: {
          stroke: "#fff", // Slice border
          strokeWidth: 1,
        },
        label: {
          fill: "#333", // Label text color
          fontSize: 14,
        },
      },
    },
  },
});

export default function BasicPie({ projects, loading }) {
  const stateCounts =
    projects?.reduce((counts, project) => {
      const state = project.state;
      counts[state] = (counts[state] || 0) + 1;
      return counts;
    }, {}) || {};

  const pieChartData = Object.entries(stateCounts).map(
    ([label, value], id) => ({
      id,
      value,
      label: label.charAt(0).toUpperCase() + label.slice(1),
    })
  );

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (pieChartData.length == 0) {
    return (
      <div className="text-black rounded-md bg-[#85c3b3]  min-h-80 flex justify-center items-center">
        <p className="font-bold">No charts available / work assigned</p>
      </div>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      {pieChartData.length > 0 && (
        <div className="bg-[#85c3b3] flex flex-col justify-center items-center my-8 rounded-xl">
          <h1 className="text-xl font-bold text-black py-4 px-2">
            Visualizations of current assigned tasks
          </h1>
          <PieChart
            series={[
              {
                data: pieChartData,
                innerRadius: 30,
                outerRadius: 80,
                paddingAngle: 10,
                cornerRadius: 5,
                cx: 100,
                cy: 100,
                color: "#fff",
                // Optional: Add color scale for dynamic slice colors
                colorScale: ["#ff9800", "#4caf50", "#2196f3"],
              },
            ]}
            width={400}
            height={200}
            sx={{
              // Additional styling using sx prop
              ".MuiPieChart-root": {
                borderRadius: 8,
              },
              ".MuiPieChart-legend": {
                fontSize: 12, // Customize legend font size
                margin: "16px 0",
              },
              // ... other styles as needed
            }}
          />
        </div>
      )}
    </ThemeProvider>
  );
}

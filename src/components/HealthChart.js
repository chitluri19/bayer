import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const HealthChart = ({ records }) => {
  // Sort records by timestamp
  const sorted = [...records].sort((a, b) =>
    a.timestamp?.seconds - b.timestamp?.seconds
  );

  const labels = sorted.map((r) =>
    r.timestamp?.toDate ? new Date(r.timestamp.toDate()).toLocaleDateString() : "N/A"
  );

  const sugarData = sorted.map((r) => Number(r.sugar));
  const weightData = sorted.map((r) => Number(r.weight));
  const heightData = sorted.map((r) => Number(r.height));

  const data = {
    labels,
    datasets: [
      {
        label: "Sugar",
        data: sugarData,
        borderColor: "#f87171",
        backgroundColor: "rgba(248,113,113,0.2)",
      },
      {
        label: "Weight",
        data: weightData,
        borderColor: "#60a5fa",
        backgroundColor: "rgba(96,165,250,0.2)",
      },
      {
        label: "Height",
        data: heightData,
        borderColor: "#34d399",
        backgroundColor: "rgba(52,211,153,0.2)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Health Data Over Time",
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default HealthChart;

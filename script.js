import {
  Chart,
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "https://cdn.skypack.dev/chart.js";

Chart.register(
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

/** @type {CanvasRenderingContext2D} */
const ctx = document.getElementById("chart").getContext("2d");

const lineData = [
  8, 8, 8, 8, 8, 8, 8, 8, 8, 30, 26, 31, 87, 68, 22, 22, 9, 9, 9, 9, 9, 9,
];
const keyedData = lineData.map((y, i) => {
  const minute = i * 5;
  const time = `${5 + Math.floor(minute / 60)}:${(minute % 60)
    .toString()
    .padStart(2, "0")}`;
  return { x: time, y };
});

const data = {
  datasets: [
    {
      label: "Vibration Strength",
      data: keyedData,
      borderColor: "#44739e",
      borderWidth: 10,
      fill: false,
      stepped: true,
    },
  ],
};

const chart = new Chart(ctx, {
  type: "line",
  data: data,
  options: {
    responsive: true,
    // maintainAspectRatio: false,
    aspectRatio: innerWidth / innerHeight,
    scales: {
      x: {
        display: true,
        title: {
          display: true,
        },
      },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
  },
});

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

for (let i = 8; i < lineData.length; i++) {
  data.datasets[0].data = keyedData.slice(0, i);
  chart.update();
  await delay(500);
}

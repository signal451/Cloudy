export const lineLegends = [
  { title: "Төлбөр төлсөн", color: "bg-teal-600" },
  { title: "Энгийн", color: "bg-purple-600" },
]

export const barLegends = [
  { title: "Shoes", color: "bg-purple-600" },
  { title: "Bags", color: "bg-purple-600" },
]

export const lineOptions = {
  data: {
    labels: [
      "2023-04-19",
      "2023-04-20",
      "2023-04-22",
      "2023-04-23",
      "2023-04-24",
      "2023-04-25",
      "2023-04-25",
    ],
    datasets: [
      {
        label: "Free",
        /**
         * These colors come from Tailwind CSS palette
         * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
         */
        backgroundColor: "#0694a2",
        borderColor: "#0694a2",
        data: [43, 48, 40, 54, 67, 73, 70],
        fill: false,
      },
      {
        label: "Free",
        fill: false,
        /**
         * These colors come from Tailwind CSS palette
         * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
         */
        backgroundColor: "#7e3af2",
        borderColor: "#7e3af2",
        data: [24, 50, 64, 74, 52, 51, 65],
      },
    ],
  },
  options: {
    responsive: true,
    tooltips: {
      mode: "index",
      intersect: false,
    },
    hover: {
      mode: "nearest",
      intersect: true,
    },
    scales: {
      x: {
        display: true,
        scaleLabel: {
          display: true,
          labelString: "Month",
        },
      },
      y: {
        display: true,
        scaleLabel: {
          display: true,
          labelString: "Value",
        },
      },
    },
  },
  legend: {
    display: false,
  },
}

export const barOptions = {
  data: {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Shoes",
        backgroundColor: "#7e3af2",
        // borderColor: window.chartColors.red,
        borderWidth: 1,
        data: [3000, 10000, 25000, 50000, 68000, 70000, 85000],
      },
    ],
  },
  options: {
    responsive: true,
  },
  legend: {
    display: false,
  },
}

export const viewBarOptions = {
  data: {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Shoes",
        backgroundColor: "#7e3af2",
        // borderColor: window.chartColors.red,
        borderWidth: 1,
        data: [100, 500, 300, 150, 200],
      },
    ],
  },
  options: {
    responsive: true,
  },
  legend: {
    display: false,
  },
}

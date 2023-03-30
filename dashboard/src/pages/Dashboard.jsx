import PageTitle from "../components/Typography/Pagetitle"
import {
  CategoryScale,
  Chart,
  LinearScale,
  ArcElement,
  LineElement,
  PointElement,
  BarElement,
} from "chart.js"

import { Line, Bar } from "react-chartjs-2"
import ChartCard from "../components/Chart/ChartCard"
import ChartLegend from "../components/Chart/Chartlegend"
import {
  barOptions,
  lineOptions,
  barLegends,
  lineLegends,
} from "../utils/chartData"

Chart.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  LinearScale,
  LineElement,
  PointElement
)

function Dashboard() {
  return (
    <>
      <PageTitle> Үндсэн самбар </PageTitle>
      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <ChartCard title="Орлого">
          <Bar {...barOptions} />
        </ChartCard>
        <ChartCard title="Контент үзэлт">
          <Line {...lineOptions} />
          <ChartLegend legends={lineLegends} />
        </ChartCard>
      </div>
    </>
  )
}

export default Dashboard

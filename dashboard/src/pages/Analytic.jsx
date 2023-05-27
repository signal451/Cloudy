import React, { useState } from "react"
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
import { lineOptions } from "../utils/chartData"

Chart.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  LinearScale,
  LineElement,
  PointElement
)

const Analytic = () => {
  return (
    <>
      <PageTitle> Контент аналитик </PageTitle>
      <div className="mt-5 rounded-md bg-darCard">
        <div className="w-3/4 margin">
          <div className="grid gap-6 mb-8">
            <ChartCard title="Контент үзэлт">
              <Line {...lineOptions} />
            </ChartCard>
          </div>
        </div>
      </div>
    </>
  )
}

export default Analytic

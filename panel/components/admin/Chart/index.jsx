import {Line, defaults} from "react-chartjs-2"
import moment from "jalali-moment"
import {useRouter} from "next/router"
import {useContext} from "react"
import {TranslationContext} from "~/app/Context"

defaults.font.family = "vazir"

const options = {
  scales: {
    yAxes: [
      {
        type: 'linear',
        display: true,
        position: 'right',
        id: 'y-axis-1',
      },
    ],
  }
}

export default function Chart({ data }) {
  const translation = useContext(TranslationContext)

  if (!data)
    data = []

  const router = useRouter()

  moment.locale(router.locale)

  const dataLabels = {
    labels: [],
    datasets: [
      {
        label: translation("price"),
        data: [],
        fill: false,
        backgroundColor: '#4361EE',
        borderColor: 'rgba(54, 162, 235, 0.2)',
        yAxisID: 'y-axis-1',
      },
    ],
  }

  data.forEach(item => {
    dataLabels.labels.push(moment(parseInt(item.createdAt, 10)).format("MM/DD"))
    dataLabels.datasets[0].data.push(item.price)
  })

  return (
    // <div>
      <Line options={{
        font: "vazir",
        locale: "fa",
      }} data={dataLabels} />
    // </div>
  )
}

Chart.defaultProps = {
  data: []
}
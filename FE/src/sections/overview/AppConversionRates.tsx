import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

import { fNumber } from 'src/utils/formatNumber';

import Chart, { useChart } from 'src/components/chart';

// Assuming 'chart' is an object with 'colors', 'series', and 'options' properties
interface ChartProps {
  colors: string[];
  series: { value: number; label: string }[];
  options: object;
}

interface AppConversionRatesProps {
  title: string;
  subheader: string;
  chart: ChartProps;
}

// ----------------------------------------------------------------------

export default function AppConversionRates({ title, subheader, chart, ...other }: AppConversionRatesProps) {
  const { colors, series, options } = chart;

  const chartSeries = series.map((i) => i.value);

  const chartOptions = useChart({
    colors,
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (value) => fNumber(value),
        title: {
          formatter: () => '',
        },
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '28%',
        borderRadius: 2,
      },
    },
    xaxis: {
      categories: series.map((i) => i.label),
    },
    ...options,
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ mx: 3 }}>
        <Chart
          dir="ltr"
          type="bar"
          series={[{ data: chartSeries }]}
          options={chartOptions}
          width="100%"
          height={364}
        />
      </Box>
    </Card>
  );
}

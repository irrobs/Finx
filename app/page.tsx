import { Box, Stack } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import CurrencyDisplay from "./_components/CurrencyDisplay";
import ChartNavigation from "./_components/ChartNavigation";
import { AttachMoney, TrendingDown, TrendingUp } from "@mui/icons-material";

export default function Home() {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 4fr",
        gridTemplateRows: "min-content",
        border: "1px solid#cfe8fc",
        width: "100%",
      }}
    >
      <ChartNavigation />
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
        }}
      >
        <CurrencyDisplay
          text="Saldo atual"
          color="primary.main"
          currencyAmount={3000}
        >
          <AttachMoney sx={{ gridRow: "span 2", fontSize: "36px" }} />
        </CurrencyDisplay>
        <CurrencyDisplay
          text="Receita"
          color="success.main"
          currencyAmount={3000}
        >
          <TrendingUp sx={{ gridRow: "span 2", fontSize: "36px" }} />
        </CurrencyDisplay>
        <CurrencyDisplay
          text="Despesas"
          color="error.main"
          currencyAmount={3000}
        >
          <TrendingDown sx={{ gridRow: "span 2", fontSize: "36px" }} />
        </CurrencyDisplay>
      </Stack>
      <LineChart
        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
        series={[
          {
            data: [2, 5.5, 2, 8.5, 1.5, 5],
          },
        ]}
        height={300}
      />
    </Box>
  );
}

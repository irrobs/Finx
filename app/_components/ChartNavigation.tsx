import { Tab, Tabs } from "@mui/material";

export default function ChartNavigation() {
  return (
    <Tabs
      orientation="vertical"
      value="2"
      textColor="primary"
      indicatorColor="primary"
      sx={{ width: "10vw", gridRow: "span 2", border: "1px solid#cfe8fc" }}
    >
      <Tab label="Hoje" value="hoje" />
      <Tab label="1 dia" value="1" />
      <Tab label="7 dias" value="2" />
      <Tab label="14 dias" value="3" />
      <Tab label="30 dias" value="4" />
      <Tab label="90 dias" value="5" />
      <Tab label="6 meses" value="6" />
      <Tab label="1 ano" value="7" />
    </Tabs>
  );
}

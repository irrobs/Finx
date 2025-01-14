import { Box, Tab, Tabs } from "@mui/material";

export default function Home() {
  return (
    <Box sx={{ border: "1px solid#cfe8fc", minHeight: "100vh" }}>
      <Tabs
        orientation="vertical"
        value="2"
        textColor="primary"
        indicatorColor="primary"
        sx={{ width: "10vw" }}
      >
        <Tab label="Hoje" value="hoje" />
        <Tab label="1 dia" value="1" />
        <Tab label="7 dias" value="2" />
      </Tabs>
    </Box>
  );
}

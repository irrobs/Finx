"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#b7daf2",
      main: "#5dade2",
      dark: "#007fce",
      contrastText: "#fff",
    },
    success: {
      main: "#59CB1C",
    },
    error: {
      main: "#CB451C",
    },
  },
});

export default theme;

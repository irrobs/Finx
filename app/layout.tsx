import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import {
  Avatar,
  Box,
  Container,
  CssBaseline,
  ThemeProvider,
  Typography,
} from "@mui/material";
import theme from "./theme";
import Sidebar from "./_components/Sidebar";
import { KeyboardArrowDown } from "@mui/icons-material";

export const metadata: Metadata = {
  title: "Finx",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ display: "flex", position: "relative" }}>
              <Sidebar />
              <Container maxWidth="xl">{children}</Container>

              <Box
                sx={{
                  position: "absolute",
                  top: 12,
                  right: 36,
                  width: 96,
                }}
              >
                <Avatar
                  src="invalid-url.jpg"
                  sx={{
                    width: 48,
                    height: 48,
                    bgcolor: "primary.main",
                    m: "0 auto",
                  }}
                />
                <Typography
                  variant="body1"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "primary.main",
                  }}
                >
                  Matheus <KeyboardArrowDown />
                </Typography>
              </Box>
            </Box>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

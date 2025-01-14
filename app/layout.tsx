import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Box, Container, CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";
import Sidebar from "@/app/_components/Sidebar";
import User from "@/app/_components/User";

export const metadata: Metadata = {
  title: "Finx",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ display: "flex", position: "relative" }}>
              <Sidebar />
              <Container maxWidth="xl" sx={{ pt: "5rem" }}>
                {children}
              </Container>
              <User />
            </Box>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

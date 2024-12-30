import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { CssBaseline, Stack, ThemeProvider } from "@mui/material";
import theme from "./theme";
import Link from "next/link";

import SsidChartRoundedIcon from "@mui/icons-material/SsidChartRounded";
import LocalAtmRoundedIcon from "@mui/icons-material/LocalAtmRounded";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";

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
            <Stack sx={{ bgcolor: "primary.main", width: 100 }}>
              <img src="/logo.svg" alt="Logo do Finx" />
              <Link href="">
                <SsidChartRoundedIcon />
              </Link>
              <Link href="">
                <LocalAtmRoundedIcon />
              </Link>
              <Link href="">
                <FlagRoundedIcon />
              </Link>
              <Link href="">
                <AccountBalanceRoundedIcon />
              </Link>
              <Link href="">
                <SettingsRoundedIcon />
              </Link>
              <Link href="">
                <HelpOutlineRoundedIcon />
              </Link>
            </Stack>
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

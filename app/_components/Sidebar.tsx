import React from "react";
import Link from "next/link";
import SsidChartRoundedIcon from "@mui/icons-material/SsidChartRounded";
import LocalAtmRoundedIcon from "@mui/icons-material/LocalAtmRounded";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import Image from "next/image";
import { Stack } from "@mui/material";

const routes = [
  { path: "/", icon: <SsidChartRoundedIcon /> },
  {
    path: "/transacoes",
    icon: <LocalAtmRoundedIcon />,
  },
  { path: "#", icon: <FlagRoundedIcon /> },
  {
    path: "#",
    icon: <AccountBalanceRoundedIcon />,
  },
  {
    path: "#",
    icon: <SettingsRoundedIcon />,
  },
];
const iconStyles = { width: 40, height: 40, color: "primary.contrastText" };

export default function Sidebar() {
  return (
    <Stack
      sx={{
        position: "fixed",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        bgcolor: "primary.main",
        width: 80,
        height: "100vh",
        p: 1,
      }}
    >
      <Image src="/logo.svg" width={60} height={60} alt="Logo do Finx" />
      <Stack
        sx={{
          mt: 5,
          height: 1,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {routes.map((route, index) => (
          <Link href={route.path} passHref key={index}>
            {React.cloneElement(route.icon, { sx: iconStyles })}
          </Link>
        ))}
      </Stack>
      <Link href="#" passHref>
        <HelpOutlineRoundedIcon
          sx={{
            width: 40,
            height: 40,
            color: "primary.contrastText",
            mt: "auto",
          }}
        />
      </Link>
    </Stack>
  );
}

import { Box, Typography } from "@mui/material";
import React from "react";

type currencyDisplayType = {
  children: React.ReactNode;
  text: string;
  color: string;
  currencyAmount: number;
};

export default function CurrencyDisplay({
  children,
  text,
  color,
  currencyAmount,
}: currencyDisplayType) {
  return (
    <Box
      sx={{
        display: "grid",
        columnGap: "10px",
        gridTemplateColumns: "2fr 1fr",
        alignItems: "center",
      }}
    >
      <Typography sx={{ fontSize: "24px" }}>{text}</Typography>

      {children}
      <Typography sx={{ fontSize: "24px" }} color={color}>
        R$ {currencyAmount},00
      </Typography>
    </Box>
  );
}

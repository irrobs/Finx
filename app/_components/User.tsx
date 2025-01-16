import { KeyboardArrowDown } from "@mui/icons-material";
import { Avatar, Box, Typography } from "@mui/material";

export default function User() {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 12,
        right: 36,
        width: 96,
      }}
    >
      <Avatar
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
  );
}

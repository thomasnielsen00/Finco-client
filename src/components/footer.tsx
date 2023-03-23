import { Link, Typography, Container, Divider } from "@mui/material";
import React from "react";

export default function Footer() {
  return (
    <Container maxWidth="lg">
      <Divider />
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{ p: 2 }}
      >
        {"Copyright © "}
        <Link color="inherit" href="https://www.finco.no/">
          Finco
        </Link>
        {" 2023 | All Rights Reserved"}
      </Typography>
    </Container>
  );
}

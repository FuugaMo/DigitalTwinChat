import React, { useState } from "react";
import { Container, Typography, TextField, Button } from "@mui/material";
import { MAX_CONNECT_ID_LENGTH } from "../config/config";

function LoginPage(props) {
  const [connectId, setConnectId] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginSubmit = () => {
    props.handleLogin(connectId.trim(), password.trim());
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: props.BACKGROUND_COLOR,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 4,
        }}
      >
        <Typography
          variant="h2"
          align="center"
          sx={{ marginBottom: 4, fontSize: "1rem" }}
        >
          Please enter your Connect ID and the password provided on the survey
          page
        </Typography>

        <TextField
          fullWidth
          label="Connect ID"
          variant="outlined"
          value={connectId}
          onChange={(e) => setConnectId(e.target.value)}
          sx={{ marginBottom: 4 }}
          inputProps={{ maxLength: MAX_CONNECT_ID_LENGTH }}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ marginBottom: 4 }}
        />

        <Button
          fullWidth
          variant="contained"
          onClick={handleLoginSubmit}
          sx={{ marginTop: 0 }}
        >
          Login
        </Button>
      </Container>
    </div>
  );
}

export default LoginPage;

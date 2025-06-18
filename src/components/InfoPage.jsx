import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Avatar,
  CssBaseline,
  Paper,
  ThemeProvider,
  useTheme,
} from "@mui/material";

import {
  PRIMARY_COLOR,
  ON_PRIMARY_COLOR,
  PRIMARY_CONTAINER,
  ON_PRIMARY_CONTAINER,
  BACKGROUND_COLOR,
} from "../constants/colorScheme";

// import { TWIN_CODE } from "../config/config";

export default function InfoPage({ handleInfoSubmit, isTwin }) {
  const theme = useTheme();

  const [name, setName] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const MAX_SIZE_MB = 10;

  const handleAvatarChange = (e) => {
    setErrorMsg("");
    setLoading(true);
    const file = e.target.files[0];
    if (file) {
      if (file.size > MAX_SIZE_MB * 1024 * 1724) {
        setLoading(false);
        setErrorMsg(`The size of the picture cannot exceed ${MAX_SIZE_MB}MB.`);
        setAvatarFile(null);
        setPreviewURL("");
        return;
      }
      setAvatarFile(file);
      setPreviewURL(URL.createObjectURL(file));
    }
    setLoading(false);
  };

  const handleSubmit = () => {
    setLoading(true);
    if (!name) {
      setLoading(false);
      alert("Please enter name.");
      return;
    }
    if (!!isTwin && !avatarFile) {
      setLoading(false);
      // 只有TWIN组需要上传头像
      alert("Please upload an avatar, and the size should not exceed 10MB.");
      return;
    }
    setLoading(false);
    handleInfoSubmit(name, avatarFile);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: theme.palette.background.default,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {loading && (
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 9999,
              backgroundColor: "rgba(255,255,255,0.6)",
              padding: 4,
              borderRadius: 4,
            }}
          >
            <CircularProgress />
          </Box>
        )}
        <Container maxWidth="xs" sx={{ padding: 4 }}>
          <Paper
            elevation={3}
            sx={{
              width: "100%",
              padding: 6,
              borderRadius: 20,
              backgroundColor: PRIMARY_CONTAINER,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h2" align="center" sx={{ mb: 2 }}>
              Profile Setup
            </Typography>

            <Typography
              variant="body2"
              color="textSecondary"
              align="center"
              sx={{ mb: 4, px: 2 }}
            >
              Please upload the profile picture and name you use on messenging
              apps (e.g., WhatsApp). We will keep your information confidential.
            </Typography>

            {!!isTwin && (
              <>
                <input
                  accept="image/*"
                  type="file"
                  onChange={handleAvatarChange}
                  id="avatar-upload"
                  style={{ display: "none" }}
                />
                <label
                  htmlFor="avatar-upload"
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    src={previewURL}
                    sx={{ width: 80, height: 80, mb: 2 }}
                  />
                  <Typography variant="body2" color="textSecondary">
                    Click to upload your profile picture
                  </Typography>
                </label>
                {errorMsg && (
                  <Typography variant="body2" color="error" sx={{ mb: 1 }}>
                    {errorMsg}
                  </Typography>
                )}{" "}
              </>
            )}

            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ my: 3 }}
            />

            <Button
              fullWidth
              variant="contained"
              onClick={handleSubmit}
              disabled={!name || (isTwin && !avatarFile) || !!errorMsg}
              sx={{ mt: 2 }}
            >
              Enter Chat Room
            </Button>
          </Paper>
        </Container>
      </div>
    </ThemeProvider>
  );
}

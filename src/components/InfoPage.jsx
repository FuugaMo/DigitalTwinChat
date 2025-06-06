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

import { TWIN_CODE } from "../config/config";

export default function InfoPage({ handleInfoSubmit, isTwin }) {
  const theme = useTheme();

  const [name, setName] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const MAX_SIZE_MB = 10;
  const handleAvatarChange = (e) => {
    setErrorMsg("");
    const file = e.target.files[0];
    if (file) {
      if (file.size > MAX_SIZE_MB * 1024 * 1724) {
        setErrorMsg(`图片大小不能超过 ${MAX_SIZE_MB}MB`);
        setAvatarFile(null);
        setPreviewURL("");
        return;
      }
      setAvatarFile(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    if (!name) {
      alert("请输入昵称");
      return;
    }
    if (!!isTwin && !avatarFile) {
      // 只有TWIN组需要上传头像
      alert("请上传头像，且大小不能超过10MB");
      return;
    }
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
            <Typography variant="h2" align="center" sx={{ mb: 4 }}>
              Upload your info
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
                    Click to upload your avatar
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

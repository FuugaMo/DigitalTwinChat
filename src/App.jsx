import "./styles/App.css";
import ChatWindow from "./components/ChatWindow";
import LoginPage from "./components/LoginPage";
import InfoPage from "./components/InfoPage";
import AdminPage from "./components/AdminPage";
import { useState } from "react";
import { AuthContext } from "./contexts/contexts";
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  Box,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";

// Material 3 配色方案
import {
  PRIMARY_COLOR,
  ON_PRIMARY_COLOR,
  PRIMARY_CONTAINER,
  ON_PRIMARY_CONTAINER,
  BACKGROUND_COLOR,
  SURFACE,
} from "./constants/colorScheme";

import {
  firebaseConfig,
  PROSOCIAL_CODE,
  NON_PROSOCIAL_CODE,
  API_BASE,
  CONNECT_ID_LENGTH,
} from "./config/config";
// Firebase 初始化
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 创建 MUI 3 自定义主题
const theme = createTheme({
  palette: {
    primary: {
      main: PRIMARY_COLOR,
      contrastText: ON_PRIMARY_COLOR,
    },
    background: {
      default: SURFACE,
    },
    custom: {
      primaryContainer: PRIMARY_CONTAINER,
      onPrimaryContainer: ON_PRIMARY_CONTAINER,
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 12,
            borderColor: "#E0E0E0",
            "&:hover": {
              borderColor: PRIMARY_COLOR,
            },
            "&.Mui-focused": {
              borderColor: PRIMARY_COLOR,
              boxShadow: `0 0 0 2px ${PRIMARY_CONTAINER}`,
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          borderRadius: 16,
          textTransform: "none",
          fontWeight: 500,
          fontSize: 16,
          padding: "12px 24px",
        },
      },
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    h2: {
      fontSize: "1.5rem",
      fontWeight: 600,
      color: ON_PRIMARY_CONTAINER,
    },
    body1: {
      color: "#333",
    },
  },
});

export default function App() {
  const [connectId, setConnectId] = useState(""); // ID
  const [name, setName] = useState(""); // 昵称
  const [avatar, setAvatar] = useState(null); // 头像文件 or URL
  const [code, setCode] = useState(-1); // 以password输入code, 用于分类是Twin组还是Assistant组
  const [isTwin, setIsTwin] = useState(1); // 1 = Twin / 0 = Assistant / -1 = Admin
  const [prosocialStatus, setProsocialStatus] = useState(1); // 1 = Prosocial, 0 = Without, -1 = Anti-prosocial
  const [isReplayMode, setIsReplayMode] = useState(false);
  const [loading, setLoading] = useState(false);

  // 登录第一步：仅获取 ID
  async function handleLogin(id, enteredCode) {
    if (!id) {
      alert("Please enter ID");
      return;
    }

    setLoading(true);

    // 先请求后端判断是否管理员
    try {
      const res = await fetch(`${API_BASE}/verify-admin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      // console.log(data);
      if (data.success === true) {
        // 管理员直接登录，无需密码
        // console.log(`admin id ${id}`);
        setConnectId(id);
        setIsTwin(-1);
        return;
      }
    } catch (e) {
      alert("Interenet error. Please try agin later.");
      return;
    } finally {
      setLoading(false);
    }

    // if (id.endsWith("-A")) {
    //   const baseId = id.slice(0, -2);

    //   const userDoc = await getDoc(doc(db, "users", baseId));
    //   if (!userDoc.exists()) {
    //     alert(`Can't find user ${baseId}`);
    //     return;
    //   }

    //   const userData = userDoc.data();
    //   const isTwinUser = userData.isTwin === 1;
    //   const isProsocialUser =
    //     userData.prosocialStatus === 1
    //       ? 1
    //       : userData.prosocialStatus === -1
    //       ? -1
    //       : 0;

    //   // 校验 code 是否正确
    //   let expectedCode = null;

    //   if (isProsocialUser === 1) {
    //     expectedCode = PROSOCIAL_CODE;
    //   } else {
    //     expectedCode = NON_PROSOCIAL_CODE;
    //   }

    //   // isTwin needs to be fetched from firebase

    //   if (enteredCode !== expectedCode) {
    //     alert("Wrong password.");
    //     return;
    //   }

    //   setConnectId(id);
    //   setIsReplayMode(true);
    //   setIsTwin(isTwinUser ? 1 : 0);
    //   setProsocialStatus(isProsocialUser);

    //   if (userData.name && userData.avatar) {
    //     setName(userData.name);
    //     setAvatar(userData.avatar);
    //   } else {
    //     setName("");
    //     setAvatar(null);
    //   }
    //   return;
    // }

    if (id.length !== CONNECT_ID_LENGTH) {
      alert("Please input a valid connect ID");
      return;
    }

    const userDoc = await getDoc(doc(db, "users", id));

    if (userDoc.exists()) {
      const userData = userDoc.data();
      // 先检查数据库里的 isTwin
      const isTwinUser = userData.isTwin === 1;
      const isProsocialUser =
        userData.prosocialStatus === 1
          ? 1
          : userData.prosocialStatus === -1
          ? -1
          : 0;

      // 判断密码是否匹配(不再区分isTwin)
      let expectedCode = null;
      if (isProsocialUser === 1) {
        expectedCode = PROSOCIAL_CODE;
      } else {
        expectedCode = NON_PROSOCIAL_CODE;
      }

      if (enteredCode !== expectedCode) {
        alert("Wrong password.");
        return;
      }

      setIsTwin(1);
      setProsocialStatus(isProsocialUser);

      if (userData.name) {
        setName(userData.name);
        setAvatar(userData.avatar);
      } else {
        setName("");
        setAvatar(null);
      }

      // 判断是否进入 Replay 模式（回放）
      if (userData.isAssignCompleted === true) {
        setIsReplayMode(true);
      } else {
        setIsReplayMode(false);
      }
    } else {
      // 用户不存在，按输入密码确定组别，允许新建
      if (enteredCode === PROSOCIAL_CODE) {
        setProsocialStatus(1);
      } else if (enteredCode === NON_PROSOCIAL_CODE) {
        setProsocialStatus(-1);
      } else {
        alert("Wrong password.");
        return;
      }

      setIsTwin(1);
      setName("");
      setAvatar(null);
      setIsReplayMode(false);
    }
    setConnectId(id);
    setCode(enteredCode);
  }

  // 信息收集第二步：昵称 + 头像
  function handleInfoSubmit(name, avatar) {
    setName(name);
    setAvatar(avatar);
    // console.log(`App.js ${name}, ${avatar}`);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthContext.Provider value={connectId}>
        <div className="App">
          {loading ? (
            // 中心显示loading指示
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
              }}
            >
              <CircularProgress />
              <Typography variant="body1" sx={{ mt: 2 }}>
                Logging in...
                <br />
                This may take up to 1 minute.
              </Typography>
            </Box>
          ) : isTwin === -1 ? (
            <AdminPage
              logoutHandler={() => {
                setConnectId("");
                setName("");
                setAvatar(null);
                setCode(-1);
                setIsTwin(0);
                setProsocialStatus(0); // 无所谓
              }}
            />
          ) : connectId === "" ? (
            <LoginPage handleLogin={handleLogin} />
          ) : name === "" ? (
            <InfoPage handleInfoSubmit={handleInfoSubmit} isTwin={isTwin} />
          ) : (
            <ChatWindow
              userId={connectId}
              name={name}
              avatar={avatar}
              code={code}
              isTwin={isTwin}
              isReplayMode={isReplayMode}
              prosocialStatus={prosocialStatus}
              logoutHandler={() => {
                setConnectId("");
                setName("");
                setAvatar(null);
                setCode(-1);
                setIsTwin(1);
                setProsocialStatus(1);
                setIsReplayMode(false);
              }}
            />
          )}
        </div>
      </AuthContext.Provider>
    </ThemeProvider>
  );
}

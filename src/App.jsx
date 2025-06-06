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
  TWIN_CODE,
  ASSISTANT_CODE,
  API_BASE,
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
  const [isTwin, setIsTwin] = useState(0); // 1 = Twin / 0 = Assistant / -1 = Admin
  const [isReplayMode, setIsReplayMode] = useState(false);

  // 登录第一步：仅获取 ID
  async function handleLogin(id, enteredCode) {
    if (!id) {
      alert("Please enter ID");
      return;
    }

    // 先请求后端判断是否管理员
    try {
      const res = await fetch(`${API_BASE}/verify-admin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === true) {
        // 管理员直接登录，无需密码
        console.log(`admin id ${id}`);
        setConnectId(id);
        setIsTwin(-1);
        return;
      }
    } catch (e) {
      alert("网络错误，请稍后再试");
      return;
    }

    if (id.endsWith("-A")) {
      const baseId = id.slice(0, -2);

      const userDoc = await getDoc(doc(db, "users", baseId));
      if (!userDoc.exists()) {
        alert(`找不到用户 ${baseId}`);
        return;
      }

      const userData = userDoc.data();
      const isTwinUser = userData.isTwin === 1;

      if (
        (isTwinUser && enteredCode !== TWIN_CODE) ||
        (!isTwinUser && enteredCode !== ASSISTANT_CODE)
      ) {
        alert("密码错误。");
        return;
      }

      setConnectId(id);
      setIsReplayMode(true);
      setIsTwin(isTwinUser ? 1 : 0);

      if (userData.name && userData.avatar) {
        setName(userData.name);
        setAvatar(userData.avatar);
      } else {
        setName("");
        setAvatar(null);
      }
      return;
    }

    if (id.length !== 6) {
      alert("Please input a valid connect ID");
      return;
    }

    const userDoc = await getDoc(doc(db, "users", id));

    if (userDoc.exists()) {
      const userData = userDoc.data();
      // 先检查数据库里的 isTwin
      const isTwinUser = userData.isTwin === 1;

      // 根据数据库用户类别校验密码
      if (
        (isTwinUser && enteredCode !== TWIN_CODE) ||
        (!isTwinUser && enteredCode !== ASSISTANT_CODE)
      ) {
        alert("密码错误。");
        return;
      }

      setIsTwin(isTwinUser ? 1 : 0);

      if (userData.name) {
        setName(userData.name);
        setAvatar(userData.avatar);
      } else {
        setName("");
        setAvatar(null);
      }
    } else {
      // 用户不存在，按输入密码确定组别，允许新建
      if (enteredCode === TWIN_CODE) {
        setIsTwin(1);
      } else if (enteredCode === ASSISTANT_CODE) {
        setIsTwin(0);
      } else {
        alert("Wrong password. Please check again.");
        return;
      }
      setName("");
      setAvatar(null);
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
          {isTwin === -1 ? (
            <AdminPage
              logoutHandler={() => {
                setConnectId("");
                setName("");
                setAvatar(null);
                setCode(-1);
                setIsTwin(0);
              }}
            />
          ) : connectId.endsWith("-A") ? (
            <ChatWindow
              userId={connectId} // 这里的id已经是带-A的了
              name={name}
              avatar={avatar}
              code={code}
              isTwin={isTwin}
              isReplayMode={isReplayMode}
              logoutHandler={() => {
                setConnectId("");
                setName("");
                setAvatar(null);
                setCode(-1);
                setIsTwin(0);
                setIsReplayMode(false);
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
              logoutHandler={() => {
                setConnectId("");
                setName("");
                setAvatar(null);
                setCode(-1);
                setIsTwin(0);
                setIsReplayMode(false);
              }}
            />
          )}
        </div>
      </AuthContext.Provider>
    </ThemeProvider>
  );
}

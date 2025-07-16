import React, { useEffect, useRef, useState } from "react";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import CircularProgress from "@mui/material/CircularProgress";
import Skeleton from "@mui/material/Skeleton";
import LinearProgress from "@mui/material/LinearProgress";
import MessageInput from "./MessageInput";
import Message from "./Message.jsx";
import "../styles/MessageScreen.css";

function MessageScreen(props) {
  let [imagePath, setImagePath] = useState("placeholder.png");

  const messagesEndRef = useRef(null); // 创建了一个引用，指向了最后一条消息的 DOM 节点
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); // 让最后一条消息出现在可视区域内
  };

  const simpleBarRef = useRef(null); // 获取 simpleBar 组件实例。用于监听窗口是否在底部
  const [atBottom, setAtBottom] = useState(true);

  const handleScroll = () => {
    // 监听滚动事件是否在底部
    const scrollEl = simpleBarRef.current?.getScrollElement?.();
    if (!scrollEl) return;

    const isBottom =
      scrollEl.scrollHeight - scrollEl.clientHeight - scrollEl.scrollTop < 10;

    setAtBottom(isBottom);
  };

  useEffect(() => {
    if (!props.isReplayMode) {
      scrollToBottom(); // 正常聊天始终自动滚动
      return;
    }

    const scrollEl = simpleBarRef.current?.getScrollElement?.();
    if (!scrollEl || !atBottom) return;

    scrollEl.scrollTo({
      top: scrollEl.scrollHeight,
      behavior: "smooth",
    });
  }, [props.messages.length, props.typingByUser, props.displayTyping]);

  // console.log(`MessageScreen ${props.name}`);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      {/* <div className="messageImage">
        <img src={`/images/${imagePath}`} width="250" height="325" />
      </div> */}
      <div style={{ width: "90%", maxWidth: 2000, mainWidth: 600 }}>
        <div className="messageScreen">
          <SimpleBar
            style={{
              height: 400,
            }}
            onScrollCapture={handleScroll}
            ref={simpleBarRef}
          >
            <div className={"messageListWrapper"}>
              {props.loading ? (
                <CircularProgress />
              ) : (
                props.messages.map((msg) => (
                  <Message
                    message={msg}
                    key={msg.id}
                    name={props.name}
                    avatar={props.avatar}
                    isFPV={props.isFPV}
                    handleSubmitRating={props.handleSubmitRating}
                    displayImage={(path) => setImagePath(path)}
                  />
                ))
              )}
              <div ref={messagesEndRef} />
            </div>
            {props.displayTyping ? (
              <>
                {props.typingByUser ? (
                  // 用户打字（靠右）
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row-reverse",
                      alignItems: "center",
                      marginRight: "15px",
                    }}
                  >
                    {props.isFPV ? (
                      <Skeleton
                        animation="wave"
                        sx={{
                          bgcolor: "#EADDFF",
                          marginLeft: "10px",
                          transform: "scaleX(-1)",
                        }}
                        variant="circular"
                        height={40}
                        width={40}
                      />
                    ) : null}
                    <Skeleton
                      animation="wave"
                      sx={{
                        bgcolor: "#FFFFFF", // 用户气泡色（类似微信）
                        borderRadius: "20px",
                        transform: "scaleX(-1)",
                      }}
                      variant="rounded"
                      width={100}
                      height={40}
                    />
                  </div>
                ) : (
                  // Bot 打字（靠左）
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginLeft: "15px",
                    }}
                  >
                    <Skeleton
                      animation="wave"
                      sx={{ bgcolor: "#EADDFF" }}
                      variant="circular"
                      height={40}
                      width={40}
                    />
                    <Skeleton
                      animation="wave"
                      sx={{
                        bgcolor: "#ffffff",
                        marginLeft: "10px",
                        borderRadius: "20px",
                      }}
                      variant="rounded"
                      width={100}
                      height={40}
                    />
                  </div>
                )}
              </>
            ) : null}
          </SimpleBar>
        </div>
        <MessageInput
          addMessage={props.addMessage}
          blockUserMessages={props.blockUserMessages}
        />
      </div>
    </div>
  );
}

export default MessageScreen;

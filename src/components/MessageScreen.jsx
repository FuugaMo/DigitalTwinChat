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

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!props.isReplayMode) {
      scrollToBottom();
    }
  });

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
                    isTwin={props.isTwin}
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
                    {props.isTwin ? (
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

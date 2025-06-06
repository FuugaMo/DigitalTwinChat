import { useState } from "react";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { styled } from "@mui/material";
import "../styles/MessageInput.css";

const DisabledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "&.Mui-disabled ": {
      backgroundColor: "#FFCCCC",
    },
  },
});

function MessageInput(props) {
  const [text, setText] = useState("");

  const handleSend = async () => {
    if (text === "") {
      return;
    }
    props.addMessage(text);
    setText("");
  };

  const handleKey = (e) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      handleSend();
    }
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        {props.blockUserMessages ? (
          <DisabledTextField disabled fullWidth />
        ) : (
          <TextField
            disabled={props.blockUserMessages}
            fullWidth
            type="text"
            name=""
            id=""
            placeholder={
              props.blockUserMessages ? "Please wait..." : "Enter Message..."
            }
            onChange={(e) => setText(e.target.value)}
            value={text}
            onKeyDown={handleKey}
            className="messageInput messageInputField"
            // style={{ height: "30px" }}
          />
        )}
        <Button
          disabled={props.blockUserMessages}
          variant="contained"
          onClick={handleSend}
          className="messageInput messageInputSendButton"
        >
          Send
        </Button>
      </div>
    </>
  );
}

export default MessageInput;

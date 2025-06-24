import "../styles/Message.css";
import bot1logo from "../../static/icons/bot1logo.png";
import bot2logo from "../../static/icons/bot2logo.png";
import bot3logo from "../../static/icons/bot3logo.png";
import bot4logo from "../../static/icons/bot4logo.png";
import bot5logo from "../../static/icons/bot5logo.png";
import hostlogo from "../../static/icons/hostlogo.png";
// import assistantlogo from "../../static/icons/assistantlogo.png";
import EntityType from "../enums/EntityTypes";
import MessageType from "../enums/MessageTypes";

function MessageFromBot(props) {
  return (
    <div className="message messageReceived">
      <div className="messageReceivedAvatarWrapper">
        <img
          src={
            props.message.sender === EntityType.Bot1
              ? bot1logo
              : props.message.sender === EntityType.Bot2
              ? bot2logo
              : props.message.sender === EntityType.Bot3
              ? bot3logo
              : props.message.sender === EntityType.Bot4
              ? bot4logo
              : props.message.sender === EntityType.Bot5
              ? bot5logo
              : // : props.message.sender === EntityType.Assistant
                // ? assistantlogo // to-do：替换成助理头像吧
                hostlogo
          }
          alt={
            props.message.sender === EntityType.Bot1 ? "Chatbot 1" : "Chatbot 2"
          }
          className="messageReceivedAvatar"
        />
      </div>
      {props.message.type === MessageType.Image ? (
        <div className="messageImage">
          <img
            src={`/images/${props.message.content}`}
            width="250"
            height="250"
          />
        </div>
      ) : props.message.sender === EntityType.Host ? (
        <div className="messageText messageTextHost">
          <div
            className={`messageSenderName ${
              props.message.sender === EntityType.Bot1
                ? "messageSenderName1"
                : props.message.sender === EntityType.Bot2
                ? "messageSenderName2"
                : props.message.sender === EntityType.Bot3
                ? "messageSenderName3"
                : props.message.sender === EntityType.Bot4
                ? "messageSenderName4"
                : props.message.sender === EntityType.Bot5
                ? "messageSenderName5"
                : "messageSenderNameHost"
            }`}
          >
            {props.message.senderName}
          </div>
          <div>
            {typeof props.message.content === "function"
              ? props.message.content(props.name)
              : props.message.content}
          </div>
        </div>
      ) : (
        <div className="messageText messageTextReceived">
          <div
            className={`messageSenderName ${
              props.message.sender === EntityType.Bot1
                ? "messageSenderName1"
                : props.message.sender === EntityType.Bot2
                ? "messageSenderName2"
                : props.message.sender === EntityType.Bot3
                ? "messageSenderName3"
                : props.message.sender === EntityType.Bot4
                ? "messageSenderName4"
                : props.message.sender === EntityType.Bot5
                ? "messageSenderName5"
                : "messageSenderHost"
            }`}
          >
            {props.message.senderName}
          </div>
          <div>
            {typeof props.message.content === "function"
              ? props.message.content(props.name)
              : props.message.content}
          </div>
        </div>
      )}
    </div>
  );
}

export default MessageFromBot;

import "../styles/Message.css";
import bot1logo from "../../static/icons/bot1logo.png";
import bot2logo from "../../static/icons/bot2logo.png";
import bot3logo from "../../static/icons/bot3logo.png";
import bot4logo from "../../static/icons/bot4logo.png";
import bot5logo from "../../static/icons/bot5logo.png";
import hostlogo from "../../static/icons/hostlogo.jpg";
import EntityType from "../enums/EntityTypes";
import MessageType from "../enums/MessageTypes";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useState } from "react";

function MessageRatingSlider(props) {
  const [rating, setRating] = useState(5);

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
              : hostlogo
          }
          alt={
            props.message.sender === EntityType.Bot1 ? "Chatbot 1" : "Chatbot 2"
          }
          className="messageReceivedAvatar"
        />
      </div>
      {props.message.sender === EntityType.Host ? (
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
          <div className="messageRatingSlider">
            <ButtonGroup variant="outlined" aria-label="Basic button group">
              <Button onClick={() => props.handleSubmitRating(1)}>1</Button>
              <Button onClick={() => props.handleSubmitRating(2)}>2</Button>
              <Button onClick={() => props.handleSubmitRating(3)}>3</Button>
              <Button onClick={() => props.handleSubmitRating(4)}>4</Button>
              <Button onClick={() => props.handleSubmitRating(5)}>5</Button>
              <Button onClick={() => props.handleSubmitRating(6)}>6</Button>
              <Button onClick={() => props.handleSubmitRating(7)}>7</Button>
            </ButtonGroup>
            {/* <Button
              variant="contained"
              onClick={() => props.handleSubmitRating(rating)}
            >
              Submit
            </Button> */}
          </div>
        </div>
      ) : (
        <div className="messageText messageTextReceived">
          <div
            className={`messageSenderName ${
              props.message.sender === EntityType.Bot1
                ? "messageSenderName1"
                : "messageSenderName2"
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

export default MessageRatingSlider;

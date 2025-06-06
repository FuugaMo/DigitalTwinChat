import "../styles/Message.css";

function MessageSystemNotif(props) {
  return (
    <div className="messageSystem">{props.message.content(props.name)}</div>
  );
}

export default MessageSystemNotif;

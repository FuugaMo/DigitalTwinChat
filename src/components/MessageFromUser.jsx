import "../styles/Message.css";

function MessageFromUser(props) {
  const avatarURL =
    props.avatar instanceof File
      ? URL.createObjectURL(props.avatar)
      : props.avatar;

  return (
    <div className="message messageSent">
      <div className="messageText messageTextSent">
        <div
          className={`messageSenderName ${
            props.isTwin ? "messageSenderNameTwin" : "messageSenderNameUser"
          }`}
        >
          {props.name}
        </div>
        <div>{props.message.content}</div>
      </div>

      {/* 用户头像，仅当 Twin 模式时显示 */}
      {!!props.isTwin && (
        <div>
          <img
            src={avatarURL}
            alt="User Avatar"
            className="avatar"
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              objectFit: "cover",
              marginLeft: 10,
            }}
          />
        </div>
      )}
    </div>
  );
}

export default MessageFromUser;

class MessageType {
  static Message = new MessageType("Message");
  static System = new MessageType("System");
  static Image = new MessageType("Image");
  static GPT = new MessageType("GPT");
  static Rate = new MessageType("Rate");

  constructor(name) {
    this.name = name;
  }
  toString() {
    return `MessageType.${this.name}`;
  }
}

export default MessageType;

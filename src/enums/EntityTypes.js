class EntityType {
  static User = new EntityType("User");
  static Bot1 = new EntityType("Bot1");
  static Bot2 = new EntityType("Bot2");
  static Bot3 = new EntityType("Bot3");
  static Bot4 = new EntityType("Bot4");
  static Bot5 = new EntityType("Bot5");
  static System = new EntityType("System");
  static Host = new EntityType("Host");
  static Assistant = new EntityType("Assistant");
  static Twin = new EntityType("Twin");

  constructor(name) {
    this.name = name;
  }
  toString() {
    return `EntityType.${this.name}`;
  }
}

export default EntityType;

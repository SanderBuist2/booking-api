class NotFoundError extends Error {
  constructor(type, id) {
    super(`${id} not Found in ${type}`);
    this.name = "NotFoundError";
  }
}

export default NotFoundError;

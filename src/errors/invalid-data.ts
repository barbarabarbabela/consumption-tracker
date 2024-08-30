class InvalidData extends Error {
  error_code: string;
  error_description: string;

  constructor(
    message: string = "Os dados fornecidos no corpo da requisição são inválidos."
  ) {
    super(message);
    this.name = "InvalidData";
    this.error_code = "INVALID_DATA";
    this.error_description = message;
  }

  toJSON() {
    return {
      error_code: this.error_code,
      error_description: this.error_description,
    };
  }
}

export default InvalidData;

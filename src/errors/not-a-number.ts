class NotANumber extends Error {
  error_code: string;
  error_description: string;

  constructor(
    message: string = "Não foi possível converter o valor da medida para um número inteiro"
  ) {
    super(message);
    this.name = "NotANumber";
    this.error_code = "NOT_A_NUMBER";
    this.error_description = message;
  }

  toJSON() {
    return {
      error_code: this.error_code,
      error_description: this.error_description,
    };
  }
}

export default NotANumber;
